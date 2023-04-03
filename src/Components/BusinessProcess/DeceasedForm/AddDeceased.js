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
} from './AddDeceased.Data';
import ResponsiveDatePicker from '../../Common/AEComponents/DatePicker/ResponsiveDatePicker';
import RadioButtonGroup from '../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../theme/ColorPallete';
import {
  ADDDECEASEDINPUTS,
  ADDCOURTINPUTS,
  ADDEXECUTORINPUTS
} from '../../../Actions/ConsumerDetails/Actions';
import { ADDDECEASED } from '../../../Actions/ConsumerDetails/ActionCreators';
import TextFieldComp from '../../Common/AEComponents/TextField/TextFieldComp';
import { handleOptionsData, validatePostalCode, validateAlphaText, conditionBasedPhonePatternWithExt, validateWebsite, conditionBasedZipcodePattern, nestedIfCaseHandle } from '../../Common/commonfunctions.js';


function AddDeceased(props) {
  const formRef = React.useRef();
  // 3 forms are
  const [deceasedForm, setdeceasedForm] = React.useState(DeceasedInfoFormData);
  const [courtInfoForm, setcourtInfoForm] = React.useState(CourtInfoFormData);
  const [executorForm, setexecutorForm] = React.useState(ExcutorInfoFormData);

  const [errorValueDeceased, setErrorDeceased] = React.useState([]);
  const [errorValueCourt, setErrorCourt] = React.useState([]);
  const [errorValueExecutor, setErrorExecutor] = React.useState([]);

  const [addDeceasedInputs, setDeceasedInputs] = React.useState({});
  const [addCourtInputs, setCourtInputs] = React.useState({});
  const [addExecutorInputs, setExecutorInputs] = React.useState({});

  const [indicatorDialog, setIndicatorDialog] = React.useState(false);

  React.useEffect(() => {
    setDeceasedInputs(props.addDeceasedInputs);
    setCourtInputs(props.addCourtInputs);
    setExecutorInputs(props.addExecutorInputs);
  }, [props.addDeceasedInputs, props.addCourtInputs, props.addExecutorInputs]);

  const recordErrors = (data, internalArr) => {
    internalArr.push({
      fieldName: data.name,
      text: `Please enter ${data.label}`
    });
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
        addCourtInputs[data.accessor] = phoneNumber;
      }
    }
  };

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
        addExecutorInputs[data.accessor] = phoneNumber;
      }
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

  ///////////////////// SAVE STATES DATA IN STATE /////////////////////////////////

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef;
    let internalArrCourt = [];
    let internalArrExecutor = [];
    let internalArrDeceased = [];

const { date, verifiedDate, fileDate } = addDeceasedInputs;

const parsedDate = new Date(date);
const parsedVerifiedDate = new Date(verifiedDate);
const parsedFileDate = new Date(fileDate);

if (parsedFileDate < parsedDate) {
  internalArrDeceased = [...internalArrDeceased,{ fieldName: 'fileDate', text: 'Filed Date cannot be earlier than Deceased Date' }  ];
}

if (parsedVerifiedDate < parsedFileDate) {
  internalArrDeceased = [...internalArrDeceased,{ fieldName: 'verifiedDate', text: 'Verification Date cannot be earlier than File Date' }];
}

if (parsedVerifiedDate < parsedDate) {
  internalArrDeceased = [...internalArrDeceased,{ fieldName: 'verifiedDate', text: 'Verification Date cannot be earlier than Deceased Date' }];
}


    deceasedForm.forEach((dataDeceased) => {
      if (dataDeceased.accessor == 'zipCode' && addDeceasedInputs[dataDeceased.accessor]) {
        validateZipCode(
          addDeceasedInputs[dataDeceased.accessor],
          dataDeceased,
          internalArrDeceased
        );
      }

      if (dataDeceased?.operation?.includes('validateAlphaText') && addDeceasedInputs[dataDeceased.accessor]) {
        const value = validateAlphaText(addDeceasedInputs[dataDeceased.accessor])
        if (value === false) {
          internalArrDeceased.push({
            fieldName: dataDeceased.name,
            text: "Input can only be alphabets"
          });
        }
      }

    });
    courtInfoForm.forEach((datacourtInfo) => {
      if (datacourtInfo.accessor == 'postalCode' && addCourtInputs[datacourtInfo.accessor]) {
        validateZipCode(addCourtInputs[datacourtInfo.accessor], datacourtInfo, internalArrCourt);
      }
      if (datacourtInfo?.operation?.includes('validateAlphaText') && addCourtInputs[datacourtInfo.accessor]) {
        const value = validateAlphaText(addCourtInputs[datacourtInfo.accessor])
        if (value === false) {
          internalArrCourt.push({
            fieldName: datacourtInfo.name,
            text: "Input can only be alphabets"
          });
        }
      }
      if (datacourtInfo?.operation?.includes('validateWebsite') && addCourtInputs[datacourtInfo.accessor]) {
        const value = validateWebsite(addCourtInputs[datacourtInfo.accessor])
        if (value?.result === false) {
          internalArrCourt.push({
            fieldName: datacourtInfo.name,
            text: value.message
          });
        }
      }
      if (datacourtInfo.accessor == 'phone' && addCourtInputs[datacourtInfo.accessor]) {
        validateAndConvertPhoneNumberForCourt(
          addCourtInputs[datacourtInfo.accessor],
          datacourtInfo,
          internalArrCourt
        );
      }
    });
    executorForm.forEach((dataexecutor) => {
      if (dataexecutor.accessor == 'zipCode' && addExecutorInputs[dataexecutor.accessor]) {
        validateZipCode(
          addExecutorInputs[dataexecutor.accessor],
          dataexecutor,
          internalArrExecutor
        );
      }
      if (dataexecutor.accessor == 'phoneNumber' && addExecutorInputs[dataexecutor.accessor]) {
        validateAndConvertPhoneNumber(
          addExecutorInputs[dataexecutor.accessor],
          dataexecutor,
          internalArrExecutor
        );
      }
      if (dataexecutor?.operation?.includes('validateAlphaText') && addExecutorInputs[dataexecutor.accessor]) {
        const value = validateAlphaText(addExecutorInputs[dataexecutor.accessor])
        if (value === false) {
          internalArrExecutor.push({
            fieldName: dataexecutor.name,
            text: "Input can only be alphabets"
          });
        }
      }
    });

    setErrorDeceased(internalArrDeceased);
    setErrorCourt(internalArrCourt);
    setErrorExecutor(internalArrExecutor);

    if (
      internalArrDeceased.length == 0 &&
      internalArrCourt.length == 0 &&
      internalArrExecutor.length == 0
    ) {
      const { zipCode, caseNumber, fileDate } = addDeceasedInputs;
      const { postalCode, phone } = addCourtInputs;
      const { zipCode: executorZipCode, phoneNumber } = addExecutorInputs;
      
      addDeceasedInputs.zipCode = zipCode?.replace(/[-_ )(]/g, "") || null;
      addCourtInputs.postalCode = postalCode?.replace(/[-_ )(]/g, "") || null;
      addExecutorInputs.zipCode = executorZipCode?.replace(/[-_ )(]/g, "") || null;
      addCourtInputs.phone = phone || null;
      addExecutorInputs.phoneNumber = phoneNumber || null;
      //NOSONAR       we cant change this code 
      nestedIfCaseHandle(caseNumber , addCourtInputs.caseNumber = caseNumber , null);
      delete addDeceasedInputs.caseNumber;
      //NOSONAR        we cant change this code
      nestedIfCaseHandle(fileDate ,addCourtInputs.fileDate = fileDate , null);
      delete addDeceasedInputs.fileDate;
      
      const finalObj = { ...addDeceasedInputs };
      finalObj.courtInformation = addCourtInputs;
      finalObj.executor = addExecutorInputs;

      finalObj['zipCode'] = finalObj['zipCode'] && finalObj['zipCode'].replace(/[-_ )(]/g, '');
      finalObj.courtInformation['postalCode'] =
        finalObj.courtInformation['postalCode'] &&
        finalObj.courtInformation['postalCode'].replace(/[-_ )(]/g, '');
      finalObj.executor['zipCode'] =
        finalObj.executor['zipCode'] && finalObj.executor['zipCode'].replace(/[-_ )(]/g, '');
      props.ADDDECEASED(
        form,
        finalObj,
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
        formName="addDeceasedForm">
        <AddDeceasedForm
          DeceasedInfoFormData={deceasedForm}
          CourtInfoFormData={courtInfoForm}
          ExecutorInfoFormData={executorForm}
          ADDDECEASEDINPUTS={props.ADDDECEASEDINPUTS}
          ADDCOURTINPUTS={props.ADDCOURTINPUTS}
          ADDEXECUTORINPUTS={props.ADDEXECUTORINPUTS}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          errorValueDeceased={errorValueDeceased}
          errorValueCourt={errorValueCourt}
          errorValueExecutor={errorValueExecutor}
          addDeceasedInputs={addDeceasedInputs}
          addCourtInputs={addCourtInputs}
          addExecutorInputs={addExecutorInputs}
        />
      </PopUp>
    </>
  );
}

const AddDeceasedForm = (props) => {
  const regexReplace = str => str?.replace(/[-_ )(]/g, '');

  if (props.addDeceasedInputs?.zipCode) {
    const zipCode = regexReplace(props.addDeceasedInputs.zipCode);
    conditionBasedZipcodePattern(props.DeceasedInfoFormData, 'zipCode', zipCode);
  }
  
  if (props.addCourtInputs?.postalCode) {
    const postalCode = regexReplace(props.addCourtInputs.postalCode);
    conditionBasedZipcodePattern(props.CourtInfoFormData, 'postalCode', postalCode);
  }
  
  if (props.addCourtInputs?.phone) {
    const plainTextPhone = regexReplace(props.addCourtInputs.phone);
    conditionBasedPhonePatternWithExt(props.CourtInfoFormData, 'phone', plainTextPhone);
  }
  
  if (props.addExecutorInputs?.zipCode) {
    const zipCode = regexReplace(props.addExecutorInputs.zipCode);
    conditionBasedZipcodePattern(props.ExecutorInfoFormData, 'zipCode', zipCode);
  }
  
  if (props.addExecutorInputs?.phoneNumber) {
    const plainTextPhone = regexReplace(props.addExecutorInputs.phoneNumber);
    conditionBasedPhonePatternWithExt(props.ExecutorInfoFormData, 'phoneNumber', plainTextPhone);
  }
  
  return (
    <form
      id="addDeceasedForm"
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
                  <TextFieldComp
                    data={data}
                    captureInputs={props.ADDDECEASEDINPUTS}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                    userInputs={props.addDeceasedInputs}
                  />
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.ADDDECEASEDINPUTS}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                    userInputs={data.sendUserInputs ? props.addDeceasedInputs : null}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDDECEASEDINPUTS}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                  />

                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.ADDDECEASEDINPUTS}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}
                  />

                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    maxDate={data.maxDate}
                    captureInputs={props.ADDDECEASEDINPUTS}
                    error={props.errorValueDeceased}
                    errorText={props.errorValueDeceased}

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
                  <TextFieldComp
                    data={data}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    userInputs={props.addCourtInputs}
                  />
                )}

                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                  />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    maxDate={new Date()}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                  />
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    userInputs={data.sendUserInputs ? props.addCourtInputs : null}
                    phoneNumberFormat={props.phoneNumberFormat}
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
        {props.ExecutorInfoFormData?.map((data) => {
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
                  <FormControl required={data.required ?? false} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.ADDEXECUTORINPUTS}
                      error={props.errorValueExecutor}
                      errorText={props.errorValueExecutor}
                      userInputs={props.addExecutorInputs}
                    />
                  </FormControl>
                )}

                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDEXECUTORINPUTS}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.ADDEXECUTORINPUTS}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                  />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    captureInputs={props.ADDEXECUTORINPUTS}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                  />
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.ADDEXECUTORINPUTS}
                    error={props.errorValueExecutor}
                    errorText={props.errorValueExecutor}
                    userInputs={data.sendUserInputs ? props.addExecutorInputs : null}
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
    addDeceasedInputs: state.ConsumerDetailsReducer.addDeceasedInputs,
    addCourtInputs: state.ConsumerDetailsReducer.addCourtInputs,
    addExecutorInputs: state.ConsumerDetailsReducer.addExecutorInputs,
    countriesData: state.StaticDataReducer.countriesData,
    statesData: state.StaticDataReducer.getstates
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ADDDECEASEDINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDDECEASEDINPUTS(name, value));
    },
    ADDCOURTINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDCOURTINPUTS(name, value));
    },
    ADDEXECUTORINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDEXECUTORINPUTS(name, value));
    },
    ADDDECEASED: async (form, addDeceasedInputs, customerId, handleDialog, showDialog, navigateToGenInfo) => {
      await dispatch(ADDDECEASED(form, addDeceasedInputs, customerId, handleDialog, showDialog, navigateToGenInfo));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDeceased);
