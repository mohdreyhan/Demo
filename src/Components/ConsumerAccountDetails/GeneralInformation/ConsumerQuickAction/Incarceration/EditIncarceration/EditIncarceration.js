import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditIncarceratedFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditIncarceration.Data.js';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker.js';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';
import { renderLabel } from '../../../../../Common/CommonFunctions/CommonFunctionForm';
import {
  EDITINCARCERATION,
  DELETEINCARCERATION
} from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators';

function EditAddress(props) {
  const formRef = React.useRef();
  const [tableRowData, setTableRowData] = React.useState({});
  const [warnings, setWarnings] = React.useState([]);

  ///////////////////// GET ACTUAL API RESPONSE /////////////////////////////////
  React.useEffect(() => {
    if (props.incarceratedInformation.length > 0) {
      setTableRowData(props.incarceratedInformation[0]);
    }
  }, [props.incarceratedInformation, props.showDialog]);

  /////// VALIDATE IS INCARCERATED FLAG
  const CheckForWarnings = () => {
    let internalArr = [];
    internalArr.push({
      alertType: 'warning',
      text: "Changing the information to 'No' will remove the incarcerated information.",
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
    if (obj.isIncarcerated === false) {
      CheckForWarnings();
    } else {
      clearWarnings();
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!tableRowData.isIncarcerated) {
      await props.DELETEINCARCERATION(
        localStorage.getItem('customerId'),
        tableRowData.id,
        props.handleDialog,
        props.showDialog
      );
    } else {
      await props.EDITINCARCERATION(
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
        formName="editIncarceration">
        <EditIncarcerationForm
          EditIncarceratedFormData={EditIncarceratedFormData}
          formRef={formRef}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          tableRowData={tableRowData}
        />
      </PopUp>
    </>
  );
}

const EditIncarcerationForm = (props) => {
  props.EditIncarceratedFormData.filter((data) => data.accessor !== 'isIncarcerated').forEach(
    (formData) => {
      if (props.tableRowData?.isIncarcerated === false) {
        formData.disabled = true;
      } else {
        formData.disabled = false;
      }
    }
  );

  return (
    <form
      id="editIncarceration"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.EditIncarceratedFormData &&
          props.EditIncarceratedFormData.map((data) => {
            return (
              <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '10px' }}>
                {renderLabel(data)}
                {data.type == 'input' && (
                  <TextFieldComp
                    data={data}
                    captureInputs={props.handleChange}
                    editValues={props.tableRowData}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
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
    incarceratedInformation: state.ConsumerQuickActionsReducer.incarceratedInformation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    EDITINCARCERATION: async (
      form,
      tableRowData,
      customerId,
      incarceratedId,
      handleDialog,
      showDialog
    ) => {
      await dispatch(
        EDITINCARCERATION(form, tableRowData, customerId, incarceratedId, handleDialog, showDialog)
      );
    },
    DELETEINCARCERATION: async (customerId, incarceratedId, handleDialog, showDialog) => {
      await dispatch(DELETEINCARCERATION(customerId, incarceratedId, handleDialog, showDialog));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
