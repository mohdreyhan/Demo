import { convertTimestamptoUSA } from "../../../Common/commonfunctions";
import {
	filterMenuItems,
	addItemsMenu,
} from "./Notes.Data.js";
import DoneIcon from "@mui/icons-material/Done";
import { ColorPallete } from "../../../../theme/ColorPallete";
import { Badge } from "@mui/material";
import { styled } from '@oasis/react-core';

export const getSortedNotes = (notes = []) => {
	return notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getSortedAndFilteredNotes = (filterVal, notes = []) => {
	return notes.filter((f) =>
		(filterVal === 'All Notes') ||
		(filterVal === 'Call Wrap Up Notes' && f.type === "CALL_WRAP_UP") ||
		(filterVal === 'Agent Notes' && !f.special && f.type !== "CALL_WRAP_UP")
	).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const updateSearchNote = (noteRes, keyword) => {
	if (keyword.length > 2) {
		let re = new RegExp(keyword, "g");
		if (
			noteRes?.notes?.toLowerCase().includes(keyword.toLowerCase())
		) {
			return noteRes?.notes?.replace(re, "<b>" + keyword + "</b>");
		} else if (
			noteRes?.content?.toLowerCase().includes(keyword.toLowerCase()) &&
			!convertTimestamptoUSA(noteRes?.createdAt).includes(keyword)
		) {
			return noteRes?.content?.replace(re, "<b>" + keyword + "</b>");
		} else {
			return noteRes?.content || noteRes?.notes;
		}
	} else {
		return noteRes?.content || noteRes?.notes;
	}
};

export const getPositionMenuForAdd = (accountNotes = []) => {
	return addItemsMenu?.map((p) => {
		if (p.accessor === "Special Note") {
			return {
				...p,
				disabled:
					accountNotes?.filter((record) => record?.special).length > 0,
				tooltip: "You can only add one special note.",
			};
		}
		return p;
	});
};

export const getPositionMenuForFilter = (accessor = '') => {
	return filterMenuItems?.map((p) => {
		return {
			...p,
			label: accessor === p.accessor ? <DoneIcon style={{ color: ColorPallete.Text.Tertiary }} /> : <></>,
			styles: {
				...p.styles,
				menuItem: {
					...p.styles.menuItem,
					background: accessor === p.accessor ? 'rgba(0, 0, 0, 0.04)' : ''
				}
			}
		}
	});
};

export const checkIsFilterApplied = (selectedFilter) => (selectedFilter && selectedFilter !== 'All Notes')

export const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		border: `2px solid ${ColorPallete.Color.White}`,
		padding: "0 4px",
		color: `${ColorPallete.Color.Black}`,
		backgroundColor: `${ColorPallete.Color.White}`,
	},
}));