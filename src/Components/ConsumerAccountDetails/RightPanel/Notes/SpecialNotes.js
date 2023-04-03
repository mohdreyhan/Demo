import {
	Box, CircularProgress, Grid, IconButton
} from "@oasis/react-core";
import React from "react";
import EditNotes from "../../../../../Icons/EditNotes.svg";
import { ColorPallete } from "../../../../theme/ColorPallete";
import DividerComp from "../../../Common/AEComponents/Divider/DividerComp.js";
import { updateSearchNote } from './common';
import EditNotesInput from "./EditNotesInput";

function SpecialNotes({
	showLoader,
	responsibleId,
	selectedAddType,
	setSelectedAddType,
	searchValue = '',
	record = {}
}) {
	if (selectedAddType === 'editSpecialNotes') {
		return (<EditNotesInput
			record={record}
			responsibleId={responsibleId}
			setSelectedAddType={setSelectedAddType}
		/>)
	}
	return (
		<div
			key={record.id}
			style={{ marginTop: "18px" }}
		>
			<Box
				style={{
					margin: "0px -20px",
					padding: "0px 20px",
					backgroundColor: `${ColorPallete.Color.LightGrey}`,
					marginBottom: "12px",
				}}
			>
				<Grid container spacing={1} sx={{ mb: 1 }}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Text.Secondary,
							fontSize: "12px",
						}}
					>
						Special Note
					</Grid>

					<Grid
						item
						xs={2}
						style={{ textAlign: "right", cursor: "pointer" }}
					>
						<IconButton
							// disabled={showAddaNote}
							onClick={() => setSelectedAddType('editSpecialNotes')}
						>
							<img src={EditNotes} />
						</IconButton>
					</Grid>
				</Grid>
				{showLoader ? (
					<CircularProgress
						sx={{
							color: `${ColorPallete.Color.DarkGrey}`,
							fontSize: "12px",
						}}
						style={{
							width: "15px",
							height: "15px",
							marginBottom: "12px",
						}}
					/>
				) : (
					<div
						style={{
							fontSize: "12px",
							paddingBottom: "12px",
							color: ColorPallete.Text.Primary,
							lineBreak: 'anywhere'
						}}
						dangerouslySetInnerHTML={{
							__html: updateSearchNote(record, searchValue),
						}}
					/>
				)}
			</Box>
			<DividerComp
				orientation="horizontal"
				styles={{
					width: "100%",
					background: ColorPallete.Button.Tertiary,
					marginBottom: "12px",
				}}
			/>
		</div>
	)
}

export default SpecialNotes;