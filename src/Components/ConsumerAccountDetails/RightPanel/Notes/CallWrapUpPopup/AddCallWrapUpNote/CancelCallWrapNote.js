import * as React from "react";
import PopUp from "../../../../../Common/AEComponents/DialogBox/PopUp";
import {
  dialogDataHeader,
  dialogDataFooter,
  dialogStructureHeader,
  dialogStructureFooter,
} from "./CancelCallWrapNote.Data";

import { connect } from "react-redux";
import {GETCONSUMERPERSONALINFO} from "../../../../../../Actions/ConsumerDetails/ActionCreators"

function CancelCallWrapNote(props) {
    return (
        <>
        <PopUp showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        formName="cancelCallWrapUpForm">
          All the added data will be lost if you cancel the wrap up note now
      </PopUp>
        </>
      );
    }

    function mapStateToProps(state) {
        return {
          callWrapUpData: state.StaticDataReducer.callWrapUpData,
          responsibleId: state.ConsumerDetailsReducer.responsibleId,
          callMethodsData: state.StaticDataReducer.callMethodsData,
          consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
      
        };
      }
      function mapDispatchToProps(dispatch) {
        return {
          GETCONSUMERPERSONALINFO: async (responsibleId) => {
            await dispatch(GETCONSUMERPERSONALINFO(responsibleId));
        }
        };
      }
      
export default connect(mapStateToProps, mapDispatchToProps)(CancelCallWrapNote);
      