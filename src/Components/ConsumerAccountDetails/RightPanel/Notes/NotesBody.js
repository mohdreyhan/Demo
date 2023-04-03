import {
	Box, ClearIcon, InputAdornment,
	OutlinedInput, SearchIcon, Typography
} from "@oasis/react-core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	GETALLNOTES
} from "../../../../Actions/ConsumerDetails/ActionCreators";
import { ColorPallete } from "../../../../theme/ColorPallete";
import DividerComp from "../../../Common/AEComponents/Divider/DividerComp.js";
import {
	convertTimestamptoUSA
} from "../../../Common/commonfunctions";
import AddNotesInput from "./AddNotesInput";
import AgentNotes from "./AgentNotes";
import CallWrapUpNotes from "./CallWrapUpNotes";
import { getSortedAndFilteredNotes } from './common';
import SpecialNotes from "./SpecialNotes";

const FilterNofound = () => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				padding: "12px 16px",
				justifyContent: "center",
			}}
		>
			<Typography
				sx={{
					fontFamily: "Poppins",
					fontStyle: "normal",
					fontWeight: 700,
					fontSize: "12px",
					lineHeight: "18px",
					textAlign: "center",
					color: ColorPallete.Border.Grid,
				}}
			>
				<b> No Notes available </b>
			</Typography>
		</div>
	);
};

function NotesBody({
	setSearchVal,
	selectedFilter,
	selectedAddType,
	setSelectedAddType,
	searchValue = ""
}) {
	const dispatch = useDispatch();
	const responsibleId = localStorage.getItem('responsibleId');

	const {
		accountNotes = []
	} = useSelector(state => state.ConsumerDetailsReducer);

	useEffect(() => {
		dispatch(GETALLNOTES(responsibleId))
	}, [])

	const getNotesRow = (key, records) => {
		if (records.special) {
			return <SpecialNotes
				key={key}
				record={records}
				showLoader={false}
				searchValue={searchValue}
				responsibleId={responsibleId}
				selectedAddType={selectedAddType}
				setSelectedAddType={setSelectedAddType}
			/>
		}

		if (records.type === "CALL_WRAP_UP") {
			return <CallWrapUpNotes key={key} record={records} showLoader={false} searchValue={searchValue} />
		}

		if (!records.special) {
			return <AgentNotes key={key} record={records} showLoader={false} searchValue={searchValue} />
		}

		return null
	}

	const allNotes = getSortedAndFilteredNotes(selectedFilter, accountNotes).filter((noteVal) => {
    if (searchValue.length > 2) {
      return (
        noteVal?.notes?.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
        noteVal?.content?.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
        convertTimestamptoUSA(noteVal?.createdAt).includes(searchValue) ||
        noteVal?.createdBy?.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
    } else {
      return true;
    }
  });

	return (
		<>
			<Box>
				<OutlinedInput
					placeholder="Search using date, name or text"
					autoComplete="off"
					id="input-search-note"
					sx={{
						width: "100%",
						paddingLeft: "5px",
						paddingRight: "5px",
						"& .MuiOutlinedInput-input": {
							padding: "5px 5px",
							fontSize: "12px",
							textOverflow: "ellipsis",
						},
					}}
					endAdornment={
						searchValue.length > 0 && (
							<InputAdornment
								position="start"
								sx={{ marginRight: "unset" }}
								onClick={() => setSearchVal('')}
							>
								<ClearIcon
									style={{
										color: ColorPallete.Button.Secondary,
										cursor: "pointer",
										height: "15px",
									}}
								/>
							</InputAdornment>
						)
					}
					startAdornment={
						<InputAdornment
							position="start"
							sx={{ marginRight: "unset" }}
						>
							<SearchIcon
								style={{ color: ColorPallete.Button.Secondary }}
							/>
						</InputAdornment>
					}
					value={searchValue}
					onChange={(e) => setSearchVal(e.target.value)}
				/>
			</Box>
			<DividerComp
				orientation="horizontal"
				styles={{
					width: "100%",
					background: ColorPallete.Button.Tertiary,
					marginTop: "12px",
					marginBottom: "12px",
				}}
			/>
			{(selectedAddType === 'addNewNote' ||
				selectedAddType === 'addSpecialNote') &&
				<AddNotesInput
					isSpecial={selectedAddType === 'addSpecialNote'}
					responsibleId={responsibleId}
					setSelectedAddType={setSelectedAddType}
				/>}
			{allNotes.filter(f => f.special).map((records, i) => getNotesRow(i, records))}
			<div style={{ maxHeight: "350px", overflow: "auto" }}>
				{allNotes.filter(f => !f.special).map((records, i) => getNotesRow(i, records))}
			</div>
			{allNotes.length === 0 && <FilterNofound />}
		</>
	)
}

export default React.memo(NotesBody);
