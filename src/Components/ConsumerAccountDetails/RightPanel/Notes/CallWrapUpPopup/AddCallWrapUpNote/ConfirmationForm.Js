import * as React from "react";
import { Grid, FormControl, TextField } from "@oasis/react-core";
import PopUp from "../../../../../Common/AEComponents/DialogBox/PopUp";

import {
  dialogDataHeader,
  dialogDataFooter,
  dialogStructureHeader,
  dialogStructureFooter,
} from "./ConfirmationForm.Data.js";
import { ColorPallete } from "../../../../../../theme/ColorPallete";
import MultiSelectBox from "../../../../../Common/AEComponents/MultiSelect/MultiSelectBox";

export default function ConfirmationForm(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);


  const handleFormSubmit = async (event) => {
 
    event.preventDefault();
    
    
  };
  return (
    <>
      <PopUp
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        formName="addCallWrapUpForm"
      >
        <ConfirmationFormData
          ConfirmationFormData={formData}
        //   handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          
        />
      </PopUp>
    </>
  );
}

const ConfirmationFormData = (props) => {

 
  return (
    <form
      id="ConfirmationForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate"    >
      <Grid container>
        "Hi"
      </Grid>
    </form>
  );
};


