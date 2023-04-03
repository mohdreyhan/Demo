import { useState } from "react";
import { MuiButton, Divider, Grid } from "@oasis/react-core";
import PopUp from "../Common/DialogModals/PopUp";
import WorkflowFormSubmit from "./WorkflowFormSubmit";
import TabPanelFlow from "./TabPanelFlow";

const Workflow = () => {
  const [showPopup, setshowPopup] = useState(false);
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);
  const [workflowInstance, setWorkflowInstance] = useState(null);
  const handleShowPopup = () => {
    setshowPopup(true);
    setShowWorkflowForm(false);
  };
  const handleCancelForm = (action) => {
    if (action) {
      setShowWorkflowForm(false);
    }
  };
  const handleWorkflowSet = (actionId) => {
    if (actionId) {
      setWorkflowInstance(actionId);
      setShowWorkflowForm(true);
    }
  };
  const closePopup = () => {
    setshowPopup(false);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          <MuiButton variant="contained" onClick={handleShowPopup}>
            Business Process{" "}
          </MuiButton>
        </Grid>
        <PopUp
          title={"Business Process"}
          openPopUp={showPopup}
          setOpenPopUp={setshowPopup}
        >
          <Divider />
          {showWorkflowForm ? (
            <WorkflowFormSubmit
              WorkflowFormData={workflowInstance}
              formCancelAction={handleCancelForm}
            />
          ) : (
            <TabPanelFlow
              flowSetAction={handleWorkflowSet}
              closePopup={closePopup}
            />
          )}
        </PopUp>
      </Grid>
    </div>
  );
};
export default Workflow;
