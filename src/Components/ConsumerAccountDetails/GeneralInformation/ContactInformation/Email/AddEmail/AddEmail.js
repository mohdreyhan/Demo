import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import {
  dialogDataHeader,
  dialogDataFooter,
  AddEmailFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddEmail.Data.js';
import ResponsiveDateTimePicker from '../../../../../Common/AEComponents/DateTimePicker/ResponsiveDateTimePicker';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import { ADDEMAILINPUTS } from '../../../../../../Actions/ConsumerDetails/ContactInformation/Actions';
import { ADDEMAIL } from '../../../../../../Actions/ConsumerDetails/ContactInformation/ActionCreators.js';
import {
  validateEmail,
  validateError,
  validateHelperText,
  refactorDateInConsentFields
} from '../../../../../Common/commonfunctions';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';

function AddEmail(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);
  const [errorValue, setError] = React.useState([]);
  const [warnings, setWarnings] = React.useState([]);
  const [addEmailInputs, setInputs] = React.useState({});

  React.useEffect(() => {
    const arr = [];
    const filterEmailType = props.emailTypes?.filter((type) => type.active);
    const refactoredEmaiTypes = filterEmailType?.map((type) => {
      return {
        ...type,
        name: type.name == 'HomeEmail' ? 'Personal' : type.name.replace('Email', '')
      };
    });
    const refactoredConsumerDemographicSource = props.consumerDemographicSource.map((data) => {
      return {
        name: data.source,
        id: data.id,
        isDefault: data.isDefault
      };
    });

    AddEmailFormData?.forEach((formD) => {
      if (formD.accessor == 'emailType') {
        // arr.push({...formData, options : {...formData.options, optionsData : props.emailTypes}}) ////Alternate Way //NOSONAR
        arr.push({ ...formD, options: { optionsData: refactoredEmaiTypes } });
      } else if (formD.accessor == 'emailConsentSource') {
        // arr.push({...formData, options : {...formData.options, optionsData : props.emailTypes}}) ////Alternate Way //NOSONAR
        arr.push({ ...formD, options: { optionsData: refactoredConsumerDemographicSource } });
      } else {
        arr.push({ ...formD });
      }
    });
    setFormData(arr);
  }, [props.emailTypes, props.consumerDemographicSource]);

  React.useEffect(() => {
    setInputs(props.addEmailInputs);
  }, [props.addEmailInputs]);

  /////// VALIDATE EXISTING PRIMARY RECORDS

  React.useEffect(() => {
    let internalArr = [];
    if ('isDefault' in addEmailInputs && addEmailInputs.isDefault) {
      const filteredRecords = props.emailData
        // .filter((emails) => emails.emailType == addEmailInputs.emailType) //NOSONAR
        .filter((data) => data.isDefault);
      if (filteredRecords.length >= 1) {
        internalArr.push({
          alertType: 'warning',
          text: 'Marking the primary as Yes will remove the current primary',
          backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
          iconColor: ColorPallete.Alert.Warning.iconColor
        });
      }
    }
    setWarnings(internalArr);
  }, [addEmailInputs]);

  /////// CLEAR WARNINGS

  const clearWarnings = () => {
    setWarnings([]);
  };

  //////// FUNCTION TO VALIDATE REQUIRED FIELDS

  const validateRequiredFields = (data, internalArr) => {
    if (data.required) {
      if (
        data.type !== 'select' &&
        data.type !== 'radio' &&
        (!addEmailInputs[data.accessor] || addEmailInputs[data.accessor]?.trim().length == 0)
      ) {
        internalArr.push({
          fieldName: data.name,
          text: `Please enter ${data.label}`
        });
      } else {
        if (data.type == 'select' && addEmailInputs[data.accessor] == null) {
          internalArr.push({
            fieldName: data.name,
            text: `Please enter ${data.label}`
          });
        }
      }
    }
  };

  ///// VALIDATE EMAIL
  const validateEmailAddress = (data, internalArr) => {
    if (
      data.operation?.includes('formatEmailAddress') &&
      addEmailInputs[data.accessor]?.length > 0
    ) {
      const response = validateEmail(data.format, addEmailInputs[data.accessor]);
      if (response && !response.result) {
        internalArr.push({
          fieldName: data.name,
          text: response.message
        });
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef;
    let internalArr = [];
    formData.forEach((data) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(data, internalArr);
      ////VALIDATE PHONE NUMBER
      validateEmailAddress(data, internalArr);
    });
    setError(internalArr);

    let ObjectData = { ...addEmailInputs };

    ObjectData = refactorDateInConsentFields(
      ObjectData,
      ObjectData.emailConsent,
      'emailConsentDate',
      true
    );

    ObjectData = refactorDateInConsentFields(
      ObjectData,
      ObjectData.esignConsent,
      'esignConsentDate',
      true
    );

    if (internalArr.length == 0) {
      props.ADDEMAIL(
        form,
        ObjectData,
        localStorage.getItem('customerId'),
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
        formName="addEmailForm">
        <AddEmailForm
          AddEmailFormData={formData}
          ADDEMAILINPUTS={props.ADDEMAILINPUTS}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          errorValue={errorValue}
          addEmailInputs={addEmailInputs}
          emailData={props.emailData}
        />
      </PopUp>
    </>
  );
}

const AddEmailForm = (props) => {
  let filteredData,
    tempInputs = { ...props.addEmailInputs };

  if (props.emailData) {
    filteredData = props.emailData.filter((data) => data.isDefault);
    if (filteredData.length <= 0) {
      props.AddEmailFormData?.filter(
        (data) => data.accessor == 'isDefault' || data.accessor == 'active'
      ).forEach((addEmailOptionsData) => {
        addEmailOptionsData.options.optionsData[1].name = addEmailOptionsData.name;
      });
    }
  }

  if ('active' in tempInputs && !tempInputs.active) {
    props.AddEmailFormData?.filter((data) => data.accessor == 'isDefault')?.forEach(
      (addEmailOptionsData) => {
        addEmailOptionsData.changeValue = true;
        addEmailOptionsData.toolTipMsg = "You can't change inactive contact to primary";
        addEmailOptionsData.disabled = true;
        addEmailOptionsData.options.optionsData[0].disabled = true;
        addEmailOptionsData.options.optionsData[0].name = addEmailOptionsData.name;
      }
    );
  } else {
    props.AddEmailFormData?.filter((data) => data.accessor == 'isDefault')?.forEach(
      (addEmailOptionsData) => {
        if (addEmailOptionsData.options.optionsData[0].disabled && tempInputs.active) {
          delete addEmailOptionsData.changeValue;
          delete addEmailOptionsData.toolTipMsg;
          delete addEmailOptionsData.disabled;
          delete addEmailOptionsData.options.optionsData[0].disabled;
          delete addEmailOptionsData.options.optionsData[0].name;
        }
      }
    );
  }

  //Input date emailConsent
  tempInputs = refactorDateInConsentFields(tempInputs, tempInputs.emailConsent, 'emailConsentDate');

  //Input date esignConsent
  tempInputs = refactorDateInConsentFields(tempInputs, tempInputs.esignConsent, 'esignConsentDate');

  return (
    <form
      id="addEmailForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.AddEmailFormData?.map((data, index) => {
          //  <div style={{ width : data.width && data.width}}>
          if (data.type == 'input') {
            return (
              <Grid
                item
                xs={data.xs}
                key={`${data.id}_${index + 1}`}
                sx={{ paddingBottom: '10px' }}>
                <div>
                  {data.label}{' '}
                  {data.required && (
                    <span
                      style={{
                        color: ColorPallete.Border.Tertiary,
                        marginLeft: '-4px'
                      }}>
                      *
                    </span>
                  )}
                </div>
                <div style={{ width: data.width || '' }}>
                  <TextFieldComp
                    data={data}
                    captureInputs={props.ADDEMAILINPUTS}
                    error={props.errorValue}
                    validateError={validateError}
                    userInputs={data.sendUserInputs ? tempInputs : null}
                    validateHelperText={validateHelperText}
                  />
                </div>
              </Grid>
            );
          }
          if (data.type == 'select') {
            return (
              <Grid
                item
                xs={data.xs}
                key={`${data.id}_${index + 1}`}
                sx={{ paddingBottom: '10px' }}>
                <div>
                  {data.label}{' '}
                  {data.required && (
                    <span
                      style={{
                        color: ColorPallete.Border.Tertiary,
                        marginLeft: '-4px'
                      }}>
                      *
                    </span>
                  )}
                </div>
                <div style={{ width: data.width || '' }}>
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDEMAILINPUTS}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                </div>
              </Grid>
            );
          }
          if (data.type == 'radio') {
            return (
              <Grid
                item
                xs={data.xs}
                key={`${data.id}_${index + 1}`}
                sx={{ paddingBottom: '10px' }}>
                <div>
                  {data.label}{' '}
                  {data.required && (
                    <span
                      style={{
                        color: ColorPallete.Border.Tertiary,
                        marginLeft: '-4px'
                      }}>
                      *
                    </span>
                  )}
                </div>
                <div style={{ width: data.width || '' }}>
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.ADDEMAILINPUTS}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                </div>
              </Grid>
            );
          }
          if (data.type == 'date/time') {
            return (
              <Grid
                item
                xs={data.xs}
                key={`${data.id}_${index + 1}`}
                sx={{ paddingBottom: '10px' }}>
                <div>
                  {data.label}{' '}
                  {data.required && (
                    <span
                      style={{
                        color: ColorPallete.Border.Tertiary,
                        marginLeft: '-4px'
                      }}>
                      *
                    </span>
                  )}
                </div>
                <div style={{ width: data.width || '' }}>
                  <ResponsiveDateTimePicker
                    data={data}
                    captureInputs={props.ADDEMAILINPUTS}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                </div>
              </Grid>
            );
          }
          // </div>
        })}
      </Grid>
    </form>
  );
};
function mapStateToProps(state) {
  return {
    addEmailInputs: state.ContactInfoReducer.addEmailInputs,
    emailTypes: state.ContactInfoReducer.emailTypes,
    emailData: state.ContactInfoReducer.emailData,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ADDEMAILINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDEMAILINPUTS(name, value));
    },
    ADDEMAIL: async (form, addEmailInputs, customerId, handleDialog, showDialog) => {
      await dispatch(ADDEMAIL(form, addEmailInputs, customerId, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEmail);
