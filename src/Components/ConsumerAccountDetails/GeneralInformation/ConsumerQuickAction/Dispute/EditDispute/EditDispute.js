import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditDisputeFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditDispute.Data.js';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker.js';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import { renderLabel } from '../../../../../Common/CommonFunctions/CommonFunctionForm';
import {
  EDITDISPUTE,
  DELETEDISPUTE
} from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators';
import { handleOptionsData } from '../../../../../Common/commonfunctions';

function EditDispute(props) {
  const formRef = React.useRef();
  const [tableRowData, setTableRowData] = React.useState({});
  const [formData, setFormData] = React.useState([]);
  const [warnings, setWarnings] = React.useState([]);

  ///////////////////// GET ACTUAL API RESPONSE /////////////////////////////////
  React.useEffect(() => {
    if (props?.disputeInformation?.length > 0) {
      setTableRowData(props.disputeInformation[0]);
    }
  }, [props.disputeInformation, props.showDialog]);

  React.useEffect(() => {
    const arr = handleOptionsData(EditDisputeFormData, 'reasonId', props.disputeReasons);
    setFormData(arr);
  }, [props.disputeReasons]);

  /////// VALIDATE IS DISPUTED FLAG
  const CheckForWarnings = () => {
    let internalArr = [];
    internalArr.push({
      alertType: 'warning',
      text: "Changing the information to 'No' will remove the dispute information.",
      backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
      iconColor: ColorPallete.Alert.Warning.iconColor
    });
    setWarnings(internalArr);
  };

  /////// CLEAR WARNINGS
  const clearWarnings = () => {
    setWarnings([]);
  };

  const handleChange = (event) => {
    const obj = {
      ...tableRowData,
      [event.target.name]: event.target.value
    };
    setTableRowData(obj);
    if (obj.isDisputed === false) {
      CheckForWarnings();
    } else {
      clearWarnings();
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!tableRowData.isDisputed) {
      await props.DELETEDISPUTE(
        localStorage.getItem('customerId'),
        tableRowData.id,
        props.handleDialog,
        props.showDialog
      );
    } else {
      await props.EDITDISPUTE(
        tableRowData,
        localStorage.getItem('customerId'),
        tableRowData.id,
        props.handleDialog,
        props.showDialog
      );
    }
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
        warnings={warnings}
        clearWarnings={clearWarnings}
        formName="editDispute">
        <EditDisputeForm
          EditDisputeFormData={formData}
          formRef={formRef}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          tableRowData={tableRowData}
        />
      </PopUp>
    </>
  );
}

const EditDisputeForm = (props) => {
  props.EditDisputeFormData.filter((data) => data.accessor !== 'isDispute').forEach((formData) => {
    if (props.tableRowData?.isDisputed === false) {
      formData.disabled = true;
    } else {
      formData.disabled = false;
    }
  });

  return (
    <form
      id="editDispute"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.EditDisputeFormData &&
          props.EditDisputeFormData.map((data) => {
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
    disputeInformation: state.ConsumerQuickActionsReducer.disputeInformation,
    disputeReasons: state.StaticDataReducer.disputeReasons
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

export default connect(mapStateToProps, mapDispatchToProps)(EditDispute);
