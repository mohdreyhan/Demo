import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import SelectButton from '../../../../../Common/AEComponents/DropDown/SelectButton.js';
import {
  dialogDataHeader,
  dialogDataFooter,
  AddAddressFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddAddress.Data.js';
import ResponsiveDateTimePicker from '../../../../../Common/AEComponents/DateTimePicker/ResponsiveDateTimePicker';
import RadioButtonGroup from '../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import { ADDADDRESSINPUTS } from '../../../../../../Actions/ConsumerDetails/ContactInformation/Actions';
import { ADDADDRESS } from '../../../../../../Actions/ConsumerDetails/ContactInformation/ActionCreators.js';
import AutoCompleteComp from '../../../../../Common/AEComponents/AutoComplete/AutoCompleteComp.js';
import TextFieldComp from '../../../../../Common/AEComponents/TextField/TextFieldComp';
import {
  validateError,
  validateHelperText,
  replaceTypes,
  handleOptionsData,
  validatePostalCode,
  zipCodeFormat,
  conditionBasedZipcodePattern
} from '../../../../../Common/commonfunctions.js';
import PatternFormatTextfield from '../../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';

function AddAddress(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState(AddAddressFormData);
  const [errorValue, setError] = React.useState([]);
  const [addAddressInputs, setInputs] = React.useState({});
  const [warnings, setWarnings] = React.useState([]);
  const [callStates, setCallStates] = React.useState(false);

  ///////////////////// REFACTOR ADDRESSTYPES,CONSUMER DEMOGRAPHIC SOURCE AND SAVE IN AddAddressFormData /////////////////////////////////

  React.useEffect(() => {
    const refactoredAddressTypes = replaceTypes(props.addressTypes, 'Address');
    const refactoredConsumerDemographicSource = props.consumerDemographicSource.map((data) => {
      return {
        name: data.source,
        id: data.id,
        isDefault: data.isDefault
      };
    });
    const arr = handleOptionsData(AddAddressFormData, 'typeId', refactoredAddressTypes);
    const newArr = handleOptionsData(arr, 'source', refactoredConsumerDemographicSource);
    setFormData(newArr);
    setCallStates(true);
  }, [props.showDialog]);

  ///////////////////// SAVE USER INPUTS IN STATE /////////////////////////////////

  React.useEffect(() => {
    setInputs(props.addAddressInputs);
  }, [props.addAddressInputs]);

  ///////////////////// SAVE STATES DATA IN STATE /////////////////////////////////

  React.useEffect(() => {
    if (props.statesData?.length > 0 && callStates) {
      const arr = handleOptionsData(formData, 'stateCode', props.statesData);
      setFormData(arr);
    }
  }, [props.statesData, callStates]);

  React.useEffect(() => {
    if (addAddressInputs.stateCode) {
      let countryname;
      props.statesData.forEach((st) => {
        if (addAddressInputs.stateCode == st.id) {
          countryname = st?.country?.name;
        }
        return countryname;
      });
      addAddressInputs.countryCode = addAddressInputs.stateCode == 'Select' ? '' : countryname;
    }
  }, [addAddressInputs.stateCode]);

  /////// VALIDATE EXISTING PRIMARY RECORDS
  React.useEffect(() => {
    let internalArr = [];
    if ('isDefault' in addAddressInputs && addAddressInputs.isDefault) {
      const filteredRecords = props.addressData.filter((data) => data.isDefault);
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
  }, [addAddressInputs]);

  /////// CLEAR WARNINGS

  const clearWarnings = () => {
    setWarnings([]);
  };

  ///////////////////// VALIDATE REQUIRED FIELDS  /////////////////////////////////

  const validateRequiredFields = (data, internalArr) => {
    if (data.required) {
      if (data.type !== 'select' && data.type !== 'radio' && !addAddressInputs[data.accessor]) {
        if (!addAddressInputs[data.accessor]) {
          internalArr.push({
            fieldName: data.name,
            text: `Please enter ${data.label}`
          });
        }
      } else {
        validateRequiredFieldsElse(data, internalArr);
      }
    }
  };

  const validateRequiredFieldsElse = (data, internalArr) => {
    if (data.type !== 'select' && data.type !== 'radio') {
      if (addAddressInputs[data.accessor]?.trim().length == 0) {
        internalArr.push({
          fieldName: data.name,
          text: `Please enter ${data.label}`
        });
      }
    }
    if (
      data.type == 'select' &&
      (addAddressInputs[data.accessor] == 'Select' || !addAddressInputs[data.accessor])
    ) {
      internalArr.push({
        fieldName: data.name,
        text: `Please enter ${data.label}`
      });
    }
  };

  const validateZipCode = (addAddressInputss, data, internalArr) => {
    if (data.accessor == 'zipCode') {
      const response = validatePostalCode(addAddressInputss[data.accessor]);
      if (response && response != '') {
        internalArr.push({
          fieldName: data.name,
          text: response
        });
      }
    }
  };

  ///////////////////// SUBMIT FORM /////////////////////////////////

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef;
    let internalArr = [];
    formData.forEach((data) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(data, internalArr);
      /////VALIDATE ZIP CODE FORMAT
      validateZipCode(addAddressInputs, data, internalArr);
    });
    setError(internalArr);
    if (internalArr.length == 0) {
      const addServiceData = Object.assign({}, addAddressInputs);
      props.countriesData.forEach((country) => {
        if (addAddressInputs.countryCode == country.name) {
          addServiceData.countryCode = country.id;
        }
      });
      addServiceData['zipCode'] =
        addServiceData['zipCode'] && addServiceData['zipCode'].replace(/[-_ )(]/g, '');
      props.ADDADDRESS(
        form,
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
        formName="addAddressForm">
        <AddAddressForm
          AddAddressFormData={formData}
          ADDADDRESSINPUTS={props.ADDADDRESSINPUTS}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          errorValue={errorValue}
          addressData={props.addressData}
          addAddressInputs={addAddressInputs}
        />
      </PopUp>
    </>
  );
}

const AddAddressForm = (props) => {
  let filteredData;
  if (props.addressData) {
    filteredData = props.addressData.filter((data) => data.isDefault);
    if (filteredData.length <= 0) {
      props.AddAddressFormData?.filter(
        (data) => data.accessor == 'isDefault' || data.accessor == 'active'
      ).forEach((addAddressOptionsData) => {
        addAddressOptionsData.options.optionsData[1].name = addAddressOptionsData.name;
      });
    }
  }

  if ('active' in props.addAddressInputs && !props.addAddressInputs.active) {
    props.AddAddressFormData?.filter((data) => data.accessor == 'isDefault').forEach(
      (addAddressOptionsData) => {
        addAddressOptionsData.changeValue = true;
        addAddressOptionsData.toolTipMsg = "You can't change inactive contact to primary";
        addAddressOptionsData.disabled = true;
        addAddressOptionsData.options.optionsData[0].disabled = true;
        addAddressOptionsData.options.optionsData[0].name = addAddressOptionsData.name;
      }
    );
  } else {
    props.AddAddressFormData?.filter((data) => data.accessor == 'isDefault').forEach(
      (addAddressOptionsData) => {
        if (
          addAddressOptionsData.options.optionsData[0].disabled &&
          props.addAddressInputs.active
        ) {
          delete addAddressOptionsData.changeValue;
          delete addAddressOptionsData.toolTipMsg;
          delete addAddressOptionsData.disabled;
          delete addAddressOptionsData.options.optionsData[0].disabled;
          delete addAddressOptionsData.options.optionsData[0].name;
        }
      }
    );
  }

  if ('zipCode' in props.addAddressInputs) {
    const plainTextZipCode = props.addAddressInputs.zipCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.AddAddressFormData, 'zipCode', plainTextZipCode);
  }

  return (
    <form
      id="addAddressForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.AddAddressFormData &&
          props.AddAddressFormData.map((data, index) => {
            return (
              <Grid item xs={data.xs} key={`${data.id}_${index+1}`} sx={{ paddingBottom: '10px' }}>
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
                <div>
                  {data.type == 'input' && (
                      <TextFieldComp
                        data={data}
                        captureInputs={props.ADDADDRESSINPUTS}
                        userInputs={data.sendUserInputs ? props.addAddressInputs : null}
                        error={props.errorValue}
                        errorText={props.errorValue}
                        validateError={validateError}
                        validateHelperText={validateHelperText}
                        zipCodeFormat={zipCodeFormat}
                      />
                  )}
                  {data.type == 'patternInput' && (
                    <PatternFormatTextfield
                      data={data}
                      captureInputs={props.ADDADDRESSINPUTS}
                      error={props.errorValue}
                      errorText={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                    />
                  )}
                  {data.type == 'autoComplete' && (
                    <AutoCompleteComp
                      data={data}
                      captureInputs={props.ADDADDRESSINPUTS}
                      error={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                    />
                  )}
                  {data.type == 'select' && (
                    <SelectButton
                      data={data}
                      captureInputs={props.ADDADDRESSINPUTS}
                      error={props.errorValue}
                      errorText={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                      component={'address'}
                      accessor={data.accessor}
                    />
                  )}
                  {data.type == 'radio' && (
                    <RadioButtonGroup
                      data={data}
                      captureInputs={props.ADDADDRESSINPUTS}
                      error={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                    />
                  )}
                  {data.type == 'date/time' && (
                    <ResponsiveDateTimePicker data={data} captureInputs={props.ADDADDRESSINPUTS} />
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
    addAddressInputs: state.ContactInfoReducer.addAddressInputs,
    addressTypes: state.ContactInfoReducer.addressTypes,
    countriesData: state.StaticDataReducer.countriesData,
    statesData: state.StaticDataReducer.getstates,
    addressData: state.ContactInfoReducer.addressData,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ADDADDRESSINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDADDRESSINPUTS(name, value));
    },
    ADDADDRESS: async (form, addAddressInputs, customerId, handleDialog, showDialog) => {
      await dispatch(ADDADDRESS(form, addAddressInputs, customerId, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
