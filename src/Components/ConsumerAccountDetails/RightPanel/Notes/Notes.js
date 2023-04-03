import {
	Accordion, AccordionDetails, AccordionSummary
} from "@oasis/react-core";
import React, { useState } from "react";
import { ColorPallete } from "../../../../theme/ColorPallete";
import NotesBody from "./NotesBody";
import NotesHeader from "./NotesHeader";

function Notes({
	from = '',
	closePopUp
}) {
	const [searchValue, setSearchVal] = useState("");
	const [isExpanded, setIsExpanded] = useState(true);
	const [rotation, setRotation] = useState("rotate(180deg)");
	const [selectedAddType, setSelectedAddType] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("All Notes");

	const rotateExpandIcon = () => {
		setIsExpanded(!isExpanded);
		if (rotation === "rotate(180deg)") {
			setRotation("unset");
			setSelectedAddType('');
		} else {
			setRotation("rotate(180deg)");
		}
	};

	return (<Accordion
		disableGutters
		expanded={isExpanded}
		sx={{
			pointerEvents: "none",
			"&.MuiPaper-root": {
				"&.MuiAccordion-root": {
					borderBottom: `1px solid ${ColorPallete.Border.Panel} `,
					borderRadius: "0px !important",
				},
			},
		}}
	>
		<AccordionSummary
			sx={{
				"& .MuiAccordionSummary-content": {
					margin: "5px 0 !important"
				},
			}}
		>
			<NotesHeader
				from={from}
				rotation={rotation}
				closePopUp={closePopUp}
				rotateExpandIcon={rotateExpandIcon}
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				selectedAddType={selectedAddType}
				setSelectedAddType={setSelectedAddType}
			/>
		</AccordionSummary>
		<AccordionDetails
			style={{ pointerEvents: "auto", padding: "4px 16px", maxHeight: from === "popup" ? '650px': 'fit-content', overflow: from === "popup" ? 'hidden scroll' : 'hidden auto' }}
		>
			<NotesBody
				searchValue={searchValue}
				selectedFilter={selectedFilter}
				setSearchVal={setSearchVal}
				selectedAddType={selectedAddType}
				setSelectedAddType={setSelectedAddType}
			/>
		</AccordionDetails>
	</Accordion>)
}

export default React.memo(Notes);