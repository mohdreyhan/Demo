import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  ADDLIGITIOUSFORMDATA,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddLitigious.Data.js';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker.js';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import {validateError,
  validateHelperText} from '../../../../../Common/commonfunctions.js';
import {
  renderLabel
} from '../../../../../Common/CommonFunctions/CommonFunctionForm';
import { ADDLITIGIOUS } from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators';
import { ADDLITIGIOUSINPUTS } from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions';

function AddLitigious(props) {
  const formRef = React.useRef();
  const [addLitigiousInputs, setAddLitigiousInputs] = React.useState({});
  const [errorValue, setError] = React.useState([]);

  React.useEffect(() => {
    setAddLitigiousInputs(props.addLitigiousInputs);
  }, [props.addLitigiousInputs]);

  const validateRequiredFields = (data, internalArr) => {
 
    if (data.required) {
      if (
        data.type == 'date' &&
        (addLitigiousInputs[data.accessor] == null ||
          addLitigiousInputs[data.accessor] == undefined)
      ) {
        recordErrors(data, internalArr);
      }
    }
  };

  const recordErrors = (data, internalArr) => {
    internalArr.push({
      fieldName: data.name,
      text: `Please enter ${data.label}`
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef;
    delete addLitigiousInputs.isLitigious;
    let internalArr = [];
    ADDLIGITIOUSFORMDATA.forEach((data) => {
      validateRequiredFields(data, internalArr);
    });
    setError(internalArr);
    if (internalArr.length == 0) {
    await props.ADDLITIGIOUS(
      form,
      addLitigiousInputs,
      localStorage.getItem('customerId'),
      props.handleDialog,
      props.showDialog,
      props.navigateToGenInfo
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
        formName="addLitigious">
        <AddLitigiousForm
          ADDLIGITIOUSFORMDATA={ADDLIGITIOUSFORMDATA}
          formRef={formRef}
          handleFormSubmit={handleFormSubmit}
          errorValue={errorValue}
          ADDLITIGIOUSINPUTS={props.ADDLITIGIOUSINPUTS}
        />
      </PopUp>
    </>
  );
}

const AddLitigiousForm = (props) => {
  return (
    <form
      id="addLitigious"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.ADDLIGITIOUSFORMDATA.map((data) => {
          return (
            <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '16px' }}>
              {renderLabel(data)}
              {data.type == 'radio' && (
                <RadioButtonGroup
                  data={data}
                  error={props.errorValue}
                  errorText={props.errorValue}
                  captureInputs={props.ADDLITIGIOUSINPUTS}
                  validateError={validateError}
                  validateHelperText={validateHelperText}
                />
              )}
              {data.type == 'date' && (
                <ResponsiveDatePicker
                  data={data}
                  error={props.errorValue}
                  errorText={props.errorValue}
                  maxDate={new Date()} captureInputs={props.ADDLITIGIOUSINPUTS}
                  validateError={validateError}
                  validateHelperText={validateHelperText}
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
    addLitigiousInputs: state.ConsumerQuickActionsReducer.addLitigiousInputs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDLITIGIOUSINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDLITIGIOUSINPUTS(name, value));
    },
    ADDLITIGIOUS: async (form, addLitigiousInputs, customerId, handleDialog, showDialog,navigateToGenInfo) => {
      await dispatch(ADDLITIGIOUS(form, addLitigiousInputs, customerId, handleDialog, showDialog,navigateToGenInfo));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLitigious);
