import * as React from 'react';
import { Grid, FormControl } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditPhoneFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditPhone.Data';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import { EDITPHONE } from '../../../../../../Actions/ConsumerDetails/ContactInformation/ActionCreators.js';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';
import {
  phoneNumberFormat,
  convertTimestamptoUSA,
  validateHelperText,
  validateError,
  nestedIfCaseHandle,
  andCondition,
  orCondition
} from '../../../../../Common/commonfunctions.js';
import PatternFormatTextfield from '../../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';

function EditPhone(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);
  const [tableRowData, setTableRowData] = React.useState({});
  const [errorValue, setError] = React.useState([]);
  const [apiResponse, setApiResponse] = React.useState({});
  const [warnings, setWarnings] = React.useState([]);
  const [dialogFooterData , setDialogFooterData] = React.useState(dialogDataFooter);

  const handleDisable = (disable=true)=>{
    let footerValue = dialogDataFooter.map((footerData) => {
      if (footerData.accessor == 'updateButton')
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
    const refactoredPhoneTypes = props.phoneTypes?.map((type) => {
      return {
        ...type,
        name: type.name.replace('Phone', '')
      };
    });
    EditPhoneFormData.filter((data) => data.accessor == 'isDefault').forEach(
      (editphoneOptionsData) => {
        delete editphoneOptionsData.changeValue;
        delete editphoneOptionsData.toolTipMsg;
        delete editphoneOptionsData.disabled;
        delete editphoneOptionsData.options.optionsData[0].disabled;
        delete editphoneOptionsData.options.optionsData[0].name;
        if (editphoneOptionsData?.options?.optionsData.length > 1) {
          delete editphoneOptionsData.options.optionsData[1].disabled;
          delete editphoneOptionsData.options.optionsData[1].name;
        }
      }
    );

    const refactoredConsumerDemographicSource = props.consumerDemographicSource?.map((data) => {
      return {
        name: data.source,
        id: data.id,
        isDefault: data.isDefault
      };
    });

    EditPhoneFormData?.map((eformData) => {
      if (eformData.accessor == 'type') {
        // arr.push({...formData, options : {...formData.options, optionsData : props.emailTypes}}) ////Alternate Way //NOSONAR
        return arr.push({
          ...eformData,
          options: { optionsData: refactoredPhoneTypes }
        });
      } else if (eformData.accessor == 'sourceRefId') {
        // arr.push({...formData, options : {...formData.options, optionsData : props.emailTypes}}) ////Alternate Way //NOSONAR
        arr.push({ ...eformData, options: { optionsData: refactoredConsumerDemographicSource } });
      } else {
        return arr.push({ ...eformData });
      }
    });
    setFormData(arr);
  }, [props.phoneTypes, props.consumerDemographicSource]);

  React.useEffect(() => {
    const originalData = props.phoneData.filter((value) => value.id == props.tableRowData.id);
    const OriginalApi = JSON.parse(JSON.stringify(originalData[0]));
    setApiResponse(OriginalApi);
    setTableRowData(originalData[0]);
  }, [props.tableRowData]);

  const handleChange = (event) => {
    const obj = {
      ...tableRowData,
      [event.target.name]: event.target.value
    };
    setTableRowData(obj);
  };

  /////// VALIDATE EXISTING PRIMARY RECORDS
  const filterData = (internalArr) => {
    const filteredRecords = props.phoneData.filter((data) => data.isDefault);
    if (filteredRecords.length >= 1) {
      internalArr.push({
        alertType: 'warning',
        text: 'Marking the primary as Yes will remove the current primary',
        backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
        iconColor: ColorPallete.Alert.Warning.iconColor
      });
    }
  };
  React.useEffect(() => {
    let internalArr = [];
    if ('isDefault' in tableRowData && tableRowData.isDefault) {
      if (
        apiResponse.isDefault !== tableRowData.isDefault ||
        (apiResponse.isDefault !== tableRowData.isDefault && tableRowData.type == apiResponse.type)
      ) {
        filterData(internalArr);
      }
    }
    setWarnings(internalArr);
  }, [tableRowData]);

  /////// CLEAR WARNINGS
  const clearWarnings = () => {
    setWarnings([]);
  };

  //////// FUNCTION TO VALIDATE REQUIRED FIELDS
  const recordErrors = (data, internalArr) => {
    internalArr.push({
      fieldName: data.name,
      text: `Please enter ${data.label}`
    });
  };

  ///// VALIDATE REQUIRED FIELD
  const validateRequiredFields = (data, internalArr) => {
    if (
      data.required &&
      data.type == 'select' &&
      data.name != 'source' &&
      (tableRowData[data.accessor] == null || tableRowData[data.accessor] == undefined)
    ) {
      recordErrors(data, internalArr);
    }
  };

  ///// VALIDATE PHONE NUMBER
  const validatePhoneNumber = (data, internalArr) => {
    const replacedValue = tableRowData[data.accessor].replace(/[-_ )(]/g, ''); //Donot remove this regex
    if (data.operation?.includes('formatPhoneNumber')) {
      if (
        tableRowData[data.accessor] == undefined ||
        tableRowData[data.accessor] == null ||
        replacedValue.length == 0
      ) {
        recordErrors(data, internalArr);
      } else {
        if (replacedValue.length < 10 && replacedValue != 0) {
          internalArr.push({
            fieldName: data.name,
            text: 'Invalid Phone number'
          });
        }
        let duplicate = props.phoneData.some((val) => val.number === replacedValue);
        if (duplicate && Number(replacedValue) !== Number(apiResponse[data.accessor])) {
          internalArr.push({
            fieldName: data.name,
            text: 'Phone Number already exist'
          });
        }
        tableRowData[data.accessor] = replacedValue;
      }
    }
  };

  /// VALIDATE DATE
  const validateDate = (data, internalArr) => {
    if (tableRowData[data.accessor] == undefined || tableRowData[data.accessor] == null) {
      internalArr.push({
        fieldName: data.name,
        text: `Please enter ${data.label}`
      });
    }
  };

  const getSubmitData = () => {
    let phoneType = props?.phoneTypes?.find((type) => type.id == tableRowData?.type)?.name;
    if (tableRowData.callConsent) {
      tableRowData.callConsentDate = new Date().toISOString();
    }
    if (!tableRowData.callConsent) {
      tableRowData.callConsentDate = null;
    }

    if (tableRowData.smsConsent) {
      tableRowData.smsConsentDate = new Date().toISOString();
    }

    if (phoneType != 'Mobile') {
      tableRowData.preRecordedMessageConsent = null;
      tableRowData.artificialVoiceConsent = null;
    } else {
      if (!tableRowData.preRecordedMessageConsent) {
        tableRowData.preRecordedMessageConsent = false;
      }
      if (!tableRowData.artificialVoiceConsent) {
        tableRowData.artificialVoiceConsent = false;
      }
    }

    if (!tableRowData.smsConsent) {
      tableRowData.smsConsentDate = null;
    }
    if (tableRowData.preRecordedMessageConsent) {
      tableRowData.preRecordedMessageConsentDate = new Date().toISOString();
    }

    if (!tableRowData.preRecordedMessageConsent) {
      tableRowData.preRecordedMessageConsentDate = null;
    }
    if (tableRowData.artificialVoiceConsent) {
      tableRowData.artificialVoiceConsentDate = null;
    }
    if (!tableRowData.artificialVoiceConsent) {
      tableRowData.artificialVoiceConsentDate = null;
    }
    return tableRowData;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const internalArr = [];

    EditPhoneFormData.forEach((formValue) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(formValue, internalArr);
      ////VALIDATE PHONE NUMBER
      if (formValue.operation?.includes('formatPhoneNumber')) {
        validatePhoneNumber(formValue, internalArr);
      }

      ////VALIDATE DATE
      if (
        (tableRowData.callConsent && formValue.name == 'callConsentDate') ||
        (tableRowData.smsConsent && formValue.name == 'smsConsentDate')
      ) {
        validateDate(formValue, internalArr);
      }
    });
    setError(internalArr);
    if (internalArr.length == 0) {
      let refactoredData = getSubmitData();
      const addServiceData = Object.assign({}, refactoredData);
      addServiceData['source'] = addServiceData['sourceRefId'];
      delete addServiceData.sourceRefId;

      props.EDITPHONE(
        formRef,
        addServiceData,
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
        formName="editPhoneForm">
        <EditPhoneForm
          EditPhoneFormData={formData}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          handleChange={handleChange}
          tableRowData={tableRowData}
          phoneNumberFormat={phoneNumberFormat}
          errorValue={errorValue}
          apiResponse={apiResponse}
          phoneData={props.phoneData}
          phoneTypes={props.phoneTypes}
        />
      </PopUp>
    </>
  );
}


const EditPhoneForm = (props) => {
  const currentDate = convertTimestamptoUSA(new Date());
  //////VALIDATING PRIMARY EVEN IF TYPE IS CHANGED
  if (
    props.apiResponse.isDefault &&
    props.apiResponse.active &&
    props.tableRowData.isDefault &&
    props.tableRowData.active
  ) {
    props.EditPhoneFormData.filter((data) => data.accessor == 'isDefault').forEach(
      (editPhoneOptionsData) => {
        editPhoneOptionsData.toolTipMsg =
          'To Change the primary contact information, Please change another contact information as primary.';
        editPhoneOptionsData.disabled = true;
        editPhoneOptionsData.options.optionsData[1].disabled = true;
        editPhoneOptionsData.options.optionsData[1].name = editPhoneOptionsData.name;
      }
    );
    props.EditPhoneFormData.filter((data) => data.accessor == 'active').forEach(
      (editPhoneOptionsData) => {
        editPhoneOptionsData.disabled = true;
        editPhoneOptionsData.options.optionsData[1].disabled = true;
        editPhoneOptionsData.options.optionsData[1].name = editPhoneOptionsData.name;
      }
    );
  }

  if (
    (!props.tableRowData.active && !props.apiResponse.isDefault) ||
    (!props.tableRowData.active && props.apiResponse.isDefault)
  ) {
    props.EditPhoneFormData.filter((data) => data.accessor == 'isDefault').forEach(
      (editPhoneOptionsData) => {
        editPhoneOptionsData.changeValue = true;
        editPhoneOptionsData.toolTipMsg = "You can't change inactive contact to primary";
        editPhoneOptionsData.disabled = true;
        editPhoneOptionsData.options.optionsData[0].disabled = true;
        editPhoneOptionsData.options.optionsData[0].name = editPhoneOptionsData.name;
      }
    );
  } else if (!props.apiResponse.isDefault) {
    props.EditPhoneFormData.filter((data) => data.accessor == 'isDefault').forEach(
      (editPhoneOptionsData) => {
        delete editPhoneOptionsData.changeValue;
        delete editPhoneOptionsData.toolTipMsg;
        delete editPhoneOptionsData.disabled;
        delete editPhoneOptionsData.options.optionsData[0].disabled;
        delete editPhoneOptionsData.options.optionsData[0].name;
      }
    );
  }
  //Input date
  //Nocase ///callconsent
  let callConsentDateNoCase=orCondition(props.apiResponse.callConsentDate === null, props.apiResponse.callConsentDate === '')
  if (callConsentDateNoCase) {
    props.tableRowData.callConsentDate = nestedIfCaseHandle(
      props.tableRowData.callConsent,
      currentDate,
      ''
    );
  }

  let callConsentDateCaseNull=andCondition(props.apiResponse.callConsent === true , props.tableRowData.callConsent === false)
  let callConsentDateCaseCurrentDate=andCondition(props.tableRowData.callConsent === true,
    props.apiResponse.callConsentDate !== props.tableRowData.callConsentDate)
  if (callConsentDateCaseNull) {
    props.tableRowData.callConsentDate = '';
  } else if (
    callConsentDateCaseCurrentDate
  ) {
    props.tableRowData.callConsentDate = currentDate;
  }

  //Nocase ///esignconsent
  let smsConsentDateNoCase=orCondition(props.apiResponse.smsConsentDate === null, props.apiResponse.smsConsentDate === '')
  if (smsConsentDateNoCase) {
    props.tableRowData.smsConsentDate=nestedIfCaseHandle(
      props.tableRowData.smsConsent,
      currentDate,
      ''
    );
  }

  let smsConsentDateCaseNull= andCondition(props.apiResponse.smsConsent === true , props.tableRowData.smsConsent === false)
  let smsConsentDateCaseCurrentDate= andCondition(props.tableRowData.smsConsent === true ,
    props.apiResponse.smsConsentDate !== props.tableRowData.smsConsentDate)
  if (smsConsentDateCaseNull) {
    props.tableRowData.smsConsentDate = '';
  } else if (
    smsConsentDateCaseCurrentDate
  ) {
    props.tableRowData.smsConsentDate = currentDate
  }

  // PreRecorded Consent
  let phoneType = props?.phoneTypes?.find((type) => type.id == props.tableRowData?.type)?.name;
  if (phoneType == 'Mobile') {
    // Enable Options
    props.EditPhoneFormData?.filter(
      (data) =>
        data.accessor == 'preRecordedMessageConsent' || data.accessor == 'artificialVoiceConsent'
    ).forEach((editPhoneOptionsData) => {

      editPhoneOptionsData.disabled = false;
      delete editPhoneOptionsData.options.optionsData[0].disabled;
      delete editPhoneOptionsData.options.optionsData[1].disabled;
      let optionPreRecordedMessageConsent=props.tableRowData.preRecordedMessageConsent?props.tableRowData.preRecordedMessageConsent:false
      editPhoneOptionsData.defaultData =optionPreRecordedMessageConsent 
    });

    props.EditPhoneFormData?.filter(
      (data) =>
       data.accessor == 'artificialVoiceConsent'
    ).forEach((editPhoneOptionsData) => {
      editPhoneOptionsData.disabled = false;
      delete editPhoneOptionsData.options.optionsData[0].disabled;
      delete editPhoneOptionsData.options.optionsData[1].disabled;
      let optionDataArtificialVoiceConsent=props.tableRowData.artificialVoiceConsent?props.tableRowData.artificialVoiceConsent:false
       editPhoneOptionsData.defaultData =optionDataArtificialVoiceConsent
    });
    ///Change Date
    props.tableRowData.preRecordedMessageConsentDate = nestedIfCaseHandle(
      props.tableRowData.preRecordedMessageConsent,
      currentDate,
      ''
    );
    props.tableRowData.artificialVoiceConsentDate = nestedIfCaseHandle(
      props.tableRowData.artificialVoiceConsent,
      currentDate,
      ''
    );
  } else {
    //clear Date
    props.tableRowData.preRecordedMessageConsentDate = '';
    props.tableRowData.artificialVoiceConsentDate = '';
    //   disable options
    props.EditPhoneFormData?.filter(
      (data) =>
        data.accessor == 'preRecordedMessageConsent' || data.accessor == 'artificialVoiceConsent'
    ).forEach((editPhoneOptionsData) => {
      editPhoneOptionsData.defaultData=null;
      editPhoneOptionsData.disabled = true;
      editPhoneOptionsData.options.optionsData[0].disabled = true;
      editPhoneOptionsData.options.optionsData[1].disabled = true;
      editPhoneOptionsData.options.optionsData[0].name = editPhoneOptionsData.name;
      editPhoneOptionsData.options.optionsData[1].name = editPhoneOptionsData.name;
    });
  }

  const ConvertTime = (data, value, accessor) => {
    let Obj = {};
    Obj = { ...data, [accessor]: convertTimestamptoUSA(value) };
    return Obj;
  };

  return (
    <form
      id="editPhoneForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.EditPhoneFormData.map((data, index) => {
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
              <div style={{ width: data.width ?? '' }}>
                {data.type == 'input' && (
                  <FormControl required={data.required ?? false} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.handleChange}
                      error={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                      phoneNumberFormat={props.phoneNumberFormat}
                      editValues={
                        data.placeholder == 'mm/dd/yyyy' && props.tableRowData[data.accessor]
                          ? ConvertTime(
                              props.tableRowData,
                              props.tableRowData[data.accessor],
                              data.accessor
                            )
                          : props.tableRowData
                      }
                    />
                  </FormControl>
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                    editValues={props.tableRowData}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                    editValues={props.tableRowData}
                  />
                )}
                {data.type == 'radio' && (
                  <div
                    style={{
                      marginTop: '6px'
                    }}>
                    <RadioButtonGroup
                      data={data}
                      captureInputs={props.handleChange}
                      error={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                      editValues={props.tableRowData}
                    />
                  </div>
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                    editValues={props.tableRowData}
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
    phoneTypes: state.ContactInfoReducer.phoneTypes,
    phoneData: state.ContactInfoReducer.phoneData,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITPHONE: async (form, editPhoneInputs, customerId, handleDialog, showDialog,handleDisable) => {
      await dispatch(EDITPHONE(form, editPhoneInputs, customerId, handleDialog, showDialog,handleDisable));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPhone);
