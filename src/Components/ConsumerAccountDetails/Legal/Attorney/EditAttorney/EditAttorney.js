import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import PopUp from '../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditAttorneyData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditAttorney.Data';
import { ColorPallete } from '../../../../../theme/ColorPallete.js';
import {
  UPDATEASSIGNEDATTORNEY,
  UPDATEASSIGNEDATTORNEYTOHISTORY
} from '../../../../../Actions/ConsumerDetails/Legal/ActionCreators';
import TextFieldComp from '../../../../Common/AEComponents/TextField/TextFieldComp';
import PatternFormatTextfield from '../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';
import SelectButton from '../../../../Common/AEComponents/DropDown/SelectButton.js';
import RadioButtonGroup from '../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import {
  renderGridSize,
  renderLabel,
  handleFieldWidth,
  renderGridStyles,
  validatePhoneNumber,
  validateZipCode,
  validateEmailAddress,
  removeSpecialCharactersFormField
} from '../../../../Common/CommonFunctions/CommonFunctionForm';
import { EDITATTORNEYINPUTS } from '../../../../../Actions/ConsumerDetails/Legal/Actions';
import {
  changeCountryNameToId,
  handleOptionsData,
  validateAlphanumeric,
  validateAlphaText,
  conditionBasedZipcodePattern,
  nestedIfCaseHandle
} from '../../../../Common/commonfunctions.js';

function EditAttorney(props) {
  const formRefEditAttorney = React.useRef();
  const [formData, setFormData] = React.useState(EditAttorneyData);
  const [errorValue, setError] = React.useState([]);
  const [editAttorneyInputs, setEditAttorneyInputs] = React.useState({});
  const [warnings, setWarnings] = React.useState([]);
  const [Inputfields, setInputfields] = React.useState([]);

  ///////////////////// SAVE STATES DATA IN STATE /////////////////////////////////
  React.useEffect(() => {
    const originalData = props.assignedAttorneys.filter(
      (value) => value.id == props.tableRowData.id
    );
    setEditAttorneyInputs(originalData[0]);
    setError([]);
  }, [props.tableRowData, props.showDialog]);

  ///////////////////// SET COUNTRY BASED ON STATE /////////////////////////////////
  React.useEffect(() => {
    if (props.getStates?.length > 0) {
      const arr = handleOptionsData(EditAttorneyData, 'stateId', props.getStates);
      setFormData(arr);
    }
  }, [props.getStates]);

  // Populating country textfeild with already selected states value
  React.useEffect(() => {
    if (editAttorneyInputs?.stateId) {
      let countryname;
      props.getStates?.forEach((st) => {
        if (editAttorneyInputs.stateId == st.id) {
          countryname = st?.country?.name;
        }
        return countryname;
      });
      setEditAttorneyInputs((attorneyData) => {
        const copy = { ...attorneyData };
        copy.countryId = countryname;
        return copy;
      });
    }
  }, [props.getStates, editAttorneyInputs.stateId, editAttorneyInputs.countryId]);

  const handleValidation = (formData, internalArr) => {
    formData.forEach((data) => {
      ////VALIDATE ZIP CODE
      validateZipCode(editAttorneyInputs[data.accessor], data, internalArr);
      ////VALIDATE PHONE NUMBER
      validatePhoneNumber(editAttorneyInputs[data.accessor], data, internalArr, data.errorMsg);
      ////VALIDATE EMAIL ADDRESS
      validateEmailAddress(editAttorneyInputs[data.accessor], data, internalArr);
      //VALIDATE ALPHANUMERIC
      if (data?.operation?.includes('validateAlphanumeric')) {
        const value = validateAlphanumeric(editAttorneyInputs[data.accessor]);
        if (value === false) {
          internalArr.push({
            fieldName: data.name,
            text: 'Input can only be alphanumeric'
          });
        }
      }
      //VALIDATE validateAlphaText
      if (data?.operation?.includes('validateAlphaText') && editAttorneyInputs[data.accessor]) {
        const value = validateAlphaText(editAttorneyInputs[data.accessor]);
        if (!value) {
          internalArr.push({
            fieldName: data.name,
            text: 'Input can only be alphabets'
          });
        }
      }
    });
  };

  const getSubmitData = (finalObj) => {
    let count = 0;
    formData.forEach((form) => {
      if (editAttorneyInputs.hasOwnProperty(form.accessor)) {
        finalObj[form.accessor] = 
        nestedIfCaseHandle(editAttorneyInputs[form.accessor]=="",null,editAttorneyInputs[form.accessor])
      }
      removeSpecialCharactersFormField(form, finalObj);
      if (form?.type?.includes('input') && finalObj[form.accessor]) {
        finalObj[form.accessor] = finalObj[form.accessor].trim();
        if (finalObj[form.accessor].trim()) count = count + 1;
      }
    });

    finalObj.active = editAttorneyInputs.hasAnAttorney ? editAttorneyInputs.hasAnAttorney : true;
    finalObj.historical = !editAttorneyInputs.hasAnAttorney;

    if (count == 0 || finalObj.historical) finalObj.toBeAssigned = true;
    else finalObj.toBeAssigned = false;

    //////////// CHANGE COUNTRY NAME TO ID
    changeCountryNameToId(finalObj, props.getStates);
  };

  const handleSubmitEditAttorney = async (event) => {
    event.preventDefault();
    const formRef = formRefEditAttorney;
    let internalArr = [];
    handleValidation(formData, internalArr);
    setError(internalArr);
    if (internalArr.length == 0) {
      let finalObj = {};
      getSubmitData(finalObj);
      // Update Attorney and Move to History
      if (finalObj.historical) {
        await props.UPDATEASSIGNEDATTORNEYTOHISTORY(
          props.tableRowData.id,
          finalObj,
          props.handleDialog,
          props.showDialog,
          formRef
        );
      } else {
        await props.UPDATEASSIGNEDATTORNEY(
          props.tableRowData.id,
          finalObj,
          props.handleDialog,
          props.showDialog,
          formRef
        );
      }
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const obj = {
      ...editAttorneyInputs,
      [event.target.name]: event.target.value
    };
    setEditAttorneyInputs(obj);
    setInputfields({ ...Inputfields, [name]: value });
  };

  React.useEffect(() => {
    if ('hasAnAttorney' in editAttorneyInputs && !editAttorneyInputs.hasAnAttorney) {
      let internalArr = [];
      internalArr.push({
        alertType: 'warning',
        text: 'Changing the attorney assigned to No, Will remove the attorney from the account',
        backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
        iconColor: ColorPallete.Alert.Warning.iconColor
      });
      setWarnings(internalArr);
    } else {
      setWarnings([]);
    }
  }, [editAttorneyInputs.hasAnAttorney]);

  return (
    <>
      <PopUp
        popupWidth="sm"
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        warnings={warnings}
        formName={'UpdateAttorneyForm'}>
        {
          <EditAttorneyForm
            EditAttorneyData={formData}
            editAttorneyInputs={editAttorneyInputs}
            handleChange={handleChange}
            formRef={formRefEditAttorney}
            formType={props.formType}
            EDITATTORNEYINPUTS={props.EDITATTORNEYINPUTS}
            errorValue={errorValue}
            handleSubmitEditAttorney={handleSubmitEditAttorney}
          />
        }
      </PopUp>
    </>
  );
}

const EditAttorneyForm = (props) => {
  let formType = props.formType;

  if ('zip' in props.editAttorneyInputs && props.editAttorneyInputs.zip) {
    const plainTextZipCode = props.editAttorneyInputs.zip.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.EditAttorneyData, 'zip', plainTextZipCode);
  }

  if (props.editAttorneyInputs.hasAnAttorney === false) {
    props.EditAttorneyData.filter(
      (data) => data.accessor != 'hasAnAttorney' && data.accessor != 'countryId'
    ).map((attorneyFormData) => {
      attorneyFormData.disabled = true;
    });
  } else {
    props.EditAttorneyData.filter(
      (data) => data.accessor != 'hasAnAttorney' && data.accessor != 'countryId'
    ).map((attorneyFormData) => {
      attorneyFormData.disabled = false;
    });
  }

  return (
    <form
      id="UpdateAttorneyForm"
      onSubmit={(event) => props.handleSubmitEditAttorney(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.EditAttorneyData?.map((data, index) => {
          return (
            <Grid
              item
              xs={renderGridSize(data, formType)}
              key={data.id}
              sx={{ paddingBottom: '10px' }}
              style={renderGridStyles(data)}>
              {renderLabel(data, formType)}
              <div style={handleFieldWidth(data)}>
                {data.type == 'radio' && (
                  <RadioButtonGroup
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    errorText={props.errorValue}
                  />
                )}
                {data.type == 'input' && (
                  <TextFieldComp
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    editValues={props.editAttorneyInputs}
                  />
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    editValues={props.editAttorneyInputs}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleChange}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    editValues={props.editAttorneyInputs}
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
    getStates: state.StaticDataReducer.getstates,
    editAttorneyInputs: state.LegalReducer.editAttorneyInputs,
    assignedAttorneyFlag: state.LegalReducer.assignedAttorneyFlag,
    assignedAttorneys: state.LegalReducer.assignedAttorneys
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITATTORNEYINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(EDITATTORNEYINPUTS(name, value));
    },
    UPDATEASSIGNEDATTORNEY: async (attorneyId, editAttorneyInputs, handleDialog, showDialog) => {
      await dispatch(
        UPDATEASSIGNEDATTORNEY(attorneyId, editAttorneyInputs, handleDialog, showDialog)
      );
    },
    UPDATEASSIGNEDATTORNEYTOHISTORY: async (
      attorneyId,
      editAttorneyInputs,
      handleDialog,
      showDialog
    ) => {
      await dispatch(
        UPDATEASSIGNEDATTORNEYTOHISTORY(attorneyId, editAttorneyInputs, handleDialog, showDialog)
      );
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAttorney);
