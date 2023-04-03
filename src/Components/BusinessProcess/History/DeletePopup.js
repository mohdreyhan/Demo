import React from "react";
import { MuiButton, Stack } from "@oasis/react-core";
import { connect } from "react-redux";
import { POSTCANCELBPINSTANCE } from "../../../Actions/BusinessProcess/ActionCreators";
import { HistoryDefaultPopupProps } from "../Business.Data";
import { extractImagePath } from "../../Common/commonfunctions";

const DeletePopup = (props) => {
    const { updatePopupProps, deleteRecordData,setPopupAction } = props;

    React.useEffect(() => {
        if(props.cancelBPData){
            callingCancel(props.cancelBPData)
        }
    }, [props.cancelBPData]);

    const callingCancel = (data) => {
        if(data.step){
            handleBacktoHistory();
        }else{          
            setPopupAction({
                title: deleteRecordData?.name, icon: extractImagePath("account_tree.png"),
                showCancel: true, action: "accessDenied",
                showButton: false, maxWidth: "sm", actionType: null, 
                leftButton: [{ title: "Previous", variant: "outlined", action: "Previous", nextAction: "Previous", type: "button", disabled: false }],
                noAccessTitle: data.noAccessTitle, noAccessText: data.noAccessText
            });
        }
    }

    const handleApproveDelete = async () => {
        await props.POSTCANCELBPINSTANCE(deleteRecordData?.id, deleteRecordData?.historyId, props.quickActionSurveyFlows);    
    }
    const handleBacktoHistory = () => {
        updatePopupProps({ popupProps: HistoryDefaultPopupProps });
    }

    return (
        <>
            <div style={{ fontSize: "16px" }}>Are you sure you want to cancel the action ?</div>
            <Stack spacing={2} direction="row" style={{ marginTop: "28px", position: "inherit", float: "right", marginRight: "20px" }}>
                <MuiButton variant="outlined" onClick={handleBacktoHistory}>No</MuiButton>
                <MuiButton variant="contained" onClick={handleApproveDelete}>Yes</MuiButton>
            </Stack>
        </>)

}
function mapStateToProps(state) {
    return {
        quickActionSurveyFlows: state.BusinessProcessReducer.quickActionSurveyFlows,
        cancelBPData:state.BusinessProcessReducer.cancelBPData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        POSTCANCELBPINSTANCE: async (surveyFlowInstanceId, historyId, quickActionSurveyFlows) => {
            await dispatch(POSTCANCELBPINSTANCE(surveyFlowInstanceId, historyId, quickActionSurveyFlows));
        },
    };
}

export default connect(mapStateToProps,
    mapDispatchToProps
)(DeletePopup);

