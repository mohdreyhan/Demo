import * as React from "react";
import { Box, Tab, MuiTabs } from "@oasis/react-core";
import DividerComp from "../../../Common/AEComponents/Divider/DividerComp.js";
import { ColorPallete } from "../../../../theme/ColorPallete";
import "./tabs.css";

export default function TabPanels(props) {
  return (
    <Box sx={{ width: "100%", typography: "body1" }} style={{ display: "flex" }}>
      {props.TabsData.map((tabData, index) => {
        return (
          <div key={`${tabData.id}_${index+1}`}>
            <MuiTabs
              onChange={props.handleChange}
              value={props.value}
              TabIndicatorProps={{ style: { background: ColorPallete.Color.Highlight } }}
            >
              <Tab label={tabData.label} value={tabData.value} />
              <DividerComp orientation="vertical" />
            </MuiTabs>
          </div>
        );
      })}
    </Box>
  );
}