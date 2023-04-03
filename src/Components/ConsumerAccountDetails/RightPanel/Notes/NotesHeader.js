import {
	ExpandMore, FilterListIcon, Grid, IconButton
} from "@oasis/react-core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddIcon2 from "../../../../../Icons/AddIcon2.svg";
import expand from "../../../../../Icons/expand.svg";
import NotesIcon from "../../../../../Icons/Notes.svg";
import { ColorPallete } from "../../../../theme/ColorPallete";
import PositionedMenu from "../../../Common/AEComponents/Menu/PositionedMenu.js";
import { extractImagePath } from "../../../Common/commonfunctions";
import CallWrapUpNote from "./CallWrapUpPopup/CallWrapUpNote";
import { checkIsFilterApplied, getPositionMenuForAdd, getPositionMenuForFilter, StyledBadge } from "./common";
import NotesPopup from './NotesPopUp';

let positionMenuItems = [];

const handleDialog = (value, menuItemsdata, rotation, setSelectedFilter, setSelectedAddType, setShowCallWrapUpDialog, rotateExpandIcon) => {
	if (menuItemsdata?.type === 'filter') {
		setSelectedFilter(menuItemsdata.accessor)
	}
	if (menuItemsdata?.type === 'add' && menuItemsdata.componentToRender !== "addCallWrapUp") {
		setSelectedAddType(menuItemsdata.componentToRender);
		if (rotation === "unset") {
			rotateExpandIcon()
		}
	}
	if (menuItemsdata?.type === 'add' && menuItemsdata.componentToRender === "addCallWrapUp") {
		setShowCallWrapUpDialog(true)
	}
}

export default function NotesHeader({
	rotateExpandIcon,
	rotation,
	selectedFilter,
	setSelectedFilter,
	selectedAddType,
	setSelectedAddType,
	closePopUp,
	from = ''
}) {
	const {
		accountNotes = []
	} = useSelector(state => state.ConsumerDetailsReducer);

	const [addAnchorEl, setAddAnchorEl] = useState(null);
	const [showExpandedNotes, setShowExpandedNotes] = useState(false);
	const [showCallWrapUpDialog, setShowCallWrapUpDialog] = useState(false);

	const addOpen = Boolean(addAnchorEl);

	const handlePositionMenu = (event, type) => {
		if (type === 'add') {
			positionMenuItems = getPositionMenuForAdd(accountNotes)
		} else {
			positionMenuItems = getPositionMenuForFilter(selectedFilter)
		}
		setAddAnchorEl(event.currentTarget)
	}

	return (
		<> 
			<Grid container>
				<Grid
					item
					xs={6}
					style={{
						display: "flex",
						gap: '2px',
						padding: '4px'
					}}
				>
					<IconButton sx={{ padding: "3px" }}>
						<img
							src={NotesIcon}
							style={{ height: "12px", width: "18px" }}
						/>
					</IconButton>
					<div>Notes</div>
				</Grid>
			</Grid>
			<Grid
				item
				xs={6}
				style={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					gap: from !== 'popup' ? '2px' : '10px',
					paddingRight: from !== 'popup' ? '0px': '13px'
				}}
			>
				<div
					style={{
						padding: "4px 5px",
						background: `${checkIsFilterApplied(selectedFilter)
							? ColorPallete.Button.Secondary
							: ColorPallete.Color.White
							}`,
						width: `${checkIsFilterApplied(selectedFilter) ? "40px" : ""}`,
						height: "29px",
					}}
					onClick={(event) => handlePositionMenu(event, 'filter')}
				>
					{/* icons show for filter */}
					{checkIsFilterApplied(selectedFilter) ? (
						<>
							<StyledBadge
								badgeContent={1}
								style={{
									color: `${ColorPallete.Color.White}`,
									fontSize: "5px",
								}}
								sx={{
									"& .MuiBadge-badge": {
										fontSize: 9,
										height: 11,
										minWidth: 11,
										top: 4,
										right: 4,
										border: "0px",
									},
								}}
							>
								<FilterListIcon
									style={{
										height: "20px",
										width: "20px",
										cursor: "pointer",
										color: ColorPallete.Color.White,
										background: ColorPallete.Button.Secondary,
										pointerEvents: "auto",
									}}
								/>
							</StyledBadge>
						</>
					) : (
						<>
							<FilterListIcon
								style={{
									height: "19px",
									width: "19px",
									cursor: "pointer",
									color: ColorPallete.Button.Primary,
									pointerEvents: "auto",
								}}
							/>
						</>
					)}
				</div>
				{from !== 'popup' && <IconButton onClick={() => setShowExpandedNotes(true)}>
					<img
						src={expand}
						style={{
							height: "12px",
							width: "18px",
							cursor: "pointer",
							pointerEvents: "auto",
						}}
					/>
				</IconButton>}
				<IconButton
					sx={{ padding: "3px" }}
					onClick={(event) => handlePositionMenu(event, 'add')}
					disabled={!!selectedAddType}
				>
					<img
						src={AddIcon2}
						style={{
							height: "12px",
							width: "18px",
							cursor: "pointer",
							pointerEvents: "auto",
						}}
					/>
				</IconButton>
				{from !== 'popup' ? <IconButton
					sx={{ padding: "3px" }}
					onClick={rotateExpandIcon}
				>
					<ExpandMore
						sx={{
							pointerEvents: "auto",
							cursor: "pointer",
							color: ColorPallete.Button.Primary,
							transform: `${rotation}`,
						}}
					/>
				</IconButton> :
					<IconButton sx={{ padding: '3px' }} onClick={() => closePopUp(false)}>
						<img
							src={extractImagePath('close.png')}
							style={{
								cursor: 'pointer',
								pointerEvents: 'auto'
							}}
						/>
					</IconButton>}
			</Grid>
			<NotesPopup showDialog={showExpandedNotes} closePopUp={setShowExpandedNotes} />
			<CallWrapUpNote
				showDialog={showCallWrapUpDialog}
				setDialog={setShowCallWrapUpDialog}
			/>
			<PositionedMenu
				handleClose={() => setAddAnchorEl(null)}
				MenuItems={positionMenuItems}
				handleDialog={(value, menuItemsdata) => handleDialog(value, menuItemsdata, rotation, setSelectedFilter, setSelectedAddType, setShowCallWrapUpDialog, rotateExpandIcon)}
				open={addOpen}
				anchorEl={addAnchorEl}
				styles={{ hoverColor: "rgb(95 156 205 / 42% )" }}
			/>
		</>
	)
}