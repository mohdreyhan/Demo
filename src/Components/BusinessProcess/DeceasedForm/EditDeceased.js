import * as React from 'react';
import { Grid, FormControl } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../Common/AEComponents/DialogBox/PopUp';
import SelectButton from '../../Common/AEComponents/DropDown/SelectButton.js';
import PatternFormatTextfield from '../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';

import {
  dialogDataHeader,
  dialogDataFooter,
  DeceasedInfoFormData,
  CourtInfoFormData,
  ExcutorInfoFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditDeaceased.Data';
import ResponsiveDatePicker from '../../Common/AEComponents/DatePicker/ResponsiveDatePicker';
import RadioButtonGroup from '../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../theme/ColorPallete';
import {
  EDITDEACEASED,
  DELETEDEACEASED,
  GETDECEASEDINFO
} from '../../../Actions/ConsumerDetails/ActionCreators';
import TextFieldComp from '../../Common/AEComponents/TextField/TextFieldComp';
import { handleOptionsData, validatePostalCode, validateAlphaText, conditionBasedPhonePatternWithExt, validateWebsite, conditionBasedZipcodePattern } from '../../Common/commonfunctions.js';


function EditDeceased(props) {
  const formRef = React.useRef();
  // 3 forms are
  const [deceasedForm, setdeceasedForm] = React.useState(DeceasedInfoFormData);
  const [courtInfoForm, setcourtInfoForm] = React.useState(CourtInfoFormData);
  const [executorForm, setexecutorForm] = React.useState(ExcutorInfoFormData);

  const [indicatorDialog, setIndicatorDialog] = React.useState(false);

  const [errorValueDeceased, setErrorDeceased] = React.useState([]);
  const [errorValueCourt, setErrorCourt] = React.useState([]);
  const [errorValueExecutor, setErrorExecutor] = React.useState([]);
  const [editDeceasedInputs, setDeceasedInputs] = React.useState({});
  const [editCourtInputs, setCourtInputs] = React.useState({});
  const [editExecutorInputs, setExecutorInputs] = React.useState({});

  const [warnings, setWarnings] = React.useState([]);
  //record error
  const recordErrors = (data, internalArr) => {
    internalArr.push({
      fieldName: data.name,
      text: `Please enter ${data.label}`
    });
  };

  //setting data
  React.useEffect(() => {
    if (props.tableRowData) {
      getState(props.tableRowData);
      setDeceasedInputs({
        ...props.tableRowData[0],
        deceased: props.tableRowData[0] ? true : false
      });
      setCourtInputs(props.tableRowData?.[0]?.courtInformation);
      setExecutorInputs(props.tableRowData?.[0]?.executor);
    }

  }, [props.tableRowData, props.showDialog]);
  /// DISABLE ALL field///

  //
  //Deaceased handle change
  const handleChangeDeceased = (event) => {
    const obj = {
      ...editDeceasedInputs,
      [event.target.name]: event.target.value
    };
    setDeceasedInputs(obj);
  };
  //
  // Court handle change
  const handleChangeCourt = (event) => {
    const obj = {
      ...editCourtInputs,
      [event.target.name]: event.target.value
    };
    setCourtInputs(obj);
  };
  //
  // Executor handle change
  const handleChangeExecutor = (event) => {
    const obj = {
      ...editExecutorInputs,
      [event.target.name]: event.target.value
    };
    setExecutorInputs(obj);
  };

  /////// VALIDATE Yes/No deaceased RECORDS
  const filterData = (internalArr, editDeceasedInputsValue) => {
    if (!editDeceasedInputsValue?.deceased) {
      internalArr.push({
        alertType: 'warning',
        text: "Changing the information to 'No' will remove the consumer status from deceased.",
        backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
        iconColor: ColorPallete.Alert.Warning.iconColor
      });
    }
  };

  const validateZipCode = (input, data, internalArr) => {
    const errMsg = 'Invalid Postal code';
    const response = validatePostalCode(input, errMsg);
    if (response && response != '') {
      internalArr.push({
        fieldName: data.name,
        text: response
      });
    }
  };

  const getState = (data) => {
    if (data.length > 0) {
      props.statesData.length > 0 &&
        props.statesData.forEach((st) => {
          if (data[0].stateRefId == st.code) {
            data[0].stateRefId = st.id;
          }
          if (data[0].executor.stateRefId == st.code) {
            data[0].executor.stateRefId = st.id;
          }
          if (data[0].courtInformation.stateRefId == st.code) {
            data[0].courtInformation.stateRefId = st.id;
          }
        });
    }
  };

  React.useEffect(() => {
    setIndicatorDialog(true);
    if (props.showDialog === false) {
      if (errorValueDeceased.length) {
        setErrorDeceased([])
      }
      if (errorValueCourt.length) {
        setErrorCourt([])
      }
      if (errorValueExecutor.length) {
        setErrorExecutor([])
      }
    }
  }, [props.showDialog]);

  // On select yes/no deaceased
  React.useEffect(() => {
    let errorArr = [];
    filterData(errorArr, editDeceasedInputs);
    setWarnings(errorArr);
  }, [editDeceasedInputs]);
  //

  ///////////////////// SAVE STATES DATA IN STATE OPTION FORM /////////////////////////////////
  React.useEffect(() => {
    if (props.statesData?.length > 0 && indicatorDialog) {
      const deceasedlist = handleOptionsData(deceasedForm, 'stateRefId', props.statesData);
      setdeceasedForm(deceasedlist);
      const courtlist = handleOptionsData(courtInfoForm, 'stateRefId', props.statesData);
      setcourtInfoForm(courtlist);
      const executorlist = handleOptionsData(executorForm, 'stateRefId', props.statesData);
      setexecutorForm(executorlist);
    }
  }, [props.statesData, indicatorDialog]);

  const validateAndConvertPhoneNumber = (input, data, internalArr) => {
    if (data.operation?.includes('formatPhoneNumber')) {
      if (input == undefined) {
        recordErrors(data, internalArr);
      } else {
        const phoneNumber = input.replace(/[-_ )(]/g, '');
        if (phoneNumber.length < 10) {
          internalArr.push({
            fieldName: data.name,
            text: 'Invalid Phone Number'
          });
        }
        editExecutorInputs[data.accessor] = phoneNumber;
      }
    }
  };
  const validateAndConvertPhoneNumberForCourt = (input, data, internalArr) => {
    if (data.operation?.includes('formatPhoneNumber')) {
      if (input == undefined) {
        recordErrors(data, internalArr);
      } else {
        const phoneNumber = input.replace(/[-_ )(]/g, '');
        if (phoneNumber.length < 10) {
          internalArr.push({
            fieldName: data.name,
            text: 'Invalid Phone Number'
          });
        }
        editCourtInputs[data.accessor] = phoneNumber;
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef;

    let internalArrDeceased = [];
    let internalArrCourt = [];
    let internalArrExecutor = [];
    
    function pushErrorIfEarlierDate(input1, input2, fieldName, errorMessage, errorArr) {
      if (input1 && input2) {
        if (new Date(input1) < new Date(input2)) {
          errorArr.push({
            fieldName: fieldName,
            text: errorMessage
          });
        }
      }
    }
    
    pushErrorIfEarlierDate(editDeceasedInputs.fileDate, editDeceasedInputs.date, 'fileDate', 'Filed Date cannot be earlier than Deceased Date', internalArrDeceased);
    pushErrorIfEarlierDate(editDeceasedInputs.verifiedDate, editDeceasedInputs.fileDate, 'verifiedDate', 'Verification Date cannot be earlier than File Date', internalArrDeceased);
    pushErrorIfEarlierDate(editDeceasedInputs.verifiedDate, editDeceasedInputs.date, 'verifiedDate', 'Verification Date cannot be earlier than Deceased Date', internalArrDeceased);
    //NOSONAR
    // if (editDeceasedInputs.date && editDeceasedInputs.fileDate) {
    //   if (
    //     new Date(editDeceasedInputs.fileDate) <
    //     new Date(editDeceasedInputs.date)
    //   ) {
    //     internalArrDeceased.push({
    //       fieldName: 'fileDate',
    //       text: 'Filed Date cannot be earlier than Deceased Date'
    //     });
    //   }
    // }
    // if (editDeceasedInputs.verifiedDate && editDeceasedInputs.fileDate) {
    //   if (
    //     new Date(editDeceasedInputs.verifiedDate) <
    //     new Date(editDeceasedInputs.fileDate)
    //   ) {
    //     internalArrDeceased.push({
    //       fieldName: 'verifiedDate',
    //       text: 'Verification Date cannot be earlier than File Date'
    //     });
    //   }
    // }
    // if (editDeceasedInputs.verifiedDate && editDeceasedInputs.date) {
    //   if (
    //     new Date(editDeceasedInputs.verifiedDate) <
    //     new Date(editDeceasedInputs.date)
    //   ) {
    //     internalArrDeceased.push({
    //       fieldName: 'verifiedDate',
    //       text: 'Verification Date cannot be earlier than Deceased Date'
    //     });
    //   }
    // }
    deceasedForm.forEach((dataDeceased) => {
      if (dataDeceased.accessor == 'zipCode' && editDeceasedInputs[dataDeceased.accessor]) {
        validateZipCode(
          editDeceasedInputs[dataDeceased.accessor],
          dataDeceased,
          internalArrDeceased
        );
      }
      if (dataDeceased?.operation?.includes('validateAlphaText') && editDeceasedInputs[dataDeceased.accessor]) {
        const value = validateAlphaText(editDeceasedInputs[dataDeceased.accessor])
        if (value === false) {
          internalArrDeceased.push({
            fieldName: dataDeceased.name,
            text: "Input can only be alphabets"
          });
        }
      }
    });
    courtInfoForm.forEach((datacourtInfo) => {
      if (datacourtInfo.accessor == 'postalCode' && editCourtInputs[datacourtInfo.accessor]) {
        validateZipCode(editCourtInputs[datacourtInfo.accessor], datacourtInfo, internalArrCourt);
      }
      if (datacourtInfo?.operation?.includes('validateAlphaText') && editCourtInputs[datacourtInfo.accessor]) {
        const value = validateAlphaText(editCourtInputs[datacourtInfo.accessor])
        if (value === false) {
          internalArrCourt.push({
            fieldName: datacourtInfo.name,
            text: "Input can only be alphabets"
          });
        }
      }
      if (datacourtInfo?.operation?.includes('validateWebsite') && editCourtInputs[datacourtInfo.accessor]) {
        const value = validateWebsite(editCourtInputs[datacourtInfo.accessor])
        if (value?.result === false) {
          internalArrCourt.push({
            fieldName: datacourtInfo.name,
            text: value.message
          });
        }
      }
      if (datacourtInfo.accessor == 'phone' && editCourtInputs[datacourtInfo.accessor]) {
        validateAndConvertPhoneNumberForCourt(
          editCourtInputs[datacourtInfo.accessor],
          datacourtInfo,
          internalArrCourt
        );
      }
    });
    executorForm.forEach((dataexecutor) => {
      if (dataexecutor.accessor == 'zipCode' && editExecutorInputs[dataexecutor.accessor]) {
        validateZipCode(
          editExecutorInputs[dataexecutor.accessor],
          dataexecutor,
          internalArrExecutor
        );
      }
      if (dataexecutor?.operation?.includes('validateAlphaText') && editExecutorInputs[dataexecutor.accessor]) {
        const value = validateAlphaText(editExecutorInputs[dataexecutor.accessor])
        if (value === false) {
          internalArrExecutor.push({
            fieldName: dataexecutor.name,
            text: "Input can only be alphabets"
          });
        }
      }
      if (dataexecutor.accessor == 'phoneNumber' && editExecutorInputs[dataexecutor.accessor]) {
        validateAndConvertPhoneNumber(
          editExecutorInputs[dataexecutor.accessor],
          dataexecutor,
          internalArrExecutor
        );
      }
    });

    setErrorDeceased(internalArrDeceased);
    setErrorCourt(internalArrCourt);
    setErrorExecutor(internalArrExecutor);

    function replaceString(str) {
      return str && str.replace(/[-_ )(]/g, "");
    }
    
    const { 
      zipCode: deceasedZipCode,
      caseNumber,
      fileDate,
      ...deceasedInputs
    } = editDeceasedInputs;
    
    const { 
      postalCode: courtPostalCode, 
      phone: courtPhone,
      ...courtInputs
    } = editCourtInputs;
    
    const { 
      zipCode: executorZipCode,
      phoneNumber: executorPhoneNumber,
      ...executorInputs
    } = editExecutorInputs;
    
    deceasedInputs.zipCode = replaceString(deceasedZipCode) || null;
    courtInputs.postalCode = replaceString(courtPostalCode) || null;
    executorInputs.zipCode = replaceString(executorZipCode) || null;
    courtInputs.phone = courtPhone || null;
    executorInputs.phoneNumber = executorPhoneNumber || null;
    
    const finalObj = { ...deceasedInputs, courtInformation: courtInputs, executor: executorInputs };
    
    if (caseNumber) {
      finalObj.courtInformation.caseNumber = caseNumber;
    }
    
    if (fileDate) {
      finalObj.courtInformation.fileDate = fileDate;
    }
    
    if (deceasedInputs.deceased) {
      props.EDITDEACEASED(
        form,
        props.tableRowData[0].id,
        finalObj,
        props.handleDialog,
        props.showDialog,
        localStorage.getItem('customerId')
      );
    } else {
      props.DELETEDEACEASED(
        form,
        props.handleDialog,
        props.showDialog,
        localStorage.getItem('customerId')
      );
    }
    
    props.rotateExpandIcon();
    
  };

  
  /////// CLEAR WARNINGS
  const clearWarnings = () => {
    setWarnings([]);
  };

  React.useEffect(() => {
    setIndicatorDialog(true);
    if (!props.showDialog) {
      setErrorDeceased([]);
      setErrorCourt([]);
      setErrorExecutor([]);
    }
  }, [props.showDialog]);

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
        formName="editDeceasedForm">
        <EditDeceasedForm
          DeceasedInfoFormData={deceasedForm}
          CourtInfoFormData={courtInfoForm}
          ExcutorInfoFormData={executorForm}
          handleFormSubmit={handleFormSubmit}
          handleChangeDeceased={handleChangeDeceased}
          editDeceasedInputs={editDeceasedInputs}
          handleChangeCourt={handleChangeCourt}
          editCourtInputs={editCourtInputs}
          handleChangeExecutor={handleChangeExecutor}
          editExecutorInputs={editExecutorInputs}
          errorValueDeceased={errorValueDeceased}
          errorValueCourt={errorValueCourt}
          errorValueExecutor={errorValueExecutor}
          formRef={formRef}
          statesData={props.statesData}
        />
      </PopUp>
    </>
  );
}

const EditDeceasedForm = (props) => {
  if (props.editDeceasedInputs?.zipCode) {
    const zipCode = props.editDeceasedInputs?.zipCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.DeceasedInfoFormData,'zipCode', zipCode);
  }

  if (props.editCourtInputs?.postalCode) {
    const postalCode = props.editCourtInputs?.postalCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.CourtInfoFormData,'postalCode', postalCode);
  }
  if ('phone' in props.editCourtInputs && props.editCourtInputs.phone) {
    const plainTextPhone = props.editCourtInputs.phone.replace(/[-_ )(]/g, '');
    conditionBasedPhonePatternWithExt(props.CourtInfoFormData, 'phone', plainTextPhone);
  }
  if (props.editExecutorInputs?.zipCode) {
    const zipCode = props.editExecutorInputs?.zipCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.ExcutorInfoFormData,'zipCode', zipCode);
  }
  
  if ('phoneNumber' in props.editExecutorInputs && props.editExecutorInputs.phoneNumber) {
    const plainTextPhone = props.editExecutorInputs.phoneNumber.replace(/[-_ )(]/g, '');
    conditionBasedPhonePatternWithExt(props.ExcutorInfoFormData, 'phoneNumber', plainTextPhone);
  }

  if (props.statesData.length > 0) {
    if (!props.editDeceasedInputs?.deceased) {
      props.DeceasedInfoFormData.forEach((allDeceasedFormdata) => {
        allDeceasedFormdata.disabled = true;
        if (allDeceasedFormdata.type == 'select') {
          allDeceasedFormdata.options.optionsData[0].disabled = true;
        }
      });
      //court form disable
      props.CourtInfoFormData.forEach((allCourtForms) => {
        allCourtForms.disabled = true;
        if (allCourtForms.type == 'select') {
          allCourtForms.options.optionsData[0].disabled = true;
        }
      });
      //executor form disable
      props.ExcutorInfoFormData.forEach((allexecutorForms) => {
        allexecutorForms.disabled = true;
        if (allexecutorForms.type == 'select') {
          allexecutorForms.options.optionsData[0].disabled = true;
        }
      });
    }
    if (props.editDeceasedInputs?.deceased) {

      //deceased form disable
      props.DeceasedInfoFormData.forEach((allDeceasedForm) => {
        delete allDeceasedForm.disabled;
        if (allDeceasedForm.type == 'select' && allDeceasedForm?.options && Object.keys(allDeceasedForm?.options).length && allDeceasedForm?.options?.optionsData[0]) {
          delete allDeceasedForm.options.optionsData[0].disabled;
        }
      });
      //court form disable
      props.CourtInfoFormData.forEach((allCourtForm) => {
        delete allCourtForm.disabled;
        if (allCourtForm.type == 'select' && allCourtForm?.options && Object.keys(allCourtForm?.options).length && allCourtForm?.options?.optionsData[0]) {
          delete allCourtForm.options.optionsData[0].disabled;
        }
      });
      //executor form disable
      props.ExcutorInfoFormData.forEach((allexecutorForm) => {
        delete allexecutorForm.disabled;
        if (allexecutorForm.type == 'select' && allexecutorForm?.options && Object.keys(allexecutorForm?.options).length && allexecutorForm?.options?.optionsData[0]) {
          delete allexecutorForm.options.optionsData[0].disabled;
        }
      });
    }
  }
  //Disabling the form when selected no  ////////////////////////


  /////////////////////////////////////////////////////////
  return (
    <form
      id="editDeceasedForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <div
        style={{
          marginBottom: '7px',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '21px'
        }}>
        Deceased Information
      </div>
      <Grid container>
        {props.DeceasedInfoFormData?.map((data) => {
          return (
            <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '10px' }} style={data.style}>
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
                  <FormControl required={data.required} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.handleChangeDeceased}
                      error={props.errorValueDeceased}
                      errorText={props.errorValueDeceased}
                      editValues={props.editDeceasedInputs}
                    />
                  </FormControl>
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.handleChangeDeceased}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                    editValues={props.editDeceasedInputs}
                  />
                )}
                {data.type == 'autoComplete' && (
                  <AutoCompleteComp
                    data={data}
                    captureInputs={props.handleChangeDeceased}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                    editValues={props.editDeceasedInputs}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleChangeDeceased}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                    editValues={props.editDeceasedInputs}
                    accessor={data.accessor}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                    captureInputs={props.handleChangeDeceased}
                    editValues={props.editDeceasedInputs}
                  />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    maxDate={data.maxDate}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                    captureInputs={props.handleChangeDeceased}
                    editValues={props.editDeceasedInputs}
                  />
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
      {/* court info */}
      <div
        style={{
          marginTop: '26px',
          marginBottom: '7px',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '21px'
        }}>
        Court Information
      </div>
      <Grid container>
        {props.CourtInfoFormData?.map((data) => {
          return (
            <Grid
              item
              xs={data.xs}
              key={data.id}
              style={data.style ?? {}}
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
                {data.type == 'input' && (
                  <FormControl required={data.required} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.handleChangeCourt}
                      error={props.errorValueCourt}
                      errorText={props.errorValueCourt}
                      editValues={props.editCourtInputs}
                    />
                  </FormControl>
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.handleChangeCourt}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    editValues={props.editCourtInputs}
                  />
                )}
                {data.type == 'autoComplete' && (
                  <AutoCompleteComp
                    data={data}
                    captureInputs={props.handleChangeCourt}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    editValues={props.editCourtInputs}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleChangeCourt}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    editValues={props.editCourtInputs}
                    component={'address'}
                    accessor={data.accessor}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    captureInputs={props.handleChangeCourt}
                    editValues={props.editCourtInputs}
                  />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    maxDate={new Date()}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    captureInputs={props.handleChangeCourt}
                    editValues={props.editCourtInputs}
                  />
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
      {/* executor info */}
      <div
        style={{
          marginTop: '26px',
          marginBottom: '7px',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '21px'
        }}>
        Executor Information
      </div>
      <Grid container>
        {props.ExcutorInfoFormData?.map((data) => {
          return (
            <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '10px' }} style={data.style}>
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
                  <FormControl required={data.required} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.handleChangeExecutor}
                      error={props.errorValueExecutor}
                      errorText={props.errorValueExecutor}
                      editValues={props.editExecutorInputs}
                    />
                  </FormControl>
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.handleChangeExecutor}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                    editValues={props.editExecutorInputs}
                  />
                )}
                {data.type == 'autoComplete' && (
                  <AutoCompleteComp
                    data={data}
                    captureInputs={props.handleChangeExecutor}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                    editValues={props.editExecutorInputs}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleChangeExecutor}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                    editValues={props.editExecutorInputs}
                    component={'address'}
                    accessor={data.accessor}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                    captureInputs={props.handleChangeExecutor}
                    editValues={props.editExecutorInputs}
                  />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                    captureInputs={props.handleChangeExecutor}
                    editValues={props.editExecutorInputs}
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
    editDeceasedInputs: state.ConsumerDetailsReducer.editDeceasedInputs,
    addressTypes: state.ContactInfoReducer.addressTypes,
    countriesData: state.StaticDataReducer.countriesData,
    statesData: state.StaticDataReducer.getstates
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITDEACEASED: async (
      form,
      deceasedInformationId,
      editDeaceasedInputs,
      handleDialog,
      showDialog,
      customerId
    ) => {
      await dispatch(
        EDITDEACEASED(
          form,
          deceasedInformationId,
          editDeaceasedInputs,
          handleDialog,
          showDialog,
          customerId
        )
      );
    },
    DELETEDEACEASED: async (form, handleDialog, showDialog, customerId) => {
      await dispatch(DELETEDEACEASED(form, handleDialog, showDialog, customerId));
    },
    GETDECEASEDINFO: async (customerId) => {
      await dispatch(GETDECEASEDINFO(customerId));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditDeceased);
