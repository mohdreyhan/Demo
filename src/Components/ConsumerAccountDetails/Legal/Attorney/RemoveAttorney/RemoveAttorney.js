import * as React from "react";
import PopUp from "../../../../Common/AEComponents/DialogBox/PopUp";
import {
  dialogDataHeader,
  dialogDataFooter,
  dialogStructureHeader,
  dialogStructureFooter,
} from "./RemoveAttorney.Date";

import { connect } from "react-redux";

function RemoveAttorney(props) {
    return (
        <>
        <PopUp showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        formName="RemoveAttorneyForm">
          Attorney will be removed from current to history.
        </PopUp>
        </>
      );
    }

      
export default connect(null, null)(RemoveAttorney);
      