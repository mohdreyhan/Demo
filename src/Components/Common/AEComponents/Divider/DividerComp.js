import React from "react";
import { Divider } from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete";

function DividerComp(props) {
  return (
    <Divider
      orientation={props.orientation}
      flexItem
      style={props.styles ? props.styles : { width: "1px", background: ColorPallete.Button.Tertiary, margin: "10px" }}
    />
  );
}

export default DividerComp;
