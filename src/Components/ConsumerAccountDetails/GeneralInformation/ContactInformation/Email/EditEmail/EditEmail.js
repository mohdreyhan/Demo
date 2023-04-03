import * as React from 'react';
import { Grid, FormControl } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditEmailFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditEmail.Data.js';
import ResponsiveDateTimePicker from '../../../../../Common/AEComponents/DateTimePicker/ResponsiveDateTimePicker';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import { EDITEMAIL } from '../../../../../../Actions/ConsumerDetails/ContactInformation/ActionCreators.js';
import {
  validateEmail,
  validateError,
  convertTimestamptoUSA,
  validateHelperText,
} from '../../../../../Common/commonfunctions';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';

function EditEmail(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);
  const [tableRowData, setTableRowData] = React.useState({});
  const [errorValue, setError] = React.useState([]);
  const [apiResponse, setApiResponse] = React.useState({});
  const [warnings, setWarnings] = React.useState([]);

  ///////////////////// GET ACTUAL API RESPONSE /////////////////////////////////

  React.useEffect(() => {
    const originalData = props.emailData.filter((value) => value.id == props.tableRowData.id);
    setTableRowData(originalData[0]);
    setApiResponse(originalData[0]);
  }, [props.tableRowData]);

  React.useEffect(() => {
    const arr = [];
    const refactoredEmaiTypes = props.emailTypes.map((type) => {
      return {
        ...type,
        name: type.name == 'HomeEmail' ? 'Personal' : type.name.replace('Email', '')
      };
    });

    EditEmailFormData.filter((data) => data.accessor == 'isDefault').forEach(
      (editEmailOptionsData) => {
        delete editEmailOptionsData.changeValue;
        delete editEmailOptionsData.toolTipMsg;
        delete editEmailOptionsData.disabled;
        delete editEmailOptionsData.options.optionsData[0].disabled;
        delete editEmailOptionsData.options.optionsData[0].name;
        if (editEmailOptionsData?.options?.optionsData.length > 1) {
          delete editEmailOptionsData.options.optionsData[1].disabled;
          delete editEmailOptionsData.options.optionsData[1].name;
        }
      }
    );

    const refactoredConsumerDemographicSource = props.consumerDemographicSource.map((data) => {
      return {
        name: data.source,
        id: data.id,
        isDefault: data.isDefault
      };
    });

    EditEmailFormData?.forEach((formD) => {
      if (formD.accessor == 'emailType') {
        // arr.push({...formData, options : {...formData.options, optionsData : props.emailTypes}}) ////Alternate Way //NOSONAR
        arr.push({ ...formD, options: { optionsData: refactoredEmaiTypes } });
      } else if (formD.accessor == 'emailConsentSourceRefId') {
        // arr.push({...formData, options : {...formData.options, optionsData : props.emailTypes}}) ////Alternate Way //NOSONAR
        arr.push({ ...formD, options: { optionsData: refactoredConsumerDemographicSource } });
      } else {
        arr.push({ ...formD });
      }
    });
    setFormData(arr);
  }, [props.emailTypes, props.consumerDemographicSource]);

  const handleChange = (event) => {
    const obj = {
      ...tableRowData,
      [event.target.name]: event.target.value
    };
    setTableRowData(obj);
  };

  ///Remove Trailing spaces

  //NOSONAR
  // const trimUserInputs = (tableRowDat) => {
  //   const arr = EditEmailFormData.map((formValue) => {
  //     if (typeof tableRowDat[formValue.accessor] == "string") {
  //       tableRowDat[formValue.accessor] = tableRowDat[formValue.accessor].trim();
  //     }
  //     return tableRowDat
  //   });
  //   setTableRowData(arr)
  // };

  //////// FUNCTION TO VALIDATE REQUIRED FIELDS

  const recordErrors = (data, internalArr) => {
    internalArr.push({
      fieldName: data.name,
      text: `Please enter ${data.label}`
    });
  };

  const validateRequiredFields = (data, internalArr) => {
    if (data.required) {
      if (data.type !== 'select' && data.type !== 'radio') {
        if (!tableRowData[data.accessor]) {
          recordErrors(data, internalArr);
        }
        return true;
      }

      if (
        data.type !== 'select' &&
        data.type !== 'radio' &&
        tableRowData[data.accessor]?.trim().length == 0
      ) {
        recordErrors(data, internalArr);
      }
      if (data.type == 'select' && tableRowData[data.accessor] == null) {
        recordErrors(data, internalArr);
      }
    }
  };
  /////// VALIDATE EXISTING PRIMARY RECORDS

  const filterData = (internalArr) => {
    const filteredRecords = props.emailData
      // .filter((emails) => emails.emailType == tableRowData.emailType)
      .filter((data) => data.isDefault);
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
      if (apiResponse.isDefault !== tableRowData.isDefault) {
        filterData(internalArr);
      }
    }
    setWarnings(internalArr);
  }, [tableRowData]);

  /////// CLEAR WARNINGS

  const clearWarnings = () => {
    setWarnings([]);
  };

  const validateEmailAddress = (data, internalArr) => {
    if (data.operation?.includes('formatEmailAddress') && tableRowData[data.accessor]?.length > 0) {
      const response = validateEmail(data.format, tableRowData[data.accessor]);
      if (response && !response.result) {
        internalArr.push({
          fieldName: data.name,
          text: response.message
        });
      }
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const internalArr = [];
    formData.forEach((formValue) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(formValue, internalArr);
      ////VALIDATE PHONE NUMBER
      if ('emailAddress' in tableRowData) {
        validateEmailAddress(formValue, internalArr);
      }
    });
    setError(internalArr);

    if (tableRowData.emailConsentDate) {
      tableRowData.emailConsentDate = new Date().toISOString();
    }
    if (!tableRowData.emailConsentDate) {
      tableRowData.emailConsentDate = null;
    }

    if (tableRowData.esignConsent) {
      tableRowData.esignConsentDate = new Date().toISOString();
    }
    if (!tableRowData.esignConsent) {
      tableRowData.esignConsentDate = null;
    }

    if (internalArr.length == 0) {
      const addServiceData = Object.assign({}, tableRowData);
      addServiceData['emailConsentSource'] = addServiceData['emailConsentSourceRefId'];
      delete addServiceData.emailConsentSourceRefId;
      props.EDITEMAIL(
        formRef,
        addServiceData,
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
        formName="editEmailForm">
        <EditEmailForm
          EditEmailFormData={formData}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          handleChange={handleChange}
          tableRowData={tableRowData}
          errorValue={errorValue}
          apiResponse={apiResponse}
        />
      </PopUp>
    </>
  );
}

//Disable Primary radio button when agent is trying to anothe primary (when already a primary record exist)

const restrictToAddAnotherPrimary = (props) => {
  if (
    props.apiResponse.isDefault &&
    props.apiResponse.active &&
    props.tableRowData.isDefault &&
    props.tableRowData.active
  ) {
    props.EditEmailFormData.filter((data) => data.accessor == 'isDefault').forEach(
      (editEmailOptionsData) => {
        editEmailOptionsData.toolTipMsg =
          'To Change the primary contact information, Please change another contact information as primary.';
        editEmailOptionsData.disabled = true;
        editEmailOptionsData.options.optionsData[1].disabled = true;
        editEmailOptionsData.options.optionsData[1].name = editEmailOptionsData.name;
      }
    );
    props.EditEmailFormData.filter((data) => data.accessor == 'active').forEach(
      (editEmailOptionsData) => {
        editEmailOptionsData.disabled = true;
        editEmailOptionsData.options.optionsData[1].disabled = true;
        editEmailOptionsData.options.optionsData[1].name = editEmailOptionsData.name;
      }
    );
  }
}

//Disable Primary radio button when active is selected as false

const DisablePrimaryWhenActiveIsFalse = (props) => {
  if (
    (props.tableRowData.active === false && !props.apiResponse.isDefault) ||
    (props.tableRowData.active === false && props.apiResponse.isDefault)
  ) {
    props.EditEmailFormData.filter((data) => data.accessor == 'isDefault').forEach(
      (editEmailOptionsData) => {
        editEmailOptionsData.changeValue = true;
        editEmailOptionsData.toolTipMsg = "You can't change inactive contact to primary";
        editEmailOptionsData.disabled = true;
        editEmailOptionsData.options.optionsData[0].disabled = true;
        editEmailOptionsData.options.optionsData[0].name = editEmailOptionsData.name;
      }
    );
  } else if (props.apiResponse.isDefault === false) {
    props.EditEmailFormData.filter((data) => data.accessor == 'isDefault').forEach(
      (editEmailOptionsData) => {
        delete editEmailOptionsData.changeValue;
        delete editEmailOptionsData.toolTipMsg;
        delete editEmailOptionsData.disabled;
        delete editEmailOptionsData.options.optionsData[0].disabled;
        delete editEmailOptionsData.options.optionsData[0].name;
      }
    );
  }
}

const handleEmailConsentDate = (props) => {
  if (props.apiResponse.emailConsentDate === null || props.apiResponse.emailConsentDate === '') {
    if (props.tableRowData.emailConsent) {
      props.tableRowData.emailConsentDate = convertTimestamptoUSA(new Date());
    } else {
      props.tableRowData.emailConsentDate = '';
    }
  }

  if (props.apiResponse.emailConsent === true && props.tableRowData.emailConsent === false) {
    props.tableRowData.emailConsentDate = '';
  } else if (
    props.tableRowData.emailConsent === true &&
    props.apiResponse.emailConsentDate !== props.tableRowData.emailConsentDate
  ) {
    props.tableRowData.emailConsentDate = convertTimestamptoUSA(new Date());
  }
}

const handleEsignConsentDate = (props) => {
  if (props.apiResponse.esignConsentDate === null || props.apiResponse.esignConsentDate === '') {
    if (props.tableRowData.esignConsent) {
      props.tableRowData.esignConsentDate = convertTimestamptoUSA(new Date());
    } else {
      props.tableRowData.esignConsentDate = '';
    }
  }

  if (props.apiResponse.esignConsent === true && props.tableRowData.esignConsent === false) {
    props.tableRowData.esignConsentDate = '';
  } else if (
    props.tableRowData.esignConsent === true &&
    props.apiResponse.esignConsentDate !== props.tableRowData.esignConsentDate
  ) {
    props.tableRowData.esignConsentDate = convertTimestamptoUSA(new Date());
  }
}

const EditEmailForm = (props) => {

  restrictToAddAnotherPrimary(props);

  DisablePrimaryWhenActiveIsFalse(props)

  //Input date
  //Nocase ///emailConsent
  handleEmailConsentDate(props)

  //Nocase ///esignconsent
  handleEsignConsentDate(props)

  const ConvertTime = (data, value, accessor) => {
    let Obj = {};
    Obj = { ...data, [accessor]: convertTimestamptoUSA(value) };
    return Obj;
  };

  return (
    <form
      id="editEmailForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.EditEmailFormData.map((data, index) => {
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
              <div style={{ width: data.width }}>
                {data.type == 'input' && (
                  <FormControl required={!!data.required} fullWidth>
                    <TextFieldComp
                      data={data}
                      captureInputs={props.handleChange}
                      error={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
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
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    validateError={validateError}
                    validateHelperText={validateHelperText}
                    editValues={props.tableRowData}
                  />
                )}
                {data.type == 'date/time' && (
                  <ResponsiveDateTimePicker
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
    emailTypes: state.ContactInfoReducer.emailTypes,
    emailData: state.ContactInfoReducer.emailData,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITEMAIL: async (form, editEmailInputs, customerId, handleDialog, showDialog) => {
      await dispatch(EDITEMAIL(form, editEmailInputs, customerId, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEmail);
