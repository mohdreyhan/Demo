import * as React from 'react';
import { Grid, FormControl } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import {
  dialogDataHeader,
  dialogDataFooter,
  AddPhoneFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddPhone.Data.js';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import { ADDPHONEINPUTS } from '../../../../../../Actions/ConsumerDetails/ContactInformation/Actions';
import { ADDPHONE } from '../../../../../../Actions/ConsumerDetails/ContactInformation/ActionCreators.js';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';
import {
  phoneNumberFormat,
  convertTimestamptoUSA,
  validateError,
  validateHelperText,
  nestedIfCaseHandle
} from '../../../../../Common/commonfunctions.js';
import PatternFormatTextfield from '../../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';

function AddPhone(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);
  const [errorValue, setError] = React.useState([]);
  const [addPhoneInputs, setInputs] = React.useState({});
  const [warnings, setWarnings] = React.useState([]);
  const [dialogFooterData , setDialogFooterData] = React.useState(dialogDataFooter);

  const handleDisable = (disable=true)=>{
    let footerValue = dialogDataFooter.map((footerData) => {
      if (footerData.accessor == 'addButton')
      {footerData.disabled = disable;
     return footerData;}
      else { return { ...footerData }; } });
      setDialogFooterData(footerValue);
  }

  React.useEffect(()=>{
    handleDisable(false)
  },[])

  React.useEffect(() => {
    const arr = [];
    const filterPhoneType = props.phoneTypes?.filter((type) => type.active);
    const refactoredEmaiTypes = filterPhoneType?.map((type) => {
      return {
        ...type,
        name: type.name.replace('Phone', '')
      };
    });
    const refactoredConsumerDemographicSource = props.consumerDemographicSource.map((data) => {
      return {
        name: data.source,
        id: data.id,
        isDefault: data.isDefault
      };
    });
    AddPhoneFormData?.map((data) => {
      if (data.accessor == 'type') {
        return arr.push({
          ...data,
          options: { optionsData: refactoredEmaiTypes }
        });
      } else if (data.accessor == 'source') {
        arr.push({ ...data, options: { optionsData: refactoredConsumerDemographicSource } });
      } else {
        return arr.push({ ...data });
      }
    });
    setFormData(arr);
  }, [props.phoneTypes, props.consumerDemographicSource]);

  React.useEffect(() => {
    setInputs(props.addPhoneInputs);
  }, [props.addPhoneInputs]);
  /////// VALIDATE EXISTING PRIMARY RECORDS
  React.useEffect(() => {
    let internalArr = [];
    if ('isDefault' in addPhoneInputs && addPhoneInputs.isDefault) {
      const filteredRecords = props.phoneData.filter((data) => data.isDefault);
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
  }, [addPhoneInputs]);

  /////// CLEAR WARNINGS
  const clearWarnings = () => {
    setWarnings([]);
  };

  const recordErrors = (data, internalArr) => {
    internalArr.push({
      fieldName: data.name,
      text: `Please enter ${data.label}`
    });
  };

  const validateRequiredFields = (data, internalArr) => {
    if (data.required) {
      if (data.type == 'select' && addPhoneInputs[data.accessor] == null) {
        recordErrors(data, internalArr);
      }
    }
  };

  ///// VALIDATE PHONE NUMBER

  const validateAndConvertPhoneNumber = (data, internalArr) => {
    if (data.operation?.includes('formatPhoneNumber')) {
      if (addPhoneInputs[data.accessor] == undefined) {
        recordErrors(data, internalArr);
      } else {
        const phoneNumber = addPhoneInputs[data.accessor].replace(/[-_ )(]/g, '');
        if (phoneNumber.length < 10) {
          internalArr.push({
            fieldName: data.name,
            text: 'Invalid Phone Number'
          });
        }

        let phoneNumberExist = props.phoneData.some(
          (phoneNumberData) => phoneNumberData.number == phoneNumber
        );
        if (phoneNumberExist) {
          internalArr.push({
            fieldName: data.name,
            text: 'Phone Number already exist'
          });
        }
        addPhoneInputs[data.accessor] = phoneNumber;
      }
    }
  };

  const validateDate = (data, internalArr) => {
    if (addPhoneInputs[data.accessor] == undefined || addPhoneInputs[data.accessor] == null) {
      recordErrors(data, internalArr);
    }
  };
  const getSubmitData = () => {
    let phoneType = props?.phoneTypes?.find((type) => type.id == addPhoneInputs?.type)?.name;
    if (addPhoneInputs.callConsent) {
      addPhoneInputs.callConsentDate = addPhoneInputs.callConsentDate.replace(
        /(..).(..).(....)/,
        '$3-$1-$2'
      );
    }
    if (!addPhoneInputs.callConsent) {
      addPhoneInputs.callConsentDate = null;
    }

    if (addPhoneInputs.smsConsent) {
      addPhoneInputs.smsConsentDate = addPhoneInputs.smsConsentDate.replace(
        /(..).(..).(....)/,
        '$3-$1-$2'
      );
    }
    if (!addPhoneInputs.smsConsent) {
      addPhoneInputs.smsConsentDate = null;
    }

    if (phoneType != 'Mobile') {
      addPhoneInputs.preRecordedMessageConsent = null;
      addPhoneInputs.artificialVoiceConsent = null;
    } else {
      if (!addPhoneInputs.preRecordedMessageConsent) {
        addPhoneInputs.preRecordedMessageConsent = false;
      }
      if (!addPhoneInputs.artificialVoiceConsent) {
        addPhoneInputs.artificialVoiceConsent = false;
      }
    }

    if (addPhoneInputs.preRecordedMessageConsent) {
      addPhoneInputs.preRecordedMessageConsentDate =
        addPhoneInputs.preRecordedMessageConsentDate.replace(/(..).(..).(....)/, '$3-$1-$2');
    }
    if (!addPhoneInputs.preRecordedMessageConsent) {
      addPhoneInputs.preRecordedMessageConsentDate = null;
    }
    if (!addPhoneInputs.preRecordedMessageConsent) {
      addPhoneInputs.preRecordedMessageConsentDate = null;
    }

    if (addPhoneInputs.artificialVoiceConsent) {
      addPhoneInputs.artificialVoiceConsentDate = addPhoneInputs.artificialVoiceConsentDate.replace(
        /(..).(..).(....)/,
        '$3-$1-$2'
      );
    }
    if (!addPhoneInputs.artificialVoiceConsent) {
      addPhoneInputs.artificialVoiceConsentDate = null;
    }
    return addPhoneInputs
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef;
    let internalArr = [];
    AddPhoneFormData.forEach((data) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(data, internalArr);
      ////VALIDATE PHONE NUMBER AND CONVERT IN TO NUMERIC
      validateAndConvertPhoneNumber(data, internalArr);
      ////VALIDATE DATE
      if (
        (addPhoneInputs.callConsent && data.name == 'callConsentDate') ||
        (addPhoneInputs.smsConsent && data.name == 'smsConsentDate')
      ) {
        validateDate(data, internalArr);
      }
    });
    setError(internalArr);


    if (internalArr.length == 0) {
      let refactoredPhoneInputs=getSubmitData();

      const ObjectData = { ...refactoredPhoneInputs };
      props.ADDPHONE(
        form,
        ObjectData,
        localStorage.getItem('customerId'),
        props.handleDialog,
        props.showDialog,
        handleDisable
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
        dialogDataFooter={dialogFooterData}
        dialogStructureFooter={dialogStructureFooter}
        warnings={warnings}
        clearWarnings={clearWarnings}
        formName="addPhoneForm">
        <AddPhoneForm
          AddPhoneFormData={formData}
          ADDPHONEINPUTS={props.ADDPHONEINPUTS}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          errorValue={errorValue}
          addPhoneInputs={addPhoneInputs}
          phoneNumberFormat={phoneNumberFormat}
          phoneData={props.phoneData}
          phoneTypes={props.phoneTypes}
        />
      </PopUp>
    </>
  );
}

const AddPhoneForm = (props) => {
  // Handle Active & Primary Options
  let filteredData;
  const currentDate = convertTimestamptoUSA(new Date());
  if (props.phoneData) {
    filteredData = props.phoneData.filter((data) => data.isDefault);
    if (filteredData.length <= 0) {
      props.AddPhoneFormData?.filter(
        (data) => data.accessor == 'isDefault' || data.accessor == 'active'
      ).forEach((addPhoneOptionsData) => {
        addPhoneOptionsData.toolTipMsg = 'A primary record should exist';
        addPhoneOptionsData.disabled = true;
        addPhoneOptionsData.options.optionsData[1].disabled = true;
        addPhoneOptionsData.options.optionsData[1].name = addPhoneOptionsData.name;
      });
    }

    {
      props.AddPhoneFormData?.filter(
        (data) =>
          data.accessor == 'isDefault' &&
          'active' in props.addPhoneInputs &&
          !props.addPhoneInputs.active
      ).forEach((addPhoneOptionsData) => {
        addPhoneOptionsData.changeValue = true;
        addPhoneOptionsData.toolTipMsg = "You can't change inactive contact to primary";
        addPhoneOptionsData.disabled = true;
        addPhoneOptionsData.options.optionsData[0].disabled = true;
        addPhoneOptionsData.options.optionsData[0].name = addPhoneOptionsData.name;
      });
    }
    {
      props.AddPhoneFormData?.filter(
        (data) =>
          data.accessor == 'isDefault' &&
          data.options.optionsData[0].disabled &&
          props.addPhoneInputs.active
      ).forEach((addPhoneOptionsData) => {
        delete addPhoneOptionsData.changeValue;
        delete addPhoneOptionsData.toolTipMsg;
        delete addPhoneOptionsData.disabled;
        delete addPhoneOptionsData.options.optionsData[0].disabled;
        delete addPhoneOptionsData.options.optionsData[0].name;
      });
    }
    //Input date
    props.addPhoneInputs.callConsentDate = nestedIfCaseHandle(
      props.addPhoneInputs.callConsent,
      currentDate,
      ''
    );

    props.addPhoneInputs.smsConsentDate = nestedIfCaseHandle(
      props.addPhoneInputs.smsConsent,
      currentDate,
      ''
    );
  }

  let phoneType = props?.phoneTypes?.find((type) => type.id == props.addPhoneInputs?.type)?.name;
  if (phoneType == 'Mobile') {
    // Enable Options
    props.AddPhoneFormData?.filter(
      (data) =>
        (data.accessor == 'preRecordedMessageConsent' ||
          data.accessor == 'artificialVoiceConsent') &&
        'type' in props.addPhoneInputs
    ).forEach((addPhoneOptionsData) => {
      addPhoneOptionsData.disabled = false;
      delete addPhoneOptionsData.options.optionsData[0].disabled;
      delete addPhoneOptionsData.options.optionsData[1].disabled;
      addPhoneOptionsData.defaultData = false;
    });
    //Edit values
    // props.addPhoneInputs.preRecordedMessageConsent=false
    // props.addPhoneInputs.artificialVoiceConsent=false
    ///Change Date
    props.addPhoneInputs.preRecordedMessageConsentDate = nestedIfCaseHandle(
      props.addPhoneInputs.preRecordedMessageConsent,
      currentDate,
      ''
    );
    props.addPhoneInputs.artificialVoiceConsentDate = nestedIfCaseHandle(
      props.addPhoneInputs.artificialVoiceConsent,
      currentDate,
      ''
    );
  } else {
    //clear Date
    props.addPhoneInputs.preRecordedMessageConsentDate = '';
    props.addPhoneInputs.artificialVoiceConsentDate = '';
    //    // disable options
    props.AddPhoneFormData?.filter(
      (data) =>
        data.accessor == 'preRecordedMessageConsent' || data.accessor == 'artificialVoiceConsent'
    ).forEach((addPhoneOptionsData) => {
      delete addPhoneOptionsData.defaultData;
      addPhoneOptionsData.disabled = true;
      addPhoneOptionsData.options.optionsData[0].disabled = true;
      addPhoneOptionsData.options.optionsData[1].disabled = true;
      addPhoneOptionsData.options.optionsData[0].name = addPhoneOptionsData.name;
      addPhoneOptionsData.options.optionsData[1].name = addPhoneOptionsData.name;
    });
  }

  return (
    <form
      id="addPhoneForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.AddPhoneFormData?.map((data, index) => {
          return (
            <Grid item xs={data.xs} key={`${data.id}_${index + 1}`} sx={{ paddingBottom: '10px' }}>
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
                {data.type == 'input' && (
                  <FormControl required={data.required ?? false} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.ADDPHONEINPUTS}
                      error={props.errorValue}
                      errorText={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                      userInputs={props.addPhoneInputs}
                      phoneNumberFormat={props.phoneNumberFormat}
                    />
                  </FormControl>
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.ADDPHONEINPUTS}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDPHONEINPUTS}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}
                {data.type == 'radio' && (
                  <div
                    style={{
                      marginTop: '6px'
                    }}>
                    <RadioButtonGroup
                      data={data}
                      captureInputs={props.ADDPHONEINPUTS}
                      error={props.errorValue}
                    />
                  </div>
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    captureInputs={props.ADDPHONEINPUTS}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    addPhoneInputs: state.ContactInfoReducer.addPhoneInputs,
    phoneData: state.ContactInfoReducer.phoneData,
    phoneTypes: state.ContactInfoReducer.phoneTypes,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ADDPHONEINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDPHONEINPUTS(name, value));
    },
    ADDPHONE: async (form, addPhoneInputs, customerId, handleDialog, showDialog,handleDisable) => {
      await dispatch(ADDPHONE(form, addPhoneInputs, customerId, handleDialog, showDialog,handleDisable));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPhone);
