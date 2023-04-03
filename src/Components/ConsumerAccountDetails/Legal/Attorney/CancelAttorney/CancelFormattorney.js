import * as React from "react";
import PopUp from "../../../../Common/AEComponents/DialogBox/PopUp";
import {
  dialogDataHeader,
  dialogDataFooter,
  dialogStructureHeader,
  dialogStructureFooter,
} from "./CancelForm.Data";

import { connect } from "react-redux";

function CancelAttorney(props) {
    return (
        <>
        <PopUp showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        formName="cancelAttorneyForm">
          All the added data will be lost if you cancel adding a new attorney.
      </PopUp>
        </>
      );
    }

      
export default connect(null, null)(CancelAttorney);
      