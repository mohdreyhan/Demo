import * as React from "react";
import AddCallWrapUpNote from "./AddCallWrapUpNote/AddCallWrapUpNote";
import { connect } from "react-redux";

import CancelCallWrapNote from "./AddCallWrapUpNote/CancelCallWrapNote";
import { ADDCALLWRAPUPNOTEINPUTS } from "../../../../../Actions/ConsumerDetails/Actions";


function CallWrapUpNote(props) {

  const [showCancel, setshowCancel] = React.useState(false);

  /*--------------------- handle popup function -----------------*/
  const handleDialog = (value, buttonType) => {
    if(buttonType === "submit") {
      props.setDialog(value)
    }
    setshowCancel(true);
  };
  const handleDialogCancel = (value, buttonType) => {
    if (buttonType === "goback") {
      setshowCancel(false);
    } else {
      props.setDialog(false);
      setshowCancel(false);
      props.ADDCALLWRAPUPNOTEINPUTS('','','reset');
    }
   
  };

  return (
    <>
      {!showCancel ? (
        <AddCallWrapUpNote showDialog={props.showDialog} setDialog={props.setDialog} handleDialog={handleDialog} handleDialogCancel={handleDialogCancel} valCheck={props.addCallwrapupInputs} />
      ) : (
        <CancelCallWrapNote showDialog={showCancel} setDialog={props.setcancelDialog} handleDialog={handleDialogCancel} />
      )}
    </>
  );
}


function mapStateToProps(state) {
  return {
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
    addCallwrapupInputs: state.ConsumerDetailsReducer.addCallwrapupInputs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDCALLWRAPUPNOTEINPUTS: async (name , value, oparation) => {
      await dispatch(ADDCALLWRAPUPNOTEINPUTS(name, value , oparation));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallWrapUpNote);