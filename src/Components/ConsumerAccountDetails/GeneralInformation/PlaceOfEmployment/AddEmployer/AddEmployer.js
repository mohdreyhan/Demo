import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Controls } from '@oasis/react-core';
import PopUp from '../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  AddEmployerInfoData,
  dialogStructureHeader,
  dialogStructureFooter
} from './AddEmployerForm.Data';
import { ADDEMPLOYERINPUTS } from '../../../../../Actions/ConsumerDetails/Actions';
import { ADDEMPLOYER } from '../../../../../Actions/ConsumerDetails/ActionCreators';
import {
  handleOptionsData,
  validateHelperText,
  conditionBasedZipcodePattern,
  returnValueOrDefaultNested
} from '../../../../Common/commonfunctions.js';
import {
  validatePhoneNumber,
  validateZipCode,
  renderLabel,
  renderGridSize,
  renderGridStyles,
  handleFieldWidth
} from '../../../../Common/CommonFunctions/CommonFunctionForm.js';
import PatternFormatTextfield from '../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';
import { format, parseISO } from "date-fns"

//////// FUNCTION TO VALIDATE REQUIRED FIELDS

const validateRequiredFields = (addEmployerInputs, data, internalArr) => {
  if (data.required) {
    if (data.type !== 'select' && data.type !== 'radio') {
      validateRequiredFieldsIf(addEmployerInputs, data, internalArr);
    } else {
      if (
        data.type == 'select' &&
        (addEmployerInputs[data.accessor] == null || addEmployerInputs[data.accessor] == 0)
      ) {
        internalArr.push({
          fieldName: data.name,
          text: `Please enter ${data.label}`
        });
      }
    }
  }
};

const validateRequiredFieldsIf = (addEmployerInputs, data, internalArr) => {
  if (!addEmployerInputs[data.accessor]) {
    internalArr.push({
      fieldName: data.name,
      text: `Please enter ${data.label}`
    });
  }
  if (typeof addEmployerInputs[data.accessor] == 'string') {
    if (addEmployerInputs[data.accessor]?.trim().length == 0) {
      internalArr.push({
        fieldName: data.name,
        text: `Please enter ${data.label}`
      });
    }
  }
};

function AddEmployer(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);
  const [errorValue, setError] = React.useState([]);
  const [addEmployerInputs, setInputs] = React.useState({});
  const [callEmploymentType, setCallEmploymentType] = React.useState(false);

  ///////////////////// SAVE USER INPUTS IN STATE /////////////////////////////////

  React.useEffect(() => {
    setInputs(props.addEmployerInputs);
  }, [props.addEmployerInputs]);

  ///////////////////// SAVE USER INPUTS IN STATE /////////////////////////////////

  React.useEffect(() => {
    if (props.statesData?.length > 0) {
      const arr = handleOptionsData(AddEmployerInfoData, 'stateCode', props.statesData);
      setFormData(arr);
      setCallEmploymentType(true);
    }
  }, [props.statesData]);

  //////////////////////// SAVE EMPLOYEMENT TYPES IN STATE //////////////////////
  React.useEffect(() => {
    if (callEmploymentType) {
      const arr = handleOptionsData(formData, 'employmentTypeId', props.employmentTypes);
      setFormData(arr);
    }
  }, [callEmploymentType]);

  React.useEffect(() => {
    if (addEmployerInputs.stateCode) {
      props.statesData.forEach((state) => {
        if (addEmployerInputs.stateCode == state.id) {
          addEmployerInputs.countryCode = state?.country?.name;
          return addEmployerInputs;
        }
      });
      const temp = { ...addEmployerInputs };
      setInputs(temp);
    }
  }, [addEmployerInputs.stateCode]);

  ///DELETE COUNTRY WHEN SATE IS DE-SELECTED

  React.useEffect(() => {
    if (addEmployerInputs.hasOwnProperty("stateCode") && addEmployerInputs?.stateCode === 0) {
      setInputs((input) => {
        const copy = { ...input };
        delete copy.countryCode;
        delete copy.stateCode
        return copy;
      });
    }
  }, [addEmployerInputs]);

  //////////////////////// SAVE EMPLOYEMENT TYPES IN STATE //////////////////////

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let internalArr = [];

    formData.forEach((data) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(addEmployerInputs, data, internalArr);
      ////VALIDATE PHONE NUMBER
      validatePhoneNumber(addEmployerInputs[data.accessor], data, internalArr);
      ////VALIDATE ZIP CODE
      validateZipCode(addEmployerInputs[data.accessor], data, internalArr);
    });
    setError(internalArr);
    if (internalArr.length == 0) {
      const addServiceData = Object.assign({}, addEmployerInputs);
      props.countriesData.forEach((country) => {
        if (addEmployerInputs.countryCode == country.name) {
          addServiceData.countryCode = country.id;
        }
      });
      addServiceData['countryId'] = addServiceData['countryCode'];
      addServiceData['stateId'] = addServiceData['stateCode'];
      addServiceData['phoneNumberOne'] =
        addServiceData['phoneNumberOne'] &&
        addServiceData['phoneNumberOne'].replace(/[-_ )(]/g, '');
      addServiceData['phoneNumberTwo'] =
        addServiceData['phoneNumberTwo'] &&
        addServiceData['phoneNumberTwo'].replace(/[-_ )(]/g, '');
      addServiceData['zipCode'] =
        addServiceData['zipCode'] && addServiceData['zipCode'].replace(/[-_ )(]/g, '');
      props.ADDEMPLOYER(
        formRef,
        addServiceData,
        localStorage.getItem('customerId'),
        props.handleDialog,
        props.showDialog
      );
    }
  };

  React.useEffect(() => {
    setError([]);
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
        formName="addEmployerForm">
        <AddEmployerInfoForm
          AddEmployerInfoData={formData}
          ADDEMPLOYERINPUTS={props.ADDEMPLOYERINPUTS}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          addEmployerInputs={addEmployerInputs}
          errorValue={errorValue}
        />
      </PopUp>
    </>
  );
}

const getFormFields = (data, props, formType) => {
  if (data.type == 'input') {
    return (
      <Controls.TextInput
        key={data.id}
        name={data.name}
        required={data.required}
        disabled={data.disabled}
        onChange={props.ADDEMPLOYERINPUTS}
        placeholder={data.placeholder}
        error={validateHelperText(data, props.errorValue)}
        value={returnValueOrDefaultNested([data.sendUserInputs && props.addEmployerInputs[data.accessor]],[props.addEmployerInputs[data.accessor]], null)}
      />
    );
  }

  if (data.type == 'patternInput') {
    return (
      <PatternFormatTextfield
        data={data}
        captureInputs={props.ADDEMPLOYERINPUTS}
        error={props.errorValue}
      />
    );
  }

  if (data.type == 'select') {
    return (
      <Controls.SelectField
        key={data.id}
        name={data.name}
        value={props.addEmployerInputs[data.accessor]}
        items={data.options?.optionsData}
        selectId={data.optionsValue}
        selectValue={data.optionsLabel}
        onChange={props.ADDEMPLOYERINPUTS}
        error={validateHelperText(data, props.errorValue)}
        defaultTitle={data.defaultTitle}
      />
    );
  }

  if (data.type == 'radio') {
    return (
      <Controls.RadioField
        name={data.name}
        items={data.options?.optionsData}
        onChange={props.ADDEMPLOYERINPUTS}
        value={props.addEmployerInputs[data.accessor]}
      />
    );
  }

  if ((data.type == 'date' && data.current) || (data.type == 'date' && formType == 'historical')) {
    let value =  props.addEmployerInputs[data.accessor] ? format(parseISO(props.addEmployerInputs[data.accessor]), 'yyyy-MM-dd') : undefined
    // let minDate= format(parseISO(data.minDate), 'yyyy-MM-dd')
    // let maxDate= format(parseISO(data.maxDate), 'yyyy-MM-dd')
    return (
      <Grid item xs={12}>
        <Controls.DatePickerFns
          name={data.name}
          value={parseISO(value)}
          onChange={props.ADDEMPLOYERINPUTS}
          openTo={data.openTo}
          disabled={data.disabled}
          minDate={data.minDate}
          maxDate={data.maxDate}
          views={data.views}
          allowSameDateSelection={data.allowSameDateSelection}
        />
      </Grid>
    );
  }

  if (data.type == 'label' && formType == 'historical') {
    return (
      <Grid item xs={data.xs}>
        {data.title}
      </Grid>
    );
  }
  return <div></div>;
};

const AddEmployerInfoForm = (props) => {

  React.useMemo(() => {
    props.AddEmployerInfoData.forEach((data) => {
      if (typeof data.default == 'boolean') {
        props.addEmployerInputs[data.accessor] = data.default;
      }
    });
  }, []);

  let formType;

  if (props.addEmployerInputs?.active) {
    formType = 'current';
  } else {
    formType = 'historical';
  }

  /////// TO HANDLE START DATE WIDTH IN CURRENT
  props.AddEmployerInfoData.filter((data) => data.accessor == 'startDate').forEach(
    (addEmployerOptionsData) => {
      addEmployerOptionsData.current = true;
    }
  );

  /////// TO HANDLE END DATE BASED IN START DATE
  if (props.addEmployerInputs?.startDate) {
    props.AddEmployerInfoData.filter((data) => data.accessor == 'endDate').map(
      (addEmployerOptionsData) => {
        let minDate = parseISO(format(parseISO(props.addEmployerInputs?.startDate), 'yyyy-MM-dd'))
        addEmployerOptionsData.minDate = minDate;
        addEmployerOptionsData.disabled = false;
      }
    );
  }

  if ('zipCode' in props.addEmployerInputs) {
    const plainTextZipCode = props.addEmployerInputs.zipCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.AddEmployerInfoData, 'zipCode', plainTextZipCode);
  }

  return (
    <form
      id="addEmployerForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.AddEmployerInfoData.map((data, index) => {
          return (
            <Grid
              item
              xs={renderGridSize(data, formType)}
              key={`${data.id}_${data.accessor}`}
              style={renderGridStyles(data)}>
              {renderLabel(data, formType)}
              <div style={handleFieldWidth(data)}>{getFormFields(data, props, formType)}</div>
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    addEmployerInputs: state.ConsumerDetailsReducer.addEmployerInputs,
    consumerEmployers: state.ConsumerDetailsReducer.consumerEmployers,
    countriesData: state.StaticDataReducer.countriesData,
    statesData: state.StaticDataReducer.getstates,
    employmentTypes: state.ConsumerDetailsReducer.employmentTypes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDEMPLOYERINPUTS: async (event) => {
      let name = event.target.name;
      let value = event.target.value;
      if (typeof value == 'object') {
        const offset = new Date(value).getTimezoneOffset() * 60000;
        const convertedValue = new Date(new Date(value) - offset).toISOString();
        value = convertedValue;
      }
      if (value == 'true') {
        value = true;
      } else if (value == 'false') {
        value = false;
      }
      await dispatch(ADDEMPLOYERINPUTS(name, value));
    },
    ADDEMPLOYER: async (form, addEmployerInputs, customerId, handleDialog, showDialog) => {
      await dispatch(ADDEMPLOYER(form, addEmployerInputs, customerId, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEmployer);
