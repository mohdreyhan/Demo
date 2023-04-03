import React from 'react';
import { Grid, FormControl } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton';
import PatternFormatTextfield from '../../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';
import {
  dialogDataHeader,
  dialogDataFooter,
  BankruptcyInfoFormData,
  CourtInfoFormData,
  TrusteeInfoFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddBankruptcy.Data';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';
import { ADDBANKRUPTCY } from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators';
import {
  ADDBANKRUPTCYINPUTS,
  ADDCOURTINPUTS,
  ADDTRUSTEEINPUTS
} from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions';
import {
  handleOptionsData,
  validateError,
  validateHelperText,
  convertTimetoUTC,
  nestedIfCaseHandle,
  returnValueOrDefault,
  conditionBasedZipcodePattern,
  conditionBasedPhonePatternWithExt 
} from '../../../../../Common/commonfunctions';
import {
  validatePhoneNumber,
  validateZipCode,
  validateWebsiteFormField
} from '../../../../../Common/CommonFunctions/CommonFunctionForm.js';

function AddBankruptcy(props) {
  const formRef = React.useRef();
  const [bankruptcyForm, setbankruptcyForm] = React.useState(BankruptcyInfoFormData);
  const [courtInfoForm, setcourtInfoForm] = React.useState(CourtInfoFormData);
  const [TrusteeForm, setTrusteeForm] = React.useState(TrusteeInfoFormData);

  const [errorValueBankruptcy, setErrorBankruptcy] = React.useState([]);
  const [errorValueCourt, setErrorCourt] = React.useState([]);
  const [errorValueTrustee, setErrorTrustee] = React.useState([]);

  const [addBankruptcyInputs, setBankruptcyInputs] = React.useState({});
  const [addCourtInputs, setCourtInputs] = React.useState({});
  const [addTrusteeInputs, setTrusteeInputs] = React.useState({});

  const [indicatorDialog, setIndicatorDialog] = React.useState(false);
  const [DialogDataFooterData , setDialogDataFooterData] = React.useState(dialogDataFooter);


  const handleDisabled = ()=>{
    let footerValue = dialogDataFooter.map((footerData) => {
      if (footerData.accessor == 'addButton')
      {footerData.disabled = true;
     return footerData;}
      else { return { ...footerData }; } });
     setDialogDataFooterData(footerValue);
  }

  React.useEffect(()=>{
    let footerValues = dialogDataFooter.map((footerData) => {
      if (footerData.accessor == 'addButton')
      {footerData.disabled = false;
     return footerData;}
      else { return { ...footerData }; } });
     setDialogDataFooterData(footerValues);
  },[])
  React.useEffect(() => {
    setBankruptcyInputs(props.addBankruptcyInputs);
    setCourtInputs(props.addCourtInputs);
    setTrusteeInputs(props.addTrusteeInputs);

    const arr = [];
    BankruptcyInfoFormData?.map((data) => {
      if (data.accessor == 'verificationDate') {
        let fileDateInput = convertTimetoUTC(props.addBankruptcyInputs?.fileDate);
        const defaultMinDate = convertTimetoUTC(new Date('1900-01-01'));

        let minVerificationDate = defaultMinDate < fileDateInput ? fileDateInput : defaultMinDate;
        return arr.push({
          ...data,
          minDate: minVerificationDate
        });
      } else {
        return arr.push({ ...data });
      }
    });
    if (props.bankruptcyTypes?.length > 0) {
      const arrnew = handleOptionsData(arr, 'bankruptcyTypeId', props.bankruptcyTypes);
      setbankruptcyForm(arrnew);
    }
  }, [
    props.addBankruptcyInputs,
    props.addCourtInputs,
    props.addTrusteeInputs,
    props.bankruptcyTypes,
    indicatorDialog
  ]);

  React.useEffect(() => {
    setIndicatorDialog(true);
  }, [props.showDialog]);

  ///////////////////// SAVE STATES DATA IN STATE /////////////////////////////////

  React.useEffect(() => {
    if (props.statesData?.length > 0 && indicatorDialog) {
      const courtlist = handleOptionsData(courtInfoForm, 'stateId', props.statesData);
      setcourtInfoForm(courtlist);
      const trusteelist = handleOptionsData(TrusteeForm, 'stateId', props.statesData);
      setTrusteeForm(trusteelist);
    }
  }, [props.statesData, indicatorDialog]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef;
    let internalArrBankruptcy = [];
    let internalArrCourt = [];
    let internalArrTrustee = [];

    const inputBankruptcy = bankruptcyForm.filter(databankruptcy => 
      databankruptcy.type === "input" && addBankruptcyInputs[databankruptcy.accessor]
  );
  
  for (const databankruptcy of inputBankruptcy) {
      const inputValue = addBankruptcyInputs[databankruptcy.accessor].trim();
      
      if (inputValue.length === 0) {
          delete addBankruptcyInputs[databankruptcy.accessor];
      } else {
          addBankruptcyInputs[databankruptcy.accessor] = inputValue;
      }
  }
  
  if (addBankruptcyInputs.verificationDate && addBankruptcyInputs.fileDate) {
      const verificationDate = new Date(addBankruptcyInputs.verificationDate);
      const fileDate = new Date(addBankruptcyInputs.fileDate);
      
      if (verificationDate < fileDate) {
          internalArrBankruptcy.push({
              fieldName: 'verificationDate',
              text: 'Verification Date cannot be earlier than File Date'
          });
      }
  }
  

    courtInfoForm.forEach((datacourtInfo) => {
      ////VALIDATE ZIP CODE
      validateZipCode(
        addCourtInputs[datacourtInfo.accessor],
        datacourtInfo,
        internalArrCourt,
        'Invalid Postal code'
      );
      ////VALIDATE PHONE NUMBER
      validatePhoneNumber(addCourtInputs[datacourtInfo.accessor], datacourtInfo, internalArrCourt);
      ////VALIDATE WESBITE
      validateWebsiteFormField(addCourtInputs[datacourtInfo.accessor], datacourtInfo, internalArrCourt);
      ///REMOVE TRAILING SPACES
      if (addCourtInputs[datacourtInfo.accessor] && datacourtInfo.type=="input") {
        if(addCourtInputs[datacourtInfo.accessor].trim().length > 0) {
          addCourtInputs[datacourtInfo.accessor] = addCourtInputs[datacourtInfo.accessor].trim();
        }
        else {
           delete addCourtInputs[datacourtInfo.accessor];
        }
      }
    });

    TrusteeForm.forEach((datatrustee) => {
      ////VALIDATE ZIP CODE
      validateZipCode(
        addTrusteeInputs[datatrustee.accessor],
        datatrustee,
        internalArrTrustee,
        'Invalid Postal code'
      );
      ////VALIDATE PHONE NUMBER
      validatePhoneNumber(addTrusteeInputs[datatrustee.accessor], datatrustee, internalArrTrustee);
      ///REMOVE TRAILING SPACES
      if (addTrusteeInputs[datatrustee.accessor] && datatrustee.type=="input") {
        if(addTrusteeInputs[datatrustee.accessor].trim().length > 0) {
          addTrusteeInputs[datatrustee.accessor] = addTrusteeInputs[datatrustee.accessor].trim()
        } else{
          delete addTrusteeInputs[datatrustee.accessor];
        }
      }
    });


    setErrorBankruptcy(internalArrBankruptcy);
    setErrorCourt(internalArrCourt);
    setErrorTrustee(internalArrTrustee);

    if (
      internalArrBankruptcy.length == 0 &&
      internalArrCourt.length == 0 &&
      internalArrTrustee.length == 0
    ) {

      const {postalCode,phone } = addCourtInputs;
       const{ postalCode : trusteePostalCode, phone : trusteePhone } = addTrusteeInputs;
      
      addCourtInputs.postalCode =postalCode?.replace(/[-_ )(]/g, '') || null;
      addCourtInputs.phone = phone?.replace(/[-_ )(]/g, '') || null;
      /////TRUSTEE INFO
      addTrusteeInputs.postalCode = trusteePostalCode?.replace(/[-_ )(]/g, '') || null;
      addTrusteeInputs.phone =trusteePhone?.replace(/[-_ )(]/g, '') || null;

      delete addBankruptcyInputs.isBankrupted;
      let finalObj = {};
      finalObj.bankruptcy = addBankruptcyInputs;
      finalObj.bankruptcy.courtInformation = addCourtInputs;
      finalObj.bankruptcy.trusteeInformation = addTrusteeInputs;
      handleDisabled();

      props.ADDBANKRUPTCY(
        form,
        finalObj,
        localStorage.getItem('responsibleId'),
        localStorage.getItem('customerId'),
        props.handleDialog,
        props.showDialog,
        props.navigateToGenInfo,
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
        dialogDataFooter={DialogDataFooterData}
        dialogStructureFooter={dialogStructureFooter}
        formName="addBankruptcyForm">
        <AddBankruptcyForm
          BankruptcyInfoFormData={bankruptcyForm}
          CourtInfoFormData={courtInfoForm}
          TrusteeInfoFormData={TrusteeForm}
          formRef={formRef}
          ADDBANKRUPTCYINPUTS={props.ADDBANKRUPTCYINPUTS}
          ADDCOURTINPUTS={props.ADDCOURTINPUTS}
          ADDTRUSTEEINPUTS={props.ADDTRUSTEEINPUTS}
          handleFormSubmit={handleFormSubmit}
          errorValueBankruptcy={errorValueBankruptcy}
          errorValueCourt={errorValueCourt}
          errorValueTrustee={errorValueTrustee}
          addBankruptcyInputs={addBankruptcyInputs}
          addCourtInputs={addCourtInputs}
          addTrusteeInputs={addTrusteeInputs}
        />
      </PopUp>
    </>
  );
}
const AddBankruptcyForm = (props) => {
  if ('postalCode' in props.addCourtInputs && props.addCourtInputs.postalCode) {
    const plainTextZipCode = props.addCourtInputs.postalCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.CourtInfoFormData, 'postalCode', plainTextZipCode);
  }

  if ('phone' in props.addCourtInputs && props.addCourtInputs.phone) {
    const plainTextPhone = props.addCourtInputs.phone.replace(/[-_ )(]/g, '');
    conditionBasedPhonePatternWithExt(props.CourtInfoFormData, 'phone', plainTextPhone);
  }

  if ('postalCode' in props.addTrusteeInputs && props.addTrusteeInputs.postalCode) {
    const plainTextZipCode = props.addTrusteeInputs.postalCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.TrusteeInfoFormData, 'postalCode', plainTextZipCode);
  }

  if ('phone' in props.addTrusteeInputs && props.addTrusteeInputs.phone) {
    const plainTextPhone = props.addTrusteeInputs.phone.replace(/[-_ )(]/g, '');
    conditionBasedPhonePatternWithExt(props.TrusteeInfoFormData, 'phone', plainTextPhone);
  }

  return (
    <form
      id="addBankruptcyForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.BankruptcyInfoFormData?.map((data) => {
          return (
            <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '10px' }} style={data.style}>
              {data.label}
              {data.type == 'radio' && data.required && (
                <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>
              )}
              <div style={{ width: returnValueOrDefault(data.width, '') }}>
                {data.type == 'input' && (
                  <TextFieldComp
                    data={data}
                    captureInputs={props.ADDBANKRUPTCYINPUTS}
                    error={props.errorValueBankruptcy}
                    errorText={props.errorValueBankruptcy}
                    userInputs={props.addBankruptcyInputs}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.ADDBANKRUPTCYINPUTS}
                    error={props.errorValueBankruptcy}
                    errorText={props.errorValueBankruptcy}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDBANKRUPTCYINPUTS}
                    error={props.errorValueBankruptcy}
                    errorText={props.errorValueBankruptcy}
                  />
                )}
                {data.type == 'date' && (
                  <ResponsiveDatePicker
                    data={data}
                    maxDate={data.maxDate}
                    captureInputs={props.ADDBANKRUPTCYINPUTS}
                    error={props.errorValueBankruptcy}
                    errorText={props.errorValueBankruptcy}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                    errorFieldBackgroundColor={
                      validateError(data, props.errorValueBankruptcy) ? true : false
                    }
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
              style={returnValueOrDefault(data.style, {})}
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

              <div style={{ width: returnValueOrDefault(data.width, '') }}>
                {data.type == 'input' && (
                  <TextFieldComp
                    data={data}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    userInputs={props.addCourtInputs}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}

                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.ADDCOURTINPUTS}
                    error={props.errorValueCourt}
                    errorText={props.errorValueCourt}
                    userInputs={nestedIfCaseHandle(
                      [data.sendUserInputs],
                      [props.addCourtInputs],
                      null
                    )}
                    phoneNumberFormat={props.phoneNumberFormat}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
      {/* Trustee info */}
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
        Trustee Information
      </div>
      <Grid container>
        {props.TrusteeInfoFormData?.map((data) => {
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
              <div style={{ width: returnValueOrDefault(data.width, '') }}>
                {data.type == 'input' && (
                  <FormControl required={data.required ?? false} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.ADDTRUSTEEINPUTS}
                      error={props.errorValueTrustee}
                      errorText={props.errorValueTrustee}
                      userInputs={props.addTrusteeInputs}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                    />
                  </FormControl>
                )}

                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDTRUSTEEINPUTS}
                    error={props.errorValueTrustee}
                    errorText={props.errorValueTrustee}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.ADDTRUSTEEINPUTS}
                    error={props.errorValueTrustee}
                    errorText={props.errorValueTrustee}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                  />
                )}

                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.ADDTRUSTEEINPUTS}
                    error={props.errorValueTrustee}
                    errorText={props.errorValueTrustee}
                    userInputs={nestedIfCaseHandle(
                      [data.sendUserInputs],
                      [props.addTrusteeInputs],
                      null
                    )}
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
    addBankruptcyInputs: state.ConsumerQuickActionsReducer.addBankruptcyInputs,
    addCourtInputs: state.ConsumerQuickActionsReducer.addCourtInputs,
    addTrusteeInputs: state.ConsumerQuickActionsReducer.addTrusteeInputs,
    statesData: state.StaticDataReducer.getstates,
    bankruptcyTypes: state.StaticDataReducer.bankruptcyTypes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDBANKRUPTCYINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;

      await dispatch(ADDBANKRUPTCYINPUTS(name, value));
    },
    ADDCOURTINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDCOURTINPUTS(name, value));
    },
    ADDTRUSTEEINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDTRUSTEEINPUTS(name, value));
    },

    ADDBANKRUPTCY: async (
      form,
      addBankruptcyInputs,
      responsibleId,
      customerId,
      handleDialog,
      showDialog,
      navigateToGenInfo,
    ) => {
      await dispatch(
        ADDBANKRUPTCY(
          form,
          addBankruptcyInputs,
          responsibleId,
          customerId,
          handleDialog,
          showDialog,
          navigateToGenInfo,
        )
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBankruptcy);
