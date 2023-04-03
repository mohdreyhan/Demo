import { MuiButton, Stack } from "@oasis/react-core";
import { POSTCANCELBPINSTANCE } from "../../Actions/BusinessProcess/ActionCreators";
import { connect } from "react-redux";
import React from "react";
import { extractImagePath } from "../Common/commonfunctions";


const CancelBusinessProcess = (props) => {
    const { setshowPopup, updatePopupProps, cancelledData, setPopupAction } = props;

    React.useEffect(() => {
        if (props.cancelBPData) {
            callingCancel(props.cancelBPData)
        }
    }, [props.cancelBPData]);

    const callingCancel = (data) => {
        if (data.step) {
            setshowPopup(false);
        } else {
            setPopupAction({
                title: cancelledData?.name, icon: extractImagePath("account_tree.png"),
                showCancel: true, action: "accessDenied",
                showButton: false, maxWidth: "sm", actionType: "cancelActionInForm",
                leftButton: [{ title: "Previous", variant: "outlined", action: "Previous", nextAction: "Previous", type: "button", disabled: false }],
                noAccessTitle: data.noAccessTitle, noAccessText: data.noAccessText
            });
        }
    }

    const handleApproveCancel = async () => {
        await props.POSTCANCELBPINSTANCE(cancelledData?.id, cancelledData.businessProcessId, props.quickActionSurveyFlows);
    }


    const handleCancelNoOption = () => {
        updatePopupProps({
            businessProcessId: cancelledData?.businessProcessId,
            popupProps: { action: cancelledData.failedPage }
        })
    }

    return (
        <>
            <div style={{ fontSize: "16px" }}>Are you sure you want to cancel the action ?</div>
            <Stack spacing={2} direction="row" style={{ marginTop: "28px", position: "inherit", float: "right", marginRight: "20px" }}>
                <MuiButton variant="outlined" onClick={handleCancelNoOption} >No</MuiButton>
                <MuiButton variant="contained" onClick={handleApproveCancel} >Yes</MuiButton>
                {/* onClick={handleApproveDelete} */}
            </Stack>
        </>
    )

}


function mapStateToProps(state) {
    return {
        quickActionSurveyFlows: state.BusinessProcessReducer.quickActionSurveyFlows,
        cancelBPData: state.BusinessProcessReducer.cancelBPData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        POSTCANCELBPINSTANCE: async (surveyFlowInstanceId, historyId, quickActionSurveyFlows) => {
            await dispatch(POSTCANCELBPINSTANCE(surveyFlowInstanceId, historyId, quickActionSurveyFlows));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelBusinessProcess);