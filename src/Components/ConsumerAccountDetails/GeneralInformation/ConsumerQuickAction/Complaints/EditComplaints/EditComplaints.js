import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditComplaintsFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditComplaints.Data.js';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker.js';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import { renderLabel } from '../../../../../Common/CommonFunctions/CommonFunctionForm';
import { handleOptionsData } from "../../../../../Common/commonfunctions.js"


function EditComplaints(props) {
  const formRef = React.useRef();
  const [tableRowData, setTableRowData] = React.useState({});
  const [formData, setFormData] = React.useState([]);


  ///////////////////// GET ACTUAL API RESPONSE /////////////////////////////////
  React.useEffect(() => {
    if (props?.complaintInformation?.length > 0) { 
      setTableRowData(props.complaintInformation[0]);
    }
  }, [props.complaintInformation, props.showDialog]);  

  React.useEffect(() => {
    const arr = handleOptionsData(EditComplaintsFormData, 'reasonId', props.complaintTypes);
      setFormData(arr);
  },[props.complaintTypes])

  
  const handleChange = (event) => {
    const obj = {
      ...tableRowData,
      [event.target.name]: event.target.value
    };
    setTableRowData(obj);
  };

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
        formName="editComplaint">
        <EditComplaintForm
          EditComplaintFormData={formData}
          formRef={formRef}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          tableRowData={tableRowData}
        />
      </PopUp>
    </>
  );
}

const EditComplaintForm = (props) => {
  props.EditComplaintFormData.filter((data) => data.accessor !== 'isDispute').forEach(
    (formData) => {
      if (props.tableRowData?.isDisputed === false) {
        formData.disabled = true;
      } else {
        formData.disabled = false;
      }
    }
  );

  return (
    <form
      id="editComplaints"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.EditComplaintFormData &&
          props.EditComplaintFormData.map((data) => {
            return (
              <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '16px' }}>
                {renderLabel(data)}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.handleChange}
                    editValues={props.tableRowData}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleChange}
                    editValues={props.tableRowData}
                  />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    captureInputs={props.handleChange}
                    editValues={props.tableRowData}
                  />
                )}
              </Grid>
            );
          })}
      </Grid>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    complaintInformation: state.ConsumerQuickActionsReducer.complaintInformation,
    complaintTypes:state.StaticDataReducer.complaintTypes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    EDITDISPUTE: async (form, tableRowData, customerId, disputeId, handleDialog, showDialog) => {
      await dispatch(
        EDITDISPUTE(form, tableRowData, customerId, disputeId, handleDialog, showDialog)
      );
    },
    DELETEDISPUTE: async (customerId, disputeId, handleDialog, showDialog) => {
      await dispatch(DELETEDISPUTE(customerId, disputeId, handleDialog, showDialog));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComplaints);
