import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Controls } from '@oasis/react-core';
import PopUp from '../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditEmployerInfoData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditEmployer.Data.js';
import { EDITEMPLOYER } from '../../../../../Actions/ConsumerDetails/ActionCreators';
import {
  validateHelperText,
  handleOptionsData,
  conditionBasedZipcodePattern,
} from '../../../../Common/commonfunctions.js';
import {
  validatePhoneNumber,
  validateZipCode,
  renderLabel,
  renderGridSize,
  handleFieldWidth,
  renderGridStyles
} from '../../../../Common/CommonFunctions/CommonFunctionForm.js';
import PatternFormatTextfield from '../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';
import { format, parseISO } from "date-fns"

function EditEmployer(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);
  const [cardData, setCardData] = React.useState({});
  const [errorValue, setError] = React.useState([]);
  const [callEmploymentType, setCallEmploymentType] = React.useState(false);

  ///////////////////// GET ACTUAL API RESPONSE /////////////////////////////////

  React.useEffect(() => {
    getApiResponseFromStore();
  }, [props.tableRowData, props.showDialog]);

  const getApiResponseFromStore = () => {
    const originalData = props.consumerEmployers.filter(
      (value) => value.id == props.tableRowData.id
    );
    setCardData(originalData[0]);
  };

  ///////////////////// SAVE STATES DATA IN STATE /////////////////////////////////

  React.useEffect(() => {
    if (props.statesData?.length > 0) {
      const arr = handleOptionsData(EditEmployerInfoData, 'stateCode', props.statesData);
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

  // Populating country textfeild with already selected states value

  React.useEffect(() => {
    if (cardData?.stateCode) {
      let countryname;
      props.statesData?.forEach((st) => {
        if (cardData.stateCode == st.id) {
          countryname = st?.country?.name;
        }
        return countryname;
      });
      setCardData((scardData) => {
        const copy = { ...scardData };
        copy.countryCode = countryname;
        return copy;
      });
    }
  }, [cardData.stateCode, props.statesData]);

  ///DELETE COUNTRY WHEN SATE IS DE-SELECTED

  React.useEffect(() => {
    if (cardData?.stateCode && cardData?.stateCode === 0) {
      setCardData((scardData) => {
        const copy = { ...scardData };
        delete copy.stateCode;
        return copy;
      });
    }
  }, [cardData.stateCode]);

  ///////////////////// FORM SUBMIT  /////////////////////////////////

  //////// FUNCTION TO VALIDATE REQUIRED FIELDS

  const validateRequiredFields = (cardDatas, data, internalArr) => {
    if (data.required) {
      if (data.type !== 'select' && data.type !== 'radio') {
        validateRequiredFieldsIf(cardDatas, data, internalArr);
      } else {
        if (
          data.type == 'select' &&
          (cardDatas[data.accessor] == null || cardDatas[data.accessor] == 0)
        ) {
          internalArr.push({
            fieldName: data.name,
            text: `Please enter ${data.label}`
          });
        }
      }
    }
  };

  const validateRequiredFieldsIf = (cardDatas, data, internalArr) => {
    if (!cardDatas[data.accessor]) {
      internalArr.push({
        fieldName: data.name,
        text: `Please enter ${data.label}`
      });
    }
    if (typeof cardDatas[data.accessor] == 'string') {
      if (cardDatas[data.accessor]?.trim().length == 0) {
        internalArr.push({
          fieldName: data.name,
          text: `Please enter ${data.label}`
        });
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const internalArr = [];

    formData?.forEach((data) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(cardData, data, internalArr);
      ////VALIDATE PHONE NUMBER
      validatePhoneNumber(cardData[data.accessor], data, internalArr);
      ////VALIDATE ZIP CODE
      validateZipCode(cardData[data.accessor], data, internalArr);
    });
    setError(internalArr);
    if (internalArr.length == 0) {
      const editServiceData = Object.assign({}, cardData);
      props.countriesData.forEach((country) => {
        if (cardData.countryCode == country.name) {
          editServiceData.countryCode = country.id;
        }
      });
      editServiceData['countryId'] = editServiceData['countryCode'];
      editServiceData['stateId'] = editServiceData['stateCode'];
      editServiceData['phoneNumberOne'] =
        editServiceData['phoneNumberOne'] &&
        editServiceData['phoneNumberOne'].replace(/[-_ )(]/g, '');
      editServiceData['phoneNumberTwo'] =
        editServiceData['phoneNumberTwo'] &&
        editServiceData['phoneNumberTwo'].replace(/[-_ )(]/g, '');
      editServiceData['zipCode'] =
        editServiceData['zipCode'] && editServiceData['zipCode'].replace(/[-_ )(]/g, '');
      props.EDITEMPLOYER(
        formRef,
        editServiceData,
        localStorage.getItem('customerId'),
        props.handleDialog,
        props.showDialog
      );
    }
  };

  const handleChange = (event) => {
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
    const obj = {
      ...cardData,
      [name]: value
    };
    setCardData(obj);
  };

  React.useEffect(() => {
    getApiResponseFromStore();
    setError([]);
  }, [props.showDialog]);

  return (
    <>
      <PopUp
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureFooter={dialogStructureFooter}
        dialogDataFooter={dialogDataFooter}
        dialogStructureHeader={dialogStructureHeader}
        formName="editEmployerForm">
        <EditEmployerInfoForm
          EditEmployerInfoData={formData}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          EDITEMPLOYERINPUTS={handleChange}
          cardData={cardData}
          errorValue={errorValue}
          employmentData={props.consumerEmployers}
          formType={props.formType}
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
        onChange={props.EDITEMPLOYERINPUTS}
        placeholder={data.placeholder}
        error={validateHelperText(data, props.errorValue)}
        value={props.cardData[data.accessor]}
      />
    );
  }

  if (data.type == 'patternInput') {
    return (
      <PatternFormatTextfield
        data={data}
        captureInputs={props.EDITEMPLOYERINPUTS}
        error={props.errorValue}
        editValues={props.cardData}
      />
    );
  }

  if (data.type == 'select') {
    return (
      <Controls.SelectField
        key={data.id}
        name={data.name}
        value={props.cardData[data.accessor]}
        items={data.options?.optionsData}
        selectId={data.optionsValue}
        selectValue={data.optionsLabel}
        onChange={props.EDITEMPLOYERINPUTS}
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
        onChange={props.EDITEMPLOYERINPUTS}
        value={props.cardData[data.accessor]}
      />
    );
  }

  if ((data.type == 'date' && data.current) || (data.type == 'date' && formType == 'historical')) {
    let value =  props.cardData[data.accessor] ? format(parseISO(props.cardData[data.accessor]), 'yyyy-MM-dd') : undefined
    return (
      <Grid item xs={12}>
        <Controls.DatePickerFns
          name={data.name}
          value={parseISO(value)}
          onChange={props.EDITEMPLOYERINPUTS}
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

const EditEmployerInfoForm = (props) => {
  let tempFormType;

  if (props.cardData.active) {
    tempFormType = 'current';
  } else {
    tempFormType = 'historical';
  }

  ////// TO HANDLE ACTIVE/INACTIVE RADIO BUTTON IN HISTORICAL
  if (props.formType == 'historical' && tempFormType == 'historical') {
    props.EditEmployerInfoData?.filter((data) => data.accessor == 'active').forEach(
      (editEmployerOptionsData) => {
        editEmployerOptionsData.toolTipMsg = 'You can not change a historical employer to current';
        editEmployerOptionsData.disabled = true;
        editEmployerOptionsData.options.optionsData[0].disabled = true;
        editEmployerOptionsData.options.optionsData[0].name = editEmployerOptionsData.name;
      }
    );
  } else {
    /////// TO HANDLE START DATE WIDTH IN CURRENT
    props.EditEmployerInfoData?.filter((data) => data.accessor == 'startDate').forEach(
      (editEmployerOptionsData) => {
        editEmployerOptionsData.current = true;
      }
    );
  }
  /////// END DATE SHOULD NOT BE LESS THAN START DATE
  if (props.cardData?.startDate) {
    props.EditEmployerInfoData?.filter((data) => data.accessor == 'endDate').forEach(
      (editEmployerOptionsData) => {
        let minDate = parseISO(format(parseISO(props.cardData?.startDate), 'yyyy-MM-dd'))
        editEmployerOptionsData.minDate = minDate;
        editEmployerOptionsData.disabled = false;
      }
    );
  }

  if ('zipCode' in props.cardData) {
    const plainTextZipCode = props.cardData.zipCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.EditEmployerInfoData, 'zipCode', plainTextZipCode);
  }

  return (
    <form
      id="editEmployerForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.EditEmployerInfoData.map((data, index) => {
          return (
            <Grid
              item
              xs={renderGridSize(data, tempFormType)}
              key={`${data.id}_${data.accessor}`}
              style={renderGridStyles(data)}>
              {renderLabel(data, tempFormType)}
              <div style={handleFieldWidth(data)}>{getFormFields(data, props, tempFormType)}</div>
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};
function mapStateToProps(state) {
  return {
    consumerEmployers: state.ConsumerDetailsReducer.consumerEmployers,
    countriesData: state.StaticDataReducer.countriesData,
    statesData: state.StaticDataReducer.getstates,
    statesWithCountry: state.StaticDataReducer.statesWithCountry,
    employmentTypes: state.ConsumerDetailsReducer.employmentTypes
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITEMPLOYER: async (form, editconsumerInputs, customerId, handleDialog, showDialog) => {
      await dispatch(EDITEMPLOYER(form, editconsumerInputs, customerId, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEmployer);
