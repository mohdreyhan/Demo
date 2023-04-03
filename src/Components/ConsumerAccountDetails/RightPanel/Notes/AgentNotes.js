import React from "react";
import {
	Grid,
	Box,
} from "@oasis/react-core";
import DividerComp from "../../../Common/AEComponents/Divider/DividerComp.js";
import { ColorPallete } from "../../../../theme/ColorPallete";
import {
	convertTimestamptoUSATimeNotes,
} from "../../../Common/commonfunctions";
import { updateSearchNote } from './common'

function AgentNotes({
	searchValue = '',
	record = {}
}) {
	return (
		<div key={record?.id}>
			<Box>
				<Grid container spacing={1} sx={{ mb: 1 }}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Text.Secondary,
							fontSize: "12px",
						}}
					>
						{record?.createdBy}{" "}
						<div>
							{convertTimestamptoUSATimeNotes(
								record?.createdAt
							)}
						</div>
					</Grid>
				</Grid>
				<div
					style={{
						fontSize: "12px",
						color: ColorPallete.Text.Primary,
						lineBreak: 'anywhere'
					}}
					dangerouslySetInnerHTML={{
						__html: updateSearchNote(record, searchValue),
					}}
				></div>
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
		</div>
	)
}

export default AgentNotes;