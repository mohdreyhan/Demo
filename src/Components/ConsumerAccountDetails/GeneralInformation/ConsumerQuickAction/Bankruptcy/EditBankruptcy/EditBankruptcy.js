import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, FormControl } from '@oasis/react-core';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import {
  renderLabel,
  validateWebsiteFormField
} from '../../../../../Common/CommonFunctions/CommonFunctionForm';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditBankruptcyFormData,
  dialogStructureHeader,
  dialogStructureFooter,
  CourtInfoFormData,
  TrusteeInfoFormData
} from './EditBankruptcy.data.js';
import {
  EDITBANKRUPTCY,
  DELETEBANKRUPTCY
} from '../../../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators';
import ResponsiveDatePicker from '../../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';
import PatternFormatTextfield from '../../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';
import {
  conditionBasedPhonePatternWithExt,
  conditionBasedZipcodePattern,
  handleOptionsData,
  validateError,
  validateHelperText,
  validatePostalCode,
  replaceString
} from '../../../../../Common/commonfunctions';
import { ColorPallete } from '../../../../../../theme/ColorPallete';

const EditBankruptcy = (props) => {
  const [editBankruptcyForm, setEditBankruptcyForm] = useState(EditBankruptcyFormData);
  const [courtInfoForm, setCourtInfoForm] = useState(CourtInfoFormData);
  const [trusteeInfoForm, setTrusteeInfoForm] = useState(TrusteeInfoFormData);
  const [editBankruptcyFormDataInputs, setEditBankruptcyFormInputs] = useState({});
  const [courtInfoFormDataInputs, setCourtInfoFormDataInputs] = useState({});
  const [trusteeInfoFormDataInputs, setTrusteeInfoFormDataInputs] = useState({});
  const [indicatorDialog, setIndicatorDialog] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const [errorValueBankruptcyForm, setErrorValueBankruptcyForm] = useState([]);
  const [errorValueCourtInfoForm, setErrorValueCourtInfoForm] = useState([]);
  const [errorValueTrusteeInfoForm, setErrorValueTrusteeInfoForm] = useState([]);
  const [DialogDataFooterData, setDialogDataFooterData] = useState(dialogDataFooter);

  const handleDisabled = () => {
    let footerValue = dialogDataFooter.map((footerData) => {
      if (footerData.accessor == 'addButton') {
        footerData.disabled = true;
        return footerData;
      } else {
        return { ...footerData };
      }
    });
    setDialogDataFooterData(footerValue);
  };

  useEffect(() => {
    let footerValues = dialogDataFooter.map((footerData) => {
      if (footerData.accessor == 'addButton') {
        footerData.disabled = false;
        return footerData;
      } else {
        return { ...footerData };
      }
    });
    setDialogDataFooterData(footerValues);
  }, []);

  ///////////////GET ACTUAL API RESPONSE///////////////////
  useEffect(() => {
    if (props.bankruptcyInformation.length > 0) {
      const isBankrupted = Boolean(props.bankruptcyInformation.length > 0);
      setEditBankruptcyFormInputs({ ...props.bankruptcyInformation[0], isBankrupted });
      setCourtInfoFormDataInputs(props.bankruptcyInformation?.[0]?.courtInformation);
      setTrusteeInfoFormDataInputs(props.bankruptcyInformation?.[0]?.trusteeInformation);
    }
  }, [props.bankruptcyInformation, props.showDialog]);

  /////////////HANDLE EDIT BANKRUPTCY FORM///////////////////
  const handleEditBankruptcyForm = (event) => {
    const obj = {
      ...editBankruptcyFormDataInputs,
      [event.target.name]: event.target.value
    };
    setEditBankruptcyFormInputs(obj);
  };

  ///////////HANDLE COURT FORM ///////////////////////////////
  const handleCourtInfoForm = (event) => {
    const obj = {
      ...courtInfoFormDataInputs,
      [event.target.name]: event.target.value
    };
    setCourtInfoFormDataInputs(obj);
  };

  ///////////HANDLE COURT FORM ///////////////////////////////
  const handleTrusteeInfoForm = (event) => {
    const obj = {
      ...trusteeInfoFormDataInputs,
      [event.target.name]: event.target.value
    };
    setTrusteeInfoFormDataInputs(obj);
  };

  useEffect(() => {
    setIndicatorDialog(true);
  }, [props.showDialog]);

  ////////////////YES/NO SELECTION OF BANKRUPTCY///////////////
  useEffect(() => {
    let errorArr = [];
    noConfirmation(errorArr, editBankruptcyFormDataInputs);
    setWarnings(errorArr);
  }, [editBankruptcyFormDataInputs]);

  const noConfirmation = (errorArr, editBankruptcyFormDataInputsValue) => {
    if (!editBankruptcyFormDataInputsValue?.isBankrupted) {
      errorArr.push({
        alertType: 'warning',
        text: "Changing the information to 'No' will remove the Account Holder status from bankruptcy.",
        backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
        iconColor: ColorPallete.Alert.Warning.iconColor
      });
    }
  };

  const zipCodeValidation = (input, data, errorArr) => {
    const response = validatePostalCode(input);
    if (response && response != '') {
      errorArr.push({
        fieldName: data.name,
        text: 'Invalid Postal Code'
      });
    }
  };

  const phoneNumberValidation = (input, data, errorArr, allInputs) => {
    let phoneNumber = input.replace(/[-_ )(,]/g, '');
    if (phoneNumber.length < 10) {
      errorArr.push({
        fieldName: data.name,
        text: 'Invalid Phone Number'
      });
    } else {
      phoneNumber = phoneNumber.substring(0, 10) + ',' + phoneNumber.substring(10);
    }
    allInputs[data.accessor] = phoneNumber;
  };

  /////////////////// SAVE STATES DATA IN STATE OPTION FORM /////////////////////////////////
  useEffect(() => {
    if (props.statesData?.length > 0 && indicatorDialog) {
      //setEditBankruptcyForm({...editBankruptcyForm,minDate: editBankruptcyFormDataInputs.fileDate})
      const courtList = handleOptionsData(courtInfoForm, 'stateId', props.statesData);
      setCourtInfoForm(courtList);
      const executorList = handleOptionsData(trusteeInfoForm, 'stateId', props.statesData);
      setTrusteeInfoForm(executorList);
    }
  }, [props.statesData, indicatorDialog]);

  useEffect(() => {
    if (props.bankruptcyTypes?.length > 0) {
      const arr = handleOptionsData(editBankruptcyForm, 'bankruptcyTypeId', props.bankruptcyTypes);
      setEditBankruptcyForm(arr);
    }
  }, [props.bankruptcyTypes, indicatorDialog]);

  /////// CLEAR WARNINGS
  const clearWarnings = () => {
    setWarnings([]);
  };

  const settingNull = (courtPostalCode, courtPhone, trusteePostalCode, trusteePhone) => {
    if (courtPostalCode?.length == 0) {
      courtInfoFormDataInputs['postalCode'] = null;
    }
    if (courtPhone?.length == 0) {
      courtInfoFormDataInputs['phone'] = null;
    }
    if (trusteePostalCode?.length == 0) {
      trusteeInfoFormDataInputs['postalCode'] = null;
    }
    if (trusteePhone?.length == 0) {
      trusteeInfoFormDataInputs['phone'] = null;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let errorArrCourt = [];
    let errorArrBankrupt = [];
    let errorArrTrustee = [];

    editBankruptcyForm.forEach((databankruptcy) => {
      if (editBankruptcyFormDataInputs[databankruptcy.accessor] && databankruptcy.type == 'input') {
        if (editBankruptcyFormDataInputs[databankruptcy.accessor].trim().length > 0) {
          editBankruptcyFormDataInputs[databankruptcy.accessor] =
            editBankruptcyFormDataInputs[databankruptcy.accessor].trim();
        } else {
          delete editBankruptcyFormDataInputs[databankruptcy.accessor];
        }
      }
    });

    errorArrCourt = countInfoFormhandler();
    errorArrTrustee = trusteeInfoFormhandler();
    errorArrBankrupt = bankruptInfoFormHandler();

    setErrorValueCourtInfoForm(errorArrCourt);
    setErrorValueTrusteeInfoForm(errorArrTrustee);
    setErrorValueBankruptcyForm(errorArrBankrupt);

    if (
      !editBankruptcyFormDataInputs.isBankrupted ||
      (editBankruptcyFormDataInputs.isBankrupted &&
        errorArrCourt.length == 0 &&
        errorArrBankrupt.length == 0 &&
        errorArrTrustee.length == 0)
    ) {
      settingNull(
        courtInfoFormDataInputs['postalCode'],
        courtInfoFormDataInputs['phone'],
        trusteeInfoFormDataInputs['postalCode'],
        trusteeInfoFormDataInputs['phone']
      );
      /////COURT INFO
      courtInfoFormDataInputs['postalCode'] = replaceString(courtInfoFormDataInputs['postalCode']);
      courtInfoFormDataInputs['phone'] = replaceString(courtInfoFormDataInputs['phone']);

      /////TRUSTEE INFO
      trusteeInfoFormDataInputs['postalCode'] = replaceString(
        trusteeInfoFormDataInputs['postalCode']
      );
      trusteeInfoFormDataInputs['phone'] = replaceString(trusteeInfoFormDataInputs['phone']);

      //delete addBankruptcyInputs.isBankrupted;
      let finalObj = {};
      finalObj.bankruptcy = editBankruptcyFormDataInputs;
      finalObj.bankruptcy.courtInformation = courtInfoFormDataInputs;
      finalObj.bankruptcy.trusteeInformation = trusteeInfoFormDataInputs;
      handleDisabled();

      if (editBankruptcyFormDataInputs.isBankrupted) {
        props.EDITBANKRUPTCY(
          props.bankruptcyInformation?.[0]?.id,
          finalObj,
          props.handleDialog,
          props.showDialog,
          localStorage.getItem('customerId')
        );
      } else {
        props.DELETEBANKRUPTCY(
          props.bankruptcyInformation?.[0]?.id,
          props.handleDialog,
          props.showDialog,
          localStorage.getItem('customerId')
        );
      }
    }
  };

  const countInfoFormhandler = () => {
    let errorArrCourt = [];
    courtInfoForm.forEach((courtForm) => {
      errorArrCourt = formDataInputHandler(courtForm, courtInfoFormDataInputs, errorArrCourt);

      if (courtForm.accessor == 'website' && courtInfoFormDataInputs[courtForm.accessor]) {
        validateWebsiteFormField(
          courtInfoFormDataInputs[courtForm.accessor],
          courtForm,
          errorArrCourt
        );
      }

      ///REMOVE TRAILING SPACES
      if (courtInfoFormDataInputs[courtForm.accessor] && courtForm.type == 'input') {
        if (courtInfoFormDataInputs[courtForm.accessor].trim().length > 0) {
          courtInfoFormDataInputs[courtForm.accessor] =
            courtInfoFormDataInputs[courtForm.accessor].trim();
        } else {
          delete courtInfoFormDataInputs[courtForm.accessor];
        }
      }
    });

    return errorArrCourt;
  };

  const trusteeInfoFormhandler = () => {
    let errorArrTrustee = [];
    trusteeInfoForm.forEach((trusteeForm) => {
      errorArrTrustee = formDataInputHandler(
        trusteeForm,
        trusteeInfoFormDataInputs,
        errorArrTrustee
      );

      ///REMOVE TRAILING SPACES
      if (trusteeInfoFormDataInputs[trusteeForm.accessor] && trusteeForm.type == 'input') {
        if (trusteeInfoFormDataInputs[trusteeForm.accessor].trim().length > 0) {
          trusteeInfoFormDataInputs[trusteeForm.accessor] =
            trusteeInfoFormDataInputs[trusteeForm.accessor].trim();
        } else {
          delete trusteeInfoFormDataInputs[trusteeForm.accessor];
        }
      }
    });

    return errorArrTrustee;
  };

  const formDataInputHandler = (form, infoFormDataInputs, errorCourt) => {
    console.log('===>', form, infoFormDataInputs, errorCourt);
    if (form.accessor == 'postalCode' && infoFormDataInputs[form.accessor]) {
      zipCodeValidation(infoFormDataInputs[form.accessor], form, errorCourt);
    }
    if (form.accessor == 'phone' && infoFormDataInputs[form.accessor]) {
      phoneNumberValidation(
        infoFormDataInputs[form.accessor],
        form,
        errorCourt,
        infoFormDataInputs
      );
    }
    return errorCourt;
  };

  const bankruptInfoFormHandler = () => {
    let errorArrBankrupt = [];

    if (editBankruptcyFormDataInputs.verificationDate && editBankruptcyFormDataInputs.fileDate) {
      if (
        new Date(editBankruptcyFormDataInputs.verificationDate) <
        new Date(editBankruptcyFormDataInputs.fileDate)
      ) {
        errorArrBankrupt.push({
          fieldName: 'verificationDate',
          text: 'Verification Date cannot be earlier than File Date'
        });
      }
    }

    return errorArrBankrupt;
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
        warnings={warnings}
        clearWarnings={clearWarnings}
        formName="editBankruptcy">
        <EditBankruptcyForm
          EditBankruptcyFormData={editBankruptcyForm}
          CourtInfoFormData={courtInfoForm}
          TrusteeInfoFormData={trusteeInfoForm}
          editBankruptcyFormDataInputs={editBankruptcyFormDataInputs}
          courtInfoFormDataInputs={courtInfoFormDataInputs ?? {}}
          trusteeInfoFormDataInputs={trusteeInfoFormDataInputs ?? {}}
          handleEditBankruptcyForm={handleEditBankruptcyForm}
          handleCourtInfoForm={handleCourtInfoForm}
          handleTrusteeInfoForm={handleTrusteeInfoForm}
          statesData={props.statesData}
          errorValueBankruptcyForm={errorValueBankruptcyForm}
          errorValueCourtInfoForm={errorValueCourtInfoForm}
          errorValueTrusteeInfoForm={errorValueTrusteeInfoForm}
          // formRef={formRef}
          // handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
        />
      </PopUp>
    </>
  );
};

const EditBankruptcyForm = (props) => {
  if ('postalCode' in props.courtInfoFormDataInputs && props.courtInfoFormDataInputs?.postalCode) {
    const plainTextZipCode = props.courtInfoFormDataInputs?.postalCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.CourtInfoFormData, 'postalCode', plainTextZipCode);
  }

  if ('phone' in props.courtInfoFormDataInputs && props.courtInfoFormDataInputs.phone) {
    const plainTextPhone = props.courtInfoFormDataInputs.phone.replace(/[-_ )(]/g, '');
    conditionBasedPhonePatternWithExt(props.CourtInfoFormData, 'phone', plainTextPhone);
  }

  if (
    'postalCode' in props.trusteeInfoFormDataInputs &&
    props.trusteeInfoFormDataInputs.postalCode
  ) {
    const plainTextZipCode = props.trusteeInfoFormDataInputs.postalCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.TrusteeInfoFormData, 'postalCode', plainTextZipCode);
  }

  if ('phone' in props.trusteeInfoFormDataInputs && props.trusteeInfoFormDataInputs.phone) {
    const plainTextPhone = props.trusteeInfoFormDataInputs.phone.replace(/[-_ )(]/g, '');
    conditionBasedPhonePatternWithExt(props.TrusteeInfoFormData, 'phone', plainTextPhone);
  }

  if (props.statesData.length > 0) {
    if (!props.editBankruptcyFormDataInputs?.isBankrupted) {
      props.EditBankruptcyFormData.forEach((bankruptcyFormData) => {
        bankruptcyFormData.disabled = true;
        if (bankruptcyFormData.type == 'select') {
          bankruptcyFormData.options.optionsData[0].disabled = true;
        }
      });
      props.CourtInfoFormData.forEach((courtData) => {
        courtData.disabled = true;
        if (courtData.type == 'select') {
          courtData.options.optionsData[0].disabled = true;
        }
      });
      props.TrusteeInfoFormData.forEach((trusteeData) => {
        trusteeData.disabled = true;
        if (trusteeData.type == 'select') {
          trusteeData.options.optionsData[0].disabled = true;
        }
      });
    } else {
      props.EditBankruptcyFormData.forEach((bankruptcyFormData) => {
        delete bankruptcyFormData.disabled;
        if (bankruptcyFormData.type == 'select' && bankruptcyFormData.options?.optionsData?.[0]) {
          delete bankruptcyFormData.options.optionsData[0].disabled;
        }
      });
      props.CourtInfoFormData.forEach((courtData) => {
        delete courtData.disabled;
        if (courtData.type == 'select' && courtData.options?.optionsData?.[0]) {
          delete courtData.options.optionsData[0].disabled;
        }
      });
      props.TrusteeInfoFormData.forEach((trusteeData) => {
        delete trusteeData.disabled;
        if (trusteeData.type == 'select' && trusteeData.options?.optionsData?.[0]) {
          delete trusteeData.options.optionsData[0].disabled;
        }
      });
    }
  }

  return (
    <form
      id="editBankruptcy"
      onSubmit={(event) => props.handleFormSubmit(event)}
      // ref={props.formRef}
      // novalidate="novalidate"
    >
      <Grid container>
        {props.EditBankruptcyFormData &&
          props.EditBankruptcyFormData.map((data) => {
            if (data.accessor == 'verificationDate') {
              data.minDate = props.editBankruptcyFormDataInputs?.fileDate;
            }
            return (
              <Grid
                item
                xs={data.xs}
                key={data.id}
                sx={{ paddingBottom: '10px' }}
                style={data.style}>
                {data.label}
                {data.type == 'radio' && data.required && (
                  <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>
                )}
                <div style={{ width: data.width || '' }}>
                  {data.type == 'input' && (
                    <TextFieldComp
                      data={data}
                      error={props.errorValueBankruptcyForm}
                      errorText={props.errorValueBankruptcyForm}
                      captureInputs={props.handleEditBankruptcyForm}
                      editValues={props.editBankruptcyFormDataInputs}
                    />
                  )}
                  {data.type == 'select' && (
                    <SelectButton
                      data={data}
                      captureInputs={props.handleEditBankruptcyForm}
                      error={props.errorValueBankruptcyForm}
                      errorText={props.errorValueBankruptcyForm}
                      editValues={props.editBankruptcyFormDataInputs}
                    />
                  )}
                  {data.type == 'radio' && (
                    <RadioButtonGroup
                      data={data}
                      captureInputs={props.handleEditBankruptcyForm}
                      error={props.errorValueBankruptcyForm}
                      errorText={props.errorValueBankruptcyForm}
                      editValues={props.editBankruptcyFormDataInputs}
                    />
                  )}
                  {data.type == 'date' && (
                    <ResponsiveDatePicker
                      data={data}
                      maxDate={new Date()}
                      captureInputs={props.handleEditBankruptcyForm}
                      error={props.errorValueBankruptcyForm}
                      errorText={props.errorValueBankruptcyForm}
                      editValues={props.editBankruptcyFormDataInputs}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                      errorFieldBackgroundColor={
                        validateError(data, props.errorValueBankruptcyForm) ? true : false
                      }
                    />
                  )}
                </div>
              </Grid>
            );
          })}
      </Grid>
      {/* courtInfo */}
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
        {props.CourtInfoFormData?.map((data, index) => {
          return (
            <Grid
              item
              xs={data.xs}
              key={index}
              style={data.style ?? {}}
              sx={{ paddingBottom: '10px' }}>
              {renderLabel(data)}
              <div style={{ width: data.width || '' }}>
                {data.type == 'input' && (
                  <TextFieldComp
                    data={data}
                    captureInputs={props.handleCourtInfoForm}
                    error={props.errorValueCourtInfoForm}
                    errorText={props.errorValueCourtInfoForm}
                    editValues={props.courtInfoFormDataInputs}
                  />
                )}

                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleCourtInfoForm}
                    error={props.errorValueCourtInfoForm}
                    errorText={props.errorValueCourtInfoForm}
                    editValues={props.courtInfoFormDataInputs}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.handleCourtInfoForm}
                    error={props.errorValueCourtInfoForm}
                    errorText={props.errorValueCourtInfoForm}
                    editValues={props.courtInfoFormDataInputs}
                  />
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.handleCourtInfoForm}
                    error={props.errorValueCourtInfoForm}
                    errorText={props.errorValueCourtInfoForm}
                    editValues={props.courtInfoFormDataInputs}
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
        {props.TrusteeInfoFormData?.map((data, index) => {
          return (
            <Grid item xs={data.xs} key={index} sx={{ paddingBottom: '10px' }} style={data.style}>
              {renderLabel(data)}
              <div style={{ width: data.width || '' }}>
                {data.type == 'input' && (
                  <FormControl required={data.required ?? false} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.handleTrusteeInfoForm}
                      error={props.errorValueTrustee}
                      errorText={props.errorValueTrusteeInfoForm}
                      editValues={props.trusteeInfoFormDataInputs}
                    />
                  </FormControl>
                )}

                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleTrusteeInfoForm}
                    error={props.errorValueTrusteeInfoForm}
                    errorText={props.errorValueTrusteeInfoForm}
                    editValues={props.trusteeInfoFormDataInputs}
                  />
                )}
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.handleTrusteeInfoForm}
                    error={props.errorValueTrusteeInfoForm}
                    errorText={props.errorValueTrusteeInfoForm}
                    editValues={props.trusteeInfoFormDataInputs}
                  />
                )}

                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.handleTrusteeInfoForm}
                    error={props.errorValueTrusteeInfoForm}
                    errorText={props.errorValueTrusteeInfoForm}
                    editValues={props.trusteeInfoFormDataInputs}
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
    bankruptcyInformation: state.ConsumerQuickActionsReducer.bankruptcyInformation,
    statesData: state.StaticDataReducer.getstates,
    bankruptcyTypes: state.StaticDataReducer.bankruptcyTypes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    EDITBANKRUPTCY: async (
      bankruptcyInformationId,
      editBankruptcyInputs,
      handleDialog,
      showDialog,
      customerId
    ) => {
      await dispatch(
        EDITBANKRUPTCY(
          bankruptcyInformationId,
          editBankruptcyInputs,
          handleDialog,
          showDialog,
          customerId
        )
      );
    },
    DELETEBANKRUPTCY: async (bankruptcyInformationId, handleDialog, showDialog, customerId) => {
      await dispatch(
        DELETEBANKRUPTCY(bankruptcyInformationId, handleDialog, showDialog, customerId)
      );
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBankruptcy);
