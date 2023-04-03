import {
	Box, Grid
} from "@oasis/react-core";
import React from "react";
import { ColorPallete } from "../../../../theme/ColorPallete";
import DividerComp from "../../../Common/AEComponents/Divider/DividerComp.js";
import {
	convertTimestamptoUSATimeNotes, formatPhoneNumber
} from "../../../Common/commonfunctions";
import { updateSearchNote } from "./common";

function CallWrapUpNotes({
	record = {},
	searchValue = ''
}) {
	return (
		<div key={`note_${record?.id}`}>
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
						{`Call Wrap Up Note`}
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Text.Secondary,
							fontSize: "12px",
							lineBreak: 'anywhere'
						}}
					>
						{record.callMethod}
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Text.Secondary,
							fontSize: "12px",
							lineBreak: 'anywhere'
						}}
					>
						{record.customerName}
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Text.Secondary,
							fontSize: "12px",
							lineBreak: 'anywhere'
						}}
					>
						<div>
							{convertTimestamptoUSATimeNotes(
								record?.createdAt
							)}
						</div>
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Text.Secondary,
							fontSize: "12px",
						}}
					>
						{formatPhoneNumber("USA", record.phoneNumber)}
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Text.Secondary,
							fontSize: "12px",
						}}
					>
						{record.callOutCome}
					</Grid>
				</Grid>
				<Grid container spacing={1} sx={{ mb: 1 }}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Text.Secondary,
							fontSize: "12px",
							lineBreak: 'anywhere'
						}}
					>
						{record.account.map((m) => m.accountNum).join(", ")}
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					<Grid
						item
						xs={10}
						style={{
							color: ColorPallete.Color.Black,
							fontSize: "12px",
							lineBreak: 'anywhere'
						}}
					>
						<div
							dangerouslySetInnerHTML={{
								__html: updateSearchNote(record, searchValue),
							}}
						/>
					</Grid>
				</Grid>
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
			<Grid container spacing={1} sx={{ mb: 1 }}>
				<Grid
					item
					xs={10}
					style={{
						color: ColorPallete.Text.Secondary,
						fontSize: "12px",
						lineBreak: 'auto'
					}}
				>
					{record.createdBy}
				</Grid>
			</Grid>
			{record && (
				<DividerComp
					orientation="horizontal"
					styles={{
						width: "100%",
						background: ColorPallete.Button.Tertiary,
						marginTop: "12px",
						marginBottom: "12px",
					}}
				/>
			)}
		</div>
	)
}

export default CallWrapUpNotes;