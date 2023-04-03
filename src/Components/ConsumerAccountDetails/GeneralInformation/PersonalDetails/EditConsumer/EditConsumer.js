import * as React from 'react';
import { Grid, FormControl } from '@oasis/react-core';
import PopUp from '../../../../Common/AEComponents/DialogBox/PopUp';
import {
  dialogDataHeader,
  dialogDataFooter,
  EditConsumerFormData,
  dialogStructureHeader,
  dialogStructureFooter
} from './EditConsumerForm.Data.js';
import ResponsiveDatePicker from '../../../../Common/AEComponents/DatePicker/ResponsiveDatePicker';
import { connect } from 'react-redux';
import { CREATEALIAS, EDITCONSUMERDEMOGRAPHICS } from '../../../../../Actions/ConsumerDetails/ActionCreators.js';
import { EDITCONSUMERINPUTS } from '../../../../../Actions/ConsumerDetails/Actions.js';
import { convertTimestamptoUSA } from '../../../../Common/commonfunctions';
import TextFieldComp from '../../../../Common/AEComponents/TextField/TextFieldComp';

import { ColorPallete } from '../../../../../theme/ColorPallete.js';
import SelectButton from '../../../../Common/AEComponents/DropDown/SelectButton.js';
import AddAlias from '../AddAlias/AddAlias';
import { AliasInformationFormData } from '../AddAlias/AddAlias.Data';

function AddConsumerDetails(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);
  const [errorValue, setError] = React.useState([]);
  const [consumerFormData, setConsumerFormData] = React.useState([]);
  const [aliasData, setAliasData] = React.useState(props.aliasData);
  const [warnings, setWarnings] = React.useState([]);
  

  React.useEffect(() => {
    setFormData(props.consumerDemographics);
  }, [props.consumerDemographics]);

  React.useEffect(()=>{
    let a = [...props.aliasData]
    setAliasData(a)
  },[props.showDialog,props.aliasData])

  const checkDuplicate = (aliasData, warnings) => {
    let duplicates = [];
    aliasData.forEach((el, i) => {
      aliasData.forEach((element, index) => {
        if (i === index) return null;
        if (element.name?.trim() === el.name?.trim() && element.typeId === el.typeId && element.name?.trim().length > 0) {
          if (!duplicates.includes(el)) duplicates.push(el);
        }
      });
    });
    if (duplicates.length > 0) {
      warnings.push({
        alertType: 'warning',
        text: 'You cannot have duplicate alias information',
        backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
        iconColor: ColorPallete.Alert.Warning.iconColor
      });
    }
    setWarnings(warnings);
  };

  const handleFormSubmit = (event) => {
    const internalArr = [],
      warnings = [];
    checkDuplicate(aliasData, warnings);
    event.preventDefault();
    const form = formRef;
    EditConsumerFormData.forEach((data, index) =>
      formData.forEach((consumerDemographicsData) => {
        if (data.required && data.type == 'input') {
          if (consumerDemographicsData[data.accessor].trim().length == 0) {
            internalArr.push({
              fieldName: data.name,
              text: `Please enter ${data.label}`,
              index: index
            });
          }
        } 
      })
    );
    AliasInformationFormData.forEach((data) => {
      aliasData.forEach((alias, index) => {
        if (data.required && data.type == 'input') {
          if (alias[data.accessor].trim().length == 0) {
            internalArr.push({
              fieldName: data.name,
              text: `Please enter ${data.label}`,
              index: index
            });
          }
        } else if (data.required && data.type == 'select') {
          if (alias[data.accessor] == null) {
            internalArr.push({
              fieldName: data.name,
              text: `Please enter ${data.label}`,
              index: index
            });
          }
        }
      });
    });
    setError(internalArr);
    if (warnings.length == 0 && internalArr.length == 0) {
      props.CREATEALIAS(
        form,
        aliasData,
        localStorage.getItem('customerId'),
        props.handleDialog,
        props.showDialog
      );
      props.EDITCONSUMERDEMOGRAPHICS(
        form,
        formData,
        localStorage.getItem('customerId'),
        props.handleDialog,
        props.showDialog,
        props.rotateExpandIcon,
        props.consumerDemographics
      );
    }
  };

  const handleChange = (event) => {
    const arr = [];
    arr.push({
      ...formData[0],
      [event.target.name]: event.target.value
    });
    setFormData(arr);
  };

  const clearWarnings = () => {
    setWarnings([]);
  };

  React.useEffect(() => {
    if (props.preferedLanguages.length > 0) {
      const arr = [];
      EditConsumerFormData?.forEach((formD) => {
        if (formD.accessor == 'languageReferenceId') {
          arr.push({
            ...formD,
            options: { optionsData: props.preferedLanguages }
          });
        } else {
          arr.push({ ...formD });
        }
      });
      setConsumerFormData(arr);
    }
  }, [props.preferedLanguages]);

  React.useEffect(() => {
    if (props.showDialog === false) {
      setTimeout(() => {
        setFormData(props.consumerDemographics);
      }, 2000);
    }
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
        formName="editConsumerForm"
        warnings={warnings}
        clearWarnings={clearWarnings}>
        <EditConsumerForm
          EditConsumerFormData={consumerFormData}
          EDITCONSUMERINPUTS={props.EDITCONSUMERINPUTS}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          consumerDemographics={props.consumerDemographics}
          formData={formData}
          handleChange={handleChange}
          errorValue={errorValue}
          setError={setError}
          preferedLanguages={props.preferedLanguages}
          setAliasData={setAliasData}
          aliasData={aliasData}
        />
      </PopUp>
    </>
  );
}

const EditConsumerForm = (props) => {
  let defaultLanguage;
  if (props.preferedLanguages.length > 0) {
    defaultLanguage = props.preferedLanguages.filter((language) => {
      if (language.isDefault === true) {
        return language;
      }
    });
  }

const languageReferenceIdData = props.EditConsumerFormData?.find((data) => data.accessor === 'languageReferenceId');
const defaultValue = props.consumerDemographics[0]?.languageReferenceId === null ? defaultLanguage?.[0]?.id : props.formData?.[0]?.languageReferenceId;
languageReferenceIdData.default = defaultValue;

  return (
    <form
      id="editConsumerForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container sx={{ flexDirection: 'column' }}>
        {props.EditConsumerFormData.map((data, index) =>
          props.formData.map((consumerDemographicsData) => {
            return (
              <Grid item xs={data.xs} key={`${data.id}_${index+1}`} sx={{ paddingBottom: '10px' }}>
                <div>
                  {data.label}{' '}
                  {data.required && (
                    <span style={{ color: ColorPallete.Border.Tertiary, marginLeft: '-4px' }}>
                      *
                    </span>
                  )}
                </div>
                <div>
                  {data.type === 'input' && (
                    <FormControl required={data.required} fullWidth>
                       <TextFieldComp
                          data={data}
                          captureInputs={props.handleChange}
                          error={props.errorValue}
                          errorText={props.errorValue}
                          editValues={consumerDemographicsData}
                        />
                    </FormControl>
                  )}
                  {data.type == 'select' && (
                    <SelectButton
                      data={data}
                      captureInputs={props.handleChange}
                      editValues={consumerDemographicsData}
                      defaultValue={data.default}
                      showName={false}
                    />
                  )}
                  {data.type == 'date' && (
                    <ResponsiveDatePicker
                      data={data}
                      maxDate={new Date()}
                      editValues={consumerDemographicsData}
                      captureInputs={props.handleChange}
                    />
                  )}
                </div>
              </Grid>
            );
          })
        )}
      </Grid>
      <AddAlias
        setAliasData={props.setAliasData}
        aliasData={props.aliasData}
        errorValue={props.errorValue}
        setError={props.setError}
      />
    </form>
  );
};

function mapStateToProps(state) {
  return {
    editconsumerInputs: state.ConsumerDetailsReducer.editconsumerInputs,
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    preferedLanguages: state.StaticDataReducer.preferedLanguages,
    aliasData: state.ConsumerDetailsReducer.aliasData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    EDITCONSUMERINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(EDITCONSUMERINPUTS(name, value));
    },
    EDITCONSUMERDEMOGRAPHICS: async (
      form,
      editconsumerInputs,
      customerId,
      handleDialog,
      showDialog,
      rotateExpandIcon,
      consumerDemographics
    ) => {
      const oldDate = convertTimestamptoUSA(consumerDemographics[0].dateOfBirth);
      const newDate = convertTimestamptoUSA(editconsumerInputs[0].dateOfBirth);
      if (oldDate == newDate) {
        editconsumerInputs[0].dateOfBirth = consumerDemographics[0].dateOfBirth;
      }
      await dispatch(
        EDITCONSUMERDEMOGRAPHICS(
          form,
          editconsumerInputs,
          customerId,
          handleDialog,
          showDialog,
          rotateExpandIcon
        )
      );
    },
    CREATEALIAS: async (form, aliasData, customerId, handleDialog, showDialog) => {
      await dispatch(CREATEALIAS(form, aliasData, customerId, handleDialog, showDialog));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddConsumerDetails);
