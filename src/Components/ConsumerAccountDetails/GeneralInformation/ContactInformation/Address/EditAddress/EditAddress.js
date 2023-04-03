import * as React from "react";
import { Grid } from "@oasis/react-core";
import { connect } from "react-redux";
import PopUp from "../../../../../Common/AEComponents/DialogBox/PopUp";
import SelectButton from "../../../../../Common/AEComponents/DropDown/SelectButton.js";
import {
  dialogDataHeader,
  dialogDataFooter,
  EditAddressFormData,
  dialogStructureHeader,
  dialogStructureFooter,
} from "./EditAddress.Data.js";
import ResponsiveDateTimePicker from "../../../../../Common/AEComponents/DateTimePicker/ResponsiveDateTimePicker";
import RadioButtonGroup from "../../../../../Common/AEComponents/RadioGroup/RadioButtonGroup";
import { ColorPallete } from "../../../../../../theme/ColorPallete";
import { EDITADDRESS } from "../../../../../../Actions/ConsumerDetails/ContactInformation/ActionCreators.js";
import AutoCompleteComp from "../../../../../Common/AEComponents/AutoComplete/AutoCompleteComp.js";
import TextFieldComp from "../../../../../Common/AEComponents/TextField/TextFieldComp";
import { handleOptionsData , validatePostalCode, zipCodeFormat, conditionBasedZipcodePattern} from "../../../../../Common/commonfunctions.js";
import PatternFormatTextfield from "../../../../../Common/AEComponents/PatternFormatTextfield/PatternFormatTextfield";

function EditAddress(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState([]);
  const [errorValue, setError] = React.useState([]);
  const [tableRowData, setTableRowData] = React.useState({});
  const [apiResponse, setApiResponse] = React.useState({});
  const [warnings, setWarnings] = React.useState([]);
  const [callStates, setCallStates] = React.useState(false);
  const [callSource, setCallSource] = React.useState(false);


  ///////////////////// GET ACTUAL API RESPONSE /////////////////////////////////

  React.useEffect(() => {
    const originalData = props.addressData?.filter((value) => value.id == props.tableRowData.id);
    setTableRowData(originalData[0]);
    setApiResponse(originalData[0]);
  }, [props.tableRowData,props.showDialog]);

  ///////////////////// REFACTOR ADDRESSTYPES AND SAVE IN AddAddressFormData /////////////////////////////////

  React.useEffect(() => {
    const refactoredAddressTypes = props.addressTypes?.map((type) => {
      return { ...type, name: type.name.replace("Address", "") };
    });
    const arr = handleOptionsData(EditAddressFormData, "typeId",refactoredAddressTypes);
    setFormData(arr);
    setCallStates(true)
  }, [props.addressTypes]);

  React.useEffect(() => {
    if(callSource){
      const refactoredAddressSource = props.consumerDemographicSource?.map((type) => {
        return { name: type.source, id: type.id, isDefault: type.isDefault };
      });
      const arr = handleOptionsData(formData, "sourceRefId", refactoredAddressSource);
      setFormData(arr);
    }
    // setCallStates(true)
  }, [props.consumerDemographicSource, callSource]);


  ///////////////////// SAVE STATES DATA IN STATE /////////////////////////////////

  React.useEffect(() => {
    if (callStates) {
      const arr = handleOptionsData(formData, "stateCode", props.statesData); 
      setFormData(arr); 
      setCallSource(true)     
    }
  }, [callStates]);

// Populating country textfeild with already selected states value 

  React.useEffect(() => {
    if (tableRowData?.stateCode) {
      let countryname
      props.statesData?.forEach((st)=>{
        if(tableRowData.stateCode == st.id){
          countryname = st?.country?.name
        }
        return countryname
      })   
      setTableRowData((emailData) => {
        const copy = { ...emailData };
        copy.countryCode = countryname;
        return copy;
      });
    }
  }, [tableRowData.stateCode, props.statesData]);

  /////// VALIDATE EXISTING PRIMARY RECORDS

  const filterData = (internalArr) => {
    const filteredRecords = props.addressData
      .filter((data) => data.isDefault);
    if (filteredRecords.length >= 1) {
      internalArr.push({
        alertType: "warning",
        text: "Marking the primary as Yes will remove the current primary",
        backgroundColor: ColorPallete.Alert.Warning.backgroundColor,
        iconColor: ColorPallete.Alert.Warning.iconColor,
      });
    }
  };


  React.useEffect(() => {
    let internalArr = [];
    if ("isDefault" in tableRowData && tableRowData.isDefault) {
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


  const handleChange = (event) => {
    const obj = {
      ...tableRowData,
      [event.target.name]: event.target.value,
    };
    setTableRowData(obj);
  };

  ///////////////////// VALIDATE REQUIRED FIELDS  /////////////////////////////////

  const validateRequiredFields = (data, internalArr) => {
      if (data.required && data.type !== "select" && data.type !== "radio") {
        if (!tableRowData[data.accessor]) {
          internalArr.push({
            fieldName: data.name,
            text: `Please enter ${data.label}`,
          });
        }
      } else {
        if (data.required && data.type !== "select" && data.type !== "radio") {
          if (tableRowData[data.accessor]?.trim().length == 0) {
            internalArr.push({
              fieldName: data.name,
              text: `Please enter ${data.label}`,
            });
          }
        }
        if (data.required && data.type == "select" && (tableRowData[data.accessor] == 'Select' || tableRowData[data.accessor] == null || tableRowData[data.accessor] == undefined)) {
          internalArr.push({
            fieldName: data.name,
            text: `Please enter ${data.label}`,
          });
        }
      }
  };
  const validateZipCode = (tableRowDatas, data, internalArr) => {
    if (data.accessor == "zipCode") {
      const response = validatePostalCode(tableRowDatas[data.accessor]);
      if (response && response != "") {
        internalArr.push({
          fieldName: data.name,
          text: response,
        });
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = formRef;
    let internalArr = [];
    EditAddressFormData.forEach((data) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(data, internalArr);
      /////VALIDATE ZIP CODE FORMAT
      validateZipCode(tableRowData,data,internalArr)
    });
    setError(internalArr);
    if (internalArr.length == 0) {
     
      const addServiceData = Object.assign({}, tableRowData);
      props.countriesData.forEach((country)=>{
        if(tableRowData.countryCode == country.name){
          addServiceData.countryCode = country.id
        }
      });
      addServiceData["source"]= addServiceData["sourceRefId"]
      delete addServiceData.sourceRefId
      addServiceData["zipCode"]=
      addServiceData["zipCode"] && addServiceData["zipCode"].replace(/[-_ )(]/g, "");
      props.EDITADDRESS(form, addServiceData, localStorage.getItem("customerId"), props.handleDialog, props.showDialog);
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
        formName="editAddressForm"
      >
        <EditAddressForm
          EditAddressFormData={formData}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          errorValue={errorValue}
          handleChange={handleChange}
          tableRowData={tableRowData}
          addressData={props.addressData}
          apiResponse={apiResponse}
        />
      </PopUp>
    </>
  );
}

const EditAddressForm = (props) => {
  if (
    props.apiResponse.isDefault &&
    props.apiResponse.active &&
    props.tableRowData.isDefault &&
    props.tableRowData.active &&
    props.apiResponse.addressType == props.tableRowData.addressType
  ) {
    props.EditAddressFormData.filter((data) => data.accessor == "isDefault").forEach((editAddressOptionsData) => {
      editAddressOptionsData.toolTipMsg =
        "To Change the primary contact information, Please change another contact information as primary.";
      editAddressOptionsData.disabled = true;
      editAddressOptionsData.options.optionsData[1].disabled = true;
      editAddressOptionsData.options.optionsData[1].name = editAddressOptionsData.name;
    });
    props.EditAddressFormData.filter((data) => data.accessor == "active").forEach((editAddressOptionsData) => {
      editAddressOptionsData.disabled = true;
      editAddressOptionsData.options.optionsData[1].disabled = true;
      editAddressOptionsData.options.optionsData[1].name = editAddressOptionsData.name;
    });
  } else {
    props.EditAddressFormData.filter((data) => data.accessor == "isDefault").forEach((editAddressOptionsData) => {
      delete editAddressOptionsData.changeValue;
      delete editAddressOptionsData.toolTipMsg;
      delete editAddressOptionsData.disabled;
      delete editAddressOptionsData.options.optionsData[1].disabled;
      delete editAddressOptionsData.options.optionsData[1].name;
      delete editAddressOptionsData.options.optionsData[0].disabled;
      delete editAddressOptionsData.options.optionsData[0].name;
    });
    props.EditAddressFormData.filter((data) => data.accessor == "active").forEach((editAddressOptionsData) => {
      delete editAddressOptionsData.disabled;
      delete editAddressOptionsData.options.optionsData[1].disabled;
      delete editAddressOptionsData.options.optionsData[1].name;
    });
  }

  if (
    (!props.tableRowData.active && !props.apiResponse.isDefault) ||
    (!props.tableRowData.active && props.apiResponse.isDefault)
  ) {
    props.EditAddressFormData.filter((data) => data.accessor == "isDefault").forEach((editAddressOptionsData) => {
      editAddressOptionsData.changeValue = true;
      editAddressOptionsData.toolTipMsg = "You can't change inactive contact to primary";
      editAddressOptionsData.disabled = true;
      editAddressOptionsData.options.optionsData[0].disabled = true;
      editAddressOptionsData.options.optionsData[0].name = editAddressOptionsData.name;
    });
  } else if (!props.apiResponse.isDefault) {
    props.EditAddressFormData.filter((data) => data.accessor == "isDefault").forEach((editAddressOptionsData) => {
      delete editAddressOptionsData.changeValue;
      delete editAddressOptionsData.toolTipMsg;
      delete editAddressOptionsData.disabled;
      delete editAddressOptionsData.options.optionsData[0].disabled;
      delete editAddressOptionsData.options.optionsData[0].name;
    });
  }

  if ("zipCode" in props.tableRowData && props.tableRowData.zipCode) {
    const plainTextZipCode = props.tableRowData.zipCode.replace(/[-_ )(]/g, '');
    conditionBasedZipcodePattern(props.EditAddressFormData, "zipCode", plainTextZipCode);
  }

  return (
    <form id="editAddressForm" onSubmit={(event) => props.handleFormSubmit(event)} ref={props.formRef} novalidate="novalidate">
      <Grid container>
        {props.EditAddressFormData &&
          props.EditAddressFormData.map((data, index) => {
            return (
              <Grid item xs={data.xs} key={`${data.id}_${index+1}`} sx={{ paddingBottom: "10px" }}>
                <div>
                  {data.label}{" "}
                  {data.required && <span style={{ color: ColorPallete.Border.Tertiary, marginLeft: "-4px" }}>*</span>}
                </div>
                <div>
                  {data.type == "input" && (
                      <TextFieldComp
                        data={data}
                        captureInputs={props.handleChange}
                        error={props.errorValue}
                        errorText={props.errorValue}
                        editValues={props.tableRowData}
                        zipCodeFormat={zipCodeFormat}
                      />
                  )}
                  {data.type == "patternInput" && (
                      <PatternFormatTextfield
                        data={data}
                        captureInputs={props.handleChange}
                        error={props.errorValue}
                        errorText={props.errorValue}
                        editValues={props.tableRowData}
                      />
                  )}
                  { data.type == "autoComplete" && (
                    <AutoCompleteComp
                      data={data}
                      captureInputs={props.handleChange}
                      error={props.errorValue}
                      errorText={props.errorValue}
                      editValues={props.tableRowData}
                    />
                  )} 
                  { data.type == "select" && (
                    <SelectButton
                      data={data}
                      captureInputs={props.handleChange}
                      error={props.errorValue}
                      errorText={props.errorValue}
                      editValues={props.tableRowData}
                      component={'address'}
                      accessor={data.accessor}
                    />
                  )} 
                  { data.type == "radio" && (
                    <RadioButtonGroup data={data} captureInputs={props.handleChange} editValues={props.tableRowData} />
                  )} 
                  { data.type == "date/time" && (
                    <ResponsiveDateTimePicker data={data} captureInputs={props.handleChange} editValues={props.tableRowData} />
                  ) }
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
    addressData: state.ContactInfoReducer.addressData,
    addressTypes: state.ContactInfoReducer.addressTypes,
    countriesData: state.StaticDataReducer.countriesData,
    statesData: state.StaticDataReducer.getstates,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITADDRESS: async (form, editAddressInputs, customerId, handleDialog, showDialog) => {
      await dispatch(EDITADDRESS(form, editAddressInputs, customerId, handleDialog, showDialog));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);
