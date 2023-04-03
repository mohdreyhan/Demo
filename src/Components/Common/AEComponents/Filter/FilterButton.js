import React from "react";
import {FilterListIcon, IconButton, Tooltip} from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete";


function FilterButton(props) {
  const disableValue = props.contactInfo || props.disabled ? true : false;
  const disableColor = disableValue ? ColorPallete.Button.quaternary : ColorPallete.Button.Primary;
  return (
    <>
      <Tooltip title="">
        <IconButton disabled={disableValue}>
          <FilterListIcon style={{color:disableColor}}/>
        </IconButton>
      </Tooltip>
    </>
  );
}


export default FilterButton;
