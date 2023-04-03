import { Grid, styled, TextField } from '@oasis/react-core';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  ADDATTORNEY,
  ASSIGNEXISTINGATTORNEY,
  DELETEASSIGNEDATTORNEY,
  UPDATEASSIGNEDATTORNEY
} from '../../../../../Actions/ConsumerDetails/Legal/ActionCreators';
import {
  ADDATTORNEYINPUTS,
  ATTORNEYCANCELPAGE,
  ATTORNEYSEARCHLIST
} from '../../../../../Actions/ConsumerDetails/Legal/Actions';
import { ColorPallete } from '../../../../../theme/ColorPallete.js';
import CustomAutoComplete from '../../../../Common/AEComponents/AutoComplete/CustomAutoComplete';
import PopUp from '../../../../Common/AEComponents/DialogBox/PopUp';
import SelectButton from '../../../../Common/AEComponents/DropDown/SelectButton.js';
import PatternFormatTextfield from '../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield';
import RadioButtonGroup from '../../../../Common/AEComponents/RadioGroup/RadioButtonGroup';
import TextFieldComp from '../../../../Common/AEComponents/TextField/TextFieldComp';
import {
  changeCountryNameToId,
  changePopupHeading,
  extractImagePath,
  handleOptionsData,
  validateAlphanumeric,
  validateAlphaText,
  conditionBasedZipcodePattern,
  nestedIfCaseHandle
} from '../../../../Common/commonfunctions.js';
import {
  handleFieldWidth,
  renderGridSize,
  renderGridStyles,
  renderLabel,
  validateEmailAddress,
  validatePhoneNumber,
  validateZipCode,
  removeSpecialCharactersFormField
} from '../../../../Common/CommonFunctions/CommonFunctionForm';
import { fetchSearchAttorney } from '../../ApiAction';
import { AttorneyPopupData } from '../Attorney.Data.js';
import { useDebounce } from './../../../../../hooks/useDebounce';
import {
  AddAttorneyData,
  dialogDataFooter,
  dialogDataFooterAddAttorneyForm,
  dialogDataHeader,
  dialogStructureFooter,
  dialogStructureHeader
} from './AddAttorney.Data.js';
import useStyles from './AddAttorney.styles';
import DisplaySelectedAttorney from './DisplaySelectedAttorney/DisplaySelectedAttorney.js';

let requestData = [
  {
    firstName: null,
    lastName: null,
    email: null,
    firmName: null,
    contactFirstName: null,
    contactLastName: null,
    barcode: null,
    mobileNumber: null,
    historical: false,
    active: true,
    addressLine1: null,
    addressLine2: null,
    city: null,
    stateId: null,
    zip: null,
    countryId: null,
    officeNumber: null,
    faxNumber: null,
    toBeAssigned: true,
    infoSource: null
  }
];

const handlePopupHeading = (props, header) => {
  if ( props.formOperation == 'assignAttorney') {
  header = changePopupHeading(
    props.formOperation == 'assignAttorney',
    'Assign an Attorney',
    dialogDataHeader,
    <img src={extractImagePath('add.png')} />
  );
} else  {
  header = changePopupHeading(
    props.formOperation == 'updateAttorney',
    'Update Assigned Attorney',
    dialogDataHeader,
    <img src={extractImagePath('add.png')} />
  );
  }
  return header;
}

function AddAttorney(props) {
  const { showForm, setShowForm } = props;
  const formRefAddAttorney = React.useRef();
  const styles = useStyles();
  const autoRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState(1);
  const [inputValue, setInputValue] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [formData, setFormData] = React.useState(AddAttorneyData);
  const [errorValue, setError] = React.useState([]);
  const [addAttorneyInputs, setAttorneyInputs] = React.useState({});
  const [warnings, setWarnings] = React.useState([]);
  const [Inputfields, setInputfields] = React.useState([]);
  const [popupHeaderData, setDialogDataHeader] = React.useState(dialogDataHeader);
  const [popupFooterData, setDialogDataFooter] = React.useState(dialogDataFooter);
  const [popupFooterStructureData, setDialogDataFooterStructure] =
    React.useState(dialogStructureFooter);
  const [searchClick, setsearchClick] = React.useState([]);
const [searchCompleted,setSearchCompleted]=React.useState(false)

  React.useEffect(() => {
    if (props.showDialog) {
      setsearchClick([]);
      setWarnings([]);
      setSearchCompleted(false)
    }
  }, [props.showDialog]);

  React.useEffect(() => {
    if (searchClick.length > 0) {
      let footerValue = dialogStructureFooter.map((footerData) => {
        if (footerData.accessor == 'addButton') {
          footerData.disabled = false;
          return footerData;
        } else {
          return { ...footerData };
        }
      });
      setDialogDataFooterStructure(footerValue);
    }
  }, [searchClick]);

  React.useEffect(() => {
    if (showForm) {
      let footerValue = dialogStructureFooter.map((footerData) => {
        if (footerData.accessor == 'cancelButton') {
          footerData.type = 'showCancel';
          return footerData;
        } else {
          return { ...footerData };
        }
      });
      setDialogDataFooterStructure(footerValue);
    }
  }, [showForm]);

  React.useEffect(() => {
    if (props.formOperation == 'assignAttorney' && !showForm) {
      let header = changePopupHeading(
        props.formOperation == 'assignAttorney',
        'Assign an Attorney',
        dialogDataHeader,
        <img src={extractImagePath('add.png')} />
      );
      setDialogDataHeader(header);
    }
  }, [props.formOperation]);

  ///////////////////// SAVE USER INPUTS IN STATE /////////////////////////////////

  React.useEffect(() => {
    setAttorneyInputs(props.addAttorneyInputs);
  }, [props.addAttorneyInputs]);

  ///////////////////// SAVE USER INPUTS IN STATE /////////////////////////////////

  React.useEffect(() => {
    if (props.getStates?.length > 0) {
      const arr = handleOptionsData(AddAttorneyData, 'stateId', props.getStates);
      setFormData(arr);
    }
  }, [props.getStates]);

  ///////////////////// SET COUNTRY BASED ON STATE /////////////////////////////////

  React.useEffect(() => {
    if (addAttorneyInputs.stateId) {
      props.getStates.forEach((state) => {
        if (addAttorneyInputs.stateId == state.id) {
          addAttorneyInputs.countryId = state?.country?.name;
          return addAttorneyInputs;
        }
      });
      const temp = { ...addAttorneyInputs };
      setAttorneyInputs(temp);
    }
  }, [addAttorneyInputs.stateId]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (Inputfields.HasanAttorney === true && ( searchClick.length==undefined||searchClick.length==0 )) {
      await props.ADDATTORNEY(
        localStorage.getItem('responsibleId'),
        requestData,
        props.handleDialog,
        props.showDialog
      );
    } else if (searchClick.length > 0 && Inputfields.HasanAttorney) {
      await props.ASSIGNEXISTINGATTORNEY(
        localStorage.getItem('responsibleId'),
        searchClick[0]?.id,
        props.handleDialog,
        props.showDialog
      );
    } else {
      await props.DELETEASSIGNEDATTORNEY(
        props.assignedAttorneyFlag[0].id,
        props.handleDialog,
        props.showDialog
      );
    }
    ///submit code write
  };

  const validateForm =(internalArr)=>{
    formData.forEach((data) => {
      ////VALIDATE ZIP CODE
      validateZipCode(addAttorneyInputs[data.accessor], data, internalArr);
      ////VALIDATE PHONE NUMBER
      validatePhoneNumber(addAttorneyInputs[data.accessor], data, internalArr, data.errorMsg);
      ////VALIDATE EMAIL ADDRESS
      validateEmailAddress(addAttorneyInputs[data.accessor], data, internalArr);
      if (data?.operation?.includes('validateAlphanumeric') && addAttorneyInputs[data.accessor]) {
        const value = validateAlphanumeric(addAttorneyInputs[data.accessor]);
        if (value === false) {
          internalArr.push({
            fieldName: data.name,
            text: 'Input can only be alphanumeric'
          });
        }
      }
      if (data?.operation?.includes('validateAlphaText') && addAttorneyInputs[data.accessor]) {
        const value = validateAlphaText(addAttorneyInputs[data.accessor]);
        if (!value) {
          internalArr.push({
            fieldName: data.name,
            text: 'Input can only be alphabets'
          });
        }
      }
    });
  }

  const getSubmitData = (finalObj)=>{
    let count=0;
    requestData.forEach((data) => {
      formData.forEach((form) => {
        if (addAttorneyInputs.hasOwnProperty(form.accessor)) {
          finalObj[form.accessor] = 
          nestedIfCaseHandle(addAttorneyInputs[form.accessor] =="",null,addAttorneyInputs[form.accessor])
        }
        removeSpecialCharactersFormField(form,finalObj)
        if (form?.type?.includes('input') &&finalObj[form.accessor] ) {
          finalObj[form.accessor] =  finalObj[form.accessor].trim(); 
        if(finalObj[form.accessor].trim())
          count=count+1
        }
      });
    });
    finalObj.active = true;
    finalObj.historical = false;

    if(count==0)       
     finalObj.toBeAssigned = true;
    else 
     finalObj.toBeAssigned = false;

     //////////// CHANGE COUNTRY NAME TO ID
    changeCountryNameToId(finalObj, props.getStates);
  }
  const handleSubmitAddAttorney = async (event) => {
    event.preventDefault();
    const formRef = formRefAddAttorney;
    let internalArr = [];
    validateForm(internalArr);
    setError(internalArr);
    if (internalArr.length == 0) {
      let finalObj = {};
      getSubmitData(finalObj);
        if (props.assignedAttorneyFlag.length > 0) {
          props.ATTORNEYCANCELPAGE(true);
          await props.UPDATEASSIGNEDATTORNEY(
            props.assignedAttorneyFlag[0].id,
            finalObj,
            props.handleCloseDialog,
            props.showDialog,
            formRef
          );
        } else {
          props.ATTORNEYCANCELPAGE(true);
          await props.ADDATTORNEY(
            localStorage.getItem('responsibleId'),
            [finalObj],
            props.handleCloseDialog,
            props.showDialog,
            formRef
          );
        }
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputfields({ ...Inputfields, [name]: value });
  };

  const removeText = () => {
    setInputValue('');
    setOpen(false);
    autoRef.current?.setValue(null);
  };

  const handleShowForm = () => {
    setOpen(false);
    setInputValue('');
    setShowForm(true);
    autoRef.current?.setValue(null);
  };

  const clearWarnings = () => {
    setWarnings([]);
  };

  React.useEffect(() => {
    let footer, header;
    if (showForm && props.formOperation == 'assignAttorney') {
      header = changePopupHeading(
        props.formOperation == 'assignAttorney',
        'Add an Attorney',
        dialogDataHeader,
        <img src={extractImagePath('add.png')} />
      );
    } else if (showForm) {
      header = changePopupHeading(
        props.formOperation == 'updateAttorney',
        'Add New Attorney',
        dialogDataHeader,
        <img src={extractImagePath('add.png')} />
      );
      if (props.assignedAttorneyFlag.length > 0) {
        footer = dialogDataFooter.map((footer) => {
          if (props.formOperation == 'updateAttorney' && footer.accessor == 'addButton') {
            footer.disabled = false;
            return footer;
          } else {
            return { ...footer };
          }
        });
      }
    } else {
      header = changePopupHeading(
        props.formOperation == 'updateAttorney',
        'Update Assigned Attorney',
        dialogDataHeader,
        <img src={extractImagePath('edit.png')} />
      );
      if (props.assignedAttorneyFlag.length > 0) {
        footer = dialogDataFooter.map((footer) => {
          if (props.formOperation == 'updateAttorney' && footer.accessor == 'addButton') {
            //NOSONAR
            // footer.disabled = true;
            return footer;
          } else {
            return { ...footer };
          }
        });
      }
    }
    if (header) {
      setDialogDataHeader(header);
    }
    if (footer) {
      setDialogDataFooter(footer);
    }
  }, [showForm]);

  React.useEffect(() => {
    let header,footer ;
    handlePopupHeading(props, header);

    if (Inputfields.hasOwnProperty('HasanAttorney') && !Inputfields.HasanAttorney) {
      footer = dialogDataFooter.map((footer) => {
        if (footer.accessor == 'addButton') {
          footer.disabled = false;
          return footer;
        } else {
          return { ...footer };
        }
      });
      
      let internalArr = [];
      internalArr.push({
        alertType: 'warning',
        text: 'Changing the attorney assigned to No, Will remove the attorney from the account',
        backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
        iconColor: ColorPallete.Alert.Warning.iconColor
      });
      setWarnings(internalArr);
    } else if (Inputfields.HasanAttorney && props.assignedAttorneyFlag.length > 0) {
      footer = dialogDataFooter.map((footer) => {
        if (footer.accessor == 'addButton') {
          //NOSONAR
          // footer.disabled = true;
          return footer;
        } else {
          return { ...footer };
        }
      });
      setWarnings([]);
    }
    if (header) {
      setDialogDataHeader(header);
    }
    if (footer) {
      setDialogDataFooter(footer);
    }

  }, [Inputfields]);

  const handlegetApiCall = (optionData) => {
    setInputValue('');
    setsearchClick([optionData]);
    setTimeout(() => {
      setSearchCompleted(true)
    }, 700);
  };

  return (
    <>
      <PopUp
        popupWidth={'sm'}
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={popupHeaderData}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={!showForm ? popupFooterData : dialogDataFooterAddAttorneyForm}
        dialogStructureFooter={popupFooterStructureData}
        warnings={warnings}
        clearWarnings={clearWarnings}
        formName={!showForm ? 'addAttorneyForm' : 'AddNewAttorneyForm'}>
        {!showForm && (
          <AttorneyPopup
            AttorneyPopupData={AttorneyPopupData}
            handleShowForm={handleShowForm}
            handleFormSubmit={handleFormSubmit}
            handleChange={handleChange}
            autoRef={autoRef}
            key={key}
            removeText={removeText}
            setOpen={setOpen}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            setKey={setKey}
            open={open}
            inputValue={inputValue}
            setInputValue={setInputValue}
            styles={styles}
            assignedAttorneyFlag={props.assignedAttorneyFlag}
            warnings={warnings}
            Inputfields={Inputfields}
            handlegetApiCall={handlegetApiCall}
          />
        )}
        {showForm && (
          <AddAttorneyForm
            AddAttorneyData={formData}
            addAttorneyInputs={addAttorneyInputs}
            handleChange={handleChange}
            formRef={formRefAddAttorney}
            formType={props.formType}
            ADDATTORNEYINPUTS={props.ADDATTORNEYINPUTS}
            errorValue={errorValue}
            handleSubmitAddAttorney={handleSubmitAddAttorney}
          />
        )}
        {!showForm && searchClick.length > 0 &&  searchCompleted && (
          <DisplaySelectedAttorney searchClick={searchClick} />
        )}
      </PopUp>
    </>
  );
}

const AddAttorneyForm = (props) => {
  let formType = props.formType;

  if ('zip' in props.addAttorneyInputs) {
    const plainTextZipCode = props.addAttorneyInputs.zip.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.AddAttorneyData, 'zip', plainTextZipCode);
  }

  return (
    <form
      id="AddNewAttorneyForm"
      onSubmit={(event) => props.handleSubmitAddAttorney(event)}
      ref={props.formRef}
      novalidate="novalidate">
      <Grid container>
        {props.AddAttorneyData?.map((data, index) => {
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
                    captureInputs={props.ADDATTORNEYINPUTS}
                    error={props.errorValue}
                    errorText={props.errorValue}
                  />
                )}
                {data.type == 'input' && (
                  <TextFieldComp
                    data={data}
                    captureInputs={props.ADDATTORNEYINPUTS}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    userInputs={data.sendUserInputs ? props.addAttorneyInputs : null}
                    editValues={props.addAttorneyInputs}
                  />
                )}
                {data.type == 'patternInput' && (
                  <PatternFormatTextfield
                    data={data}
                    captureInputs={props.ADDATTORNEYINPUTS}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    editValues={props.addAttorneyInputs}
                  />
                )}
                {data.type == 'select' && (
                  <SelectButton
                    data={data}
                    captureInputs={props.ADDATTORNEYINPUTS}
                    error={props.errorValue}
                    errorText={props.errorValue}
                    editValues={props.addAttorneyInputs}
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

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: ColorPallete.Border.Primary
    },
    '&:hover fieldset': {
      borderColor: ColorPallete.Border.Primary
    },
    '&.Mui-focused fieldset': {
      borderColor: ColorPallete.Border.Primary
    }
  }
});

const AttorneyPopup = (props) => {
  const dispatch = useDispatch();
  const searchTerm = useDebounce(props.inputValue, 500);
  const [showOptions, setShowOptions] = React.useState(false);
  const [searchList, setSearchList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const GetSearchListCall = async () => {
    if (searchTerm.length > 2) {
      setShowOptions(false);
      setSearchList([]);
      setLoading(true);
      let searchResponse = await fetchSearchAttorney(searchTerm);
      setSearchList(searchResponse);
      setLoading(false);
      setShowOptions(true);
    } else {
      setShowOptions(false);
      dispatch(ATTORNEYSEARCHLIST([]));
    }
  };

  React.useEffect(() => {
    return () => {
      props.setInputValue('');
    };
  }, []);

  React.useEffect(() => {
    GetSearchListCall();
  }, [searchTerm]);

  if (props.assignedAttorneyFlag.length > 0) {
    props.AttorneyPopupData.filter((data) => data.accessor == 'HasanAttorney').forEach((form) => {
      form.disabled = false;
      form.options.optionsData[1].disabled = false;
    });
  } else {
    props.AttorneyPopupData.filter((data) => data.accessor == 'HasanAttorney').forEach((form) => {
      form.disabled = true;
      form.options.optionsData[1].disabled = true;
    });
  }

  props.AttorneyPopupData.filter((data) => data.accessor == 'searchAttorneyToadd').forEach(
    (form) => {
      if (props.Inputfields?.HasanAttorney === false) {
        form.label = '';
      } else {
        form.label = 'Search attorney to add';
      }
      return form;
    }
  );

  return (
    <form
      id="addAttorneyForm"
      key={'attorney-search-form'}
      onSubmit={(event) => props.handleFormSubmit(event)}
      novalidate="novalidate">
      <Grid container>
        {props.AttorneyPopupData?.map((data, index) => {
          return (
            <Grid item xs={data.xs} key={data.id} sx={{ paddingBottom: '10px' }}>
              <div>
                {data.label}
                {data.required && (
                  <span
                    style={{
                      color: ColorPallete.Border.Tertiary,
                      marginLeft: '3px'
                    }}>
                    *
                  </span>
                )}
              </div>
              <div style={{ width: data.width || '' }}>
                {data.type == 'radio' && (
                  <RadioButtonGroup data={data} captureInputs={props.handleChange} />
                )}

                {data.type == 'autocomplete' && props.Inputfields?.HasanAttorney === true && (
                  <>
                    {' '}
                    <CustomAutoComplete
                      showAddButton={true}
                      placeholder={`Search by Attorney Name`}
                      onClickAdd={props.handleShowForm}
                      addButtonText={`Add an Attorney`}
                      inputValue={props.inputValue}
                      setInputValue={props.setInputValue}
                      options={searchList}
                      onClickOption={props.handlegetApiCall}
                      showOptions={showOptions}
                      loading={loading}
                    />
                  </>
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
    addAttorneyInputs: state.LegalReducer.addAttorneyInputs,
    assignedAttorneyFlag: state.LegalReducer.assignedAttorneyFlag
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ADDATTORNEYINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDATTORNEYINPUTS(name, value));
    },
    ADDATTORNEY: async (responsibleId, reqBody, handleDialog, showDialog) => {
      await dispatch(ADDATTORNEY(responsibleId, reqBody, handleDialog, showDialog));
    },
    UPDATEASSIGNEDATTORNEY: async (attorneyId, addAttorneyInputs, handleDialog, showDialog) => {
      await dispatch(
        UPDATEASSIGNEDATTORNEY(attorneyId, addAttorneyInputs, handleDialog, showDialog)
      );
    },
    DELETEASSIGNEDATTORNEY: async (attorneyId, handleDialog, showDialog) => {
      await dispatch(DELETEASSIGNEDATTORNEY(attorneyId, handleDialog, showDialog));
    },
    ATTORNEYCANCELPAGE: async (value) => {
      await dispatch(ATTORNEYCANCELPAGE(value));
    },
    ASSIGNEXISTINGATTORNEY: async (responsibleId, attorneyId, handleDialog, showDialog) => {
      await dispatch(ASSIGNEXISTINGATTORNEY(responsibleId, attorneyId, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAttorney);
