import * as React from "react";
import { Grid } from "@oasis/react-core";
import PopUp from "../../../../../Common/AEComponents/DialogBox/PopUp";
import SelectButton from "../../../../../Common/AEComponents/DropDown/SelectButton.js";
import TextFieldComp from "../../../../../Common/AEComponents/TextField/TextFieldComp";
import {
  dialogDataHeader,
  dialogDataFooter,
  AddCallWrapUpFormData,
  dialogStructureHeader,
  dialogStructureFooter,
} from "./AddCallWrapUpNote.Data.js";
import { ColorPallete } from "../../../../../../theme/ColorPallete";
import MultiSelectBox from "../../../../../Common/AEComponents/MultiSelect/MultiSelectBox";
import {
  handleOptionsData,
  validateError,
  validateHelperText,
} from "../../../../../Common/commonfunctions";
import { connect } from "react-redux";
import {
  GETCONSUMERFORCALLWRAPUPNOTE,
  GETCONSUMERPERSONALINFO,
  GETSPOKETOLIST,
  RESETVALONCHANGESPOKETO,
  SUBMITFORMCALL,
} from "../../../../../../Actions/ConsumerDetails/ActionCreators";
import {
  GETCALLWRAPUPDATA,
  GETCALLMETHODS,
} from "../../../../../../Actions/StaticData/ActionCreators";
import { ADDCALLWRAPUPNOTEINPUTS } from "../../../../../../Actions/ConsumerDetails/Actions";

function AddCallWrapUpNote(props) {
  const formRef = React.useRef();
  const [formData, setFormData] = React.useState(AddCallWrapUpFormData);
  const [errorValue, setError] = React.useState([]);
  const [addCallwrapupInputs, setInputs] = React.useState({});
  const [multiSelectError, setMultiSelectError] = React.useState("");
  const [accountID, setAccountID] = React.useState([]);

  React.useEffect(() => {
    setError([]);
    setMultiSelectError("");
    setAccountID([]);
    if (
      props.consumerDemographics &&
      props.showDialog &&
      !props.addCallwrapupInputs.spokeToName
    ) {
      props.ADDCALLWRAPUPNOTEINPUTS({
        target: {
          name: "spokeToName",
          value: `${props.consumerDemographics[0]?.firstName} ${props.consumerDemographics[0]?.lastName}`,
        },
      });
      const filtereddata = props.spokeToList?.value?.find(
        (opt) =>
          `${opt?.firstName} ${opt?.lastName}` ==
          `${props.consumerDemographics[0]?.firstName} ${props.consumerDemographics[0]?.lastName}`
      );
      props.GETCONSUMERFORCALLWRAPUPNOTE(filtereddata?.id); // responsibleid
    }
  }, [props.showDialog]);

  React.useEffect(() => {
    props.GETCALLWRAPUPDATA();
    props.GETCALLMETHODS();
  }, []);

  React.useEffect(() => {
    if (props.consumerDemographics && !props.addCallwrapupInputs.spokeToName) {
      props.ADDCALLWRAPUPNOTEINPUTS({
        target: {
          name: "spokeToName",
          value: `${props.consumerDemographics[0]?.firstName} ${props.consumerDemographics[0]?.lastName}`,
        },
      });
    }
  }, [props.consumerDemographics]); //Spoke To List Change

  //// SAVE callMethod DATA  IN Form
  React.useEffect(() => {
    const fData = formData.map((d) => {
      if (d.accessor == "callMethod") {
        return {
          ...d,
          options: { optionsData: props.callMethodsData },
        };
      }
      if (d.accessor == "spokeToName") {
        const spokeToData =
          props?.spokeToList?.value?.length > 0
            ? props.spokeToList.value
                ?.map((data) => {
                  return {
                    label: `${data?.firstName} ${data?.lastName}`,
                    accessor: `${data?.firstName} ${data?.lastName}`,
                    value: `${data?.firstName} ${data?.lastName}`,
                  };
                })
                .filter(
                  (v, i, a) => a.findIndex((v2) => v2.label === v.label) === i
                )
            : [];
        return {
          ...d,
          options: {
            optionsData: [
              ...spokeToData,
              {
                label: `Others`,
                accessor: `Others`,
                value: `Others`,
                id: `Others`,
              },
              {
                label: `Voicemail`,
                accessor: `Voicemail`,
                value: "Voicemail",
                id: "Voicemail",
              },
            ],
          },
        };
      }
      if (d.accessor == "phoneNumber") {
        return {
          ...d,
          options: {
            optionsData: props?.consumerPhoneData
              ?.filter((f) => f.number)
              .map((data) => {
                return {
                  ...data,
                  label: data.number?.replace(
                    /^(\d{3})(\d{3})(\d{4})$/g,
                    "($1) $2-$3"
                  ),
                  value: data.number,
                  id: data.number,
                };
              }),
          },
        };
      }
      if (d.accessor == "accounts") {
        const accData = props.currentRecords.map((data) => {
          return {
            ...data,
            label: data.accountNumber,
            value: data.accountUuid,
          };
        });
        return {
          ...d,
          options: {
            optionsData: [
              {
                label: "Select All",
                value: "all",
              },
              ...accData,
            ],
          },
        };
      } else {
        return {
          ...d,
        };
      }
    });
    setFormData(fData);
  }, [
    props.callMethodsData,
    props.spokeToList,
    props.consumerPhoneData,
    props.currentRecords,
  ]);

  React.useEffect(() => {
    setInputs(props.addCallwrapupInputs);
  }, [props.addCallwrapupInputs]);

  // PHONE NUMBER option set
  React.useEffect(() => {
    if (props.spokeToList) {
      if (
        addCallwrapupInputs.spokeToName === "Voicemail" ||
        addCallwrapupInputs.spokeToName === "Others"
      ) {
        const filtereddata = props.spokeToList?.value?.find(
          (opt) =>
            `${opt?.firstName} ${opt?.lastName}` ==
            `${props.consumerDemographics[0]?.firstName} ${props.consumerDemographics[0]?.lastName}`
        );
        props.GETCONSUMERFORCALLWRAPUPNOTE(filtereddata?.id); // responsibleid
      } else {
        const filtereddata = props.spokeToList?.value?.find(
          (opt) =>
            `${opt?.firstName} ${opt?.lastName}` ==
            addCallwrapupInputs.spokeToName
        );
        if (filtereddata?.id) {
          props.GETCONSUMERFORCALLWRAPUPNOTE(filtereddata?.id); // responsibleid
        }
      }
    }
  }, [addCallwrapupInputs.spokeToName]);

  //// CALL OUTCOME OPTION
  React.useEffect(() => {
    if ("callMethod" in addCallwrapupInputs) {
      const activeCallOutcomes = props.callWrapUpData.filter(
        (outcome) => outcome.active === true
      );
      const optionsData = [];
      activeCallOutcomes.forEach((data) =>
        data.methods.forEach((method) => {
          if (method.id === addCallwrapupInputs.callMethod) {
            optionsData.push(data);
          }
        })
      );
      const arr = handleOptionsData(formData, "callOutcome", optionsData);
      if (arr.length > 0) {
        setFormData(arr);
      }
    }
  }, [addCallwrapupInputs.callMethod]);

  const submitForm = async () => {
    let filtereddata = {};
    if (
      addCallwrapupInputs.spokeToName === "Voicemail" ||
      addCallwrapupInputs.spokeToName === "Others"
    ) {
      filtereddata = props.spokeToList?.value?.find(
        (opt) =>
          `${opt?.firstName} ${opt?.lastName}` ==
          `${props.consumerDemographics[0]?.firstName} ${props.consumerDemographics[0]?.lastName}`
      );
    } else {
      filtereddata = props.spokeToList?.value?.find(
        (opt) =>
          `${opt?.firstName} ${opt?.lastName}` ==
          addCallwrapupInputs.spokeToName
      );
    }
    let requestData = [
      {
        customerUuid: filtereddata.id,
        callMethod: props.callMethodsData.find(
          (f) => f.id === addCallwrapupInputs.callMethod
        )?.name,
        phoneNumber: addCallwrapupInputs.phoneNumber,
        callOutCome: props.callWrapUpData.find(
          (f) => f.id === addCallwrapupInputs.callOutcome
        )?.description,
        notes: addCallwrapupInputs.notes,
        spokeToOption: "Person",
        account: addCallwrapupInputs.accounts
          .filter((f) => f.value !== "all")
          .map((d) => {
            return {
              uuid: d.accountUuid || d.value,
            };
          }),
      },
    ];
    await props.SUBMITFORMCALL(props.responsibleId, requestData);
    props.handleDialogCancel();
  };

  const recordErrors = (data, internalArr) => {
    internalArr.push({
      fieldName: data.name,
      text: `Please enter ${data.label}`,
    });
  };

  const validateRequiredFields = (data, internalArr) => {
    if (data.required) {
      if (data.type == "select" && !addCallwrapupInputs[data.accessor]) {
        recordErrors(data, internalArr);
      }
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let validInput = true;
    let internalArr = [];
    AddCallWrapUpFormData.forEach((data) => {
      /////VALIDATE REQUIRED FIELDS
      validateRequiredFields(data, internalArr);
      //// VALIDATE Account - MULTI SELECT
      if (
        data.type == "multiSelect" &&
        (addCallwrapupInputs[data.accessor] === undefined ||
          addCallwrapupInputs[data.accessor]?.length === 0)
      ) {
        setMultiSelectError("Please select Account");
        validInput = false;
      }
    });
    setError(internalArr);
    if (internalArr.length == 0 && validInput) {
      submitForm();
    }
  };

  const onMultiSelect = (e) => {
    const isSelectAll = e.target.value.some((v) => v.value === "all");
    const isSelectAllSelected = props.addCallwrapupInputs?.accounts?.some(
      (v) => v.value === "all"
    );

    if (isSelectAllSelected && !isSelectAll) {
      const valToSend = {
        target: {
          name: e.target.name,
          value: [],
        },
      };
      props.ADDCALLWRAPUPNOTEINPUTS(valToSend);
    } else if (isSelectAll && !isSelectAllSelected) {
      props.ADDCALLWRAPUPNOTEINPUTS({
        target: {
          name: e.target.name,
          value: formData.find((f) => f.accessor === e.target.name).options
            .optionsData,
        },
      });
    } else {
      const valToSend = {
        target: {
          name: e.target.name,
          value: e.target.value.filter((v) => v.value !== "all"),
        },
      };
      props.ADDCALLWRAPUPNOTEINPUTS(valToSend);
    }
    setMultiSelectError("");
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
        formName="addCallWrapUpForm"
      >
        <AddCallWrapUpForm
          AddCallWrapUpFormData={formData}
          ADDCALLWRAPUPNOTEINPUTS={props.ADDCALLWRAPUPNOTEINPUTS}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          errorValue={errorValue}
          addCallwrapupInputs={addCallwrapupInputs}
          multiSelectError={multiSelectError}
          setMultiSelectError={setMultiSelectError}
          accountID={accountID}
          setAccountID={setAccountID}
          callWrapUpData={props.callWrapUpData}
          onMultiSelect={onMultiSelect}
        />
      </PopUp>
    </>
  );
}

const AddCallWrapUpForm = (props) => {
  ////  Enable callOutcome Based on Call Method selected
  const filterDateFunction = (filtervalue, valuecheck) => {
    return filtervalue?.filter((data) => data.accessor == valuecheck);
  };

  //call outcome method option generate
  if ("callMethod" in props.addCallwrapupInputs) {
    filterDateFunction(props.AddCallWrapUpFormData, "callOutcome").forEach(
      (data) => (data.disabled = false)
    );
  }

  return (
    <form
      id="addCallWrapUpForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate"
    >
      <Grid container>
        {props.AddCallWrapUpFormData?.map((data, index) => {
          return (
            <Grid
              item
              xs={data.xs}
              key={`${data.id}_${index+1}`}
              sx={{ paddingBottom: "10px", paddingRight: "100px" }}
            >
              <div>
                {data.label}{" "}
                {data.required && (
                  <span
                    style={{
                      color: ColorPallete.Border.Tertiary,
                      marginLeft: "-4px",
                    }}
                  >
                    *
                  </span>
                )}
              </div>
              <div>
                <div>
                  {data.type == "select" && (
                    <SelectButton
                      data={data}
                      captureInputs={props.ADDCALLWRAPUPNOTEINPUTS}
                      error={props.errorValue}
                      validateError={validateError}
                      validateHelperText={validateHelperText}
                      defaultValue={props.addCallwrapupInputs[data.accessor]}
                      willReset={true}
                    />
                  )}
                  {data.type == "multiSelect" && (
                    <MultiSelectBox
                      name={data.accessor}
                      options={data.options.optionsData}
                      placeholder={data.placeholder}
                      labelaccessor={data.labelaccessor}
                      valueaccessor={data.valueaccessor}
                      value={props.addCallwrapupInputs[data.accessor]}
                      onChange={props.onMultiSelect}
                      errorMessage={props.multiSelectError}
                    />
                  )}
                </div>

                {data.type == "TextField" && (
                  <TextFieldComp
                    required={true}
                    multiline={true}
                    name={"notes"}
                    placeholder="Add Notes"
                    sx={{
                      color: ColorPallete.Text.Primary,
                      fontFamily: "poppins",
                      fontWeight: "12px",
                      width: "-webkit-fill-available",
                      "& .MuiInputBase-multiline": {
                        border: "none",
                        padding: "0px",
                      },
                      overflow: "auto",
                    }}
                    rows={data.rows}
                    data={data}
                    userInputs={props.addCallwrapupInputs}
                    captureInputs={props.ADDCALLWRAPUPNOTEINPUTS}
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
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
    callWrapUpData: state.StaticDataReducer.callWrapUpData,
    callMethodsData: state.StaticDataReducer.callMethodsData,
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    consumerPhoneData: state.ContactInfoReducer.phoneDataForCallWrapUp,
    currentRecords: state.ConsumerDetailsReducer.currentRecordsForCallWrap,
    addCallwrapupInputs: state.ConsumerDetailsReducer.addCallwrapupInputs,
    spokeToList: state.ConsumerDetailsReducer.spokeToList,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    GETCONSUMERPERSONALINFO: async (responsibleId) => {
      await dispatch(GETCONSUMERPERSONALINFO(responsibleId));
    },
    GETCONSUMERFORCALLWRAPUPNOTE: async (responsibleId) => {
      await dispatch(GETCONSUMERFORCALLWRAPUPNOTE(responsibleId));
    },

    GETSPOKETOLIST: async (responsibleId) => {
      await dispatch(GETSPOKETOLIST(responsibleId));
    },
    GETCALLWRAPUPDATA: async () => {
      await dispatch(GETCALLWRAPUPDATA());
    },
    GETCALLMETHODS: async () => {
      await dispatch(GETCALLMETHODS());
    },
    
    ADDCALLWRAPUPNOTEINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDCALLWRAPUPNOTEINPUTS(name, value));
      if (name === "spokeToName" && value !== ownProps.valCheck.spokeToName) {
        await dispatch(RESETVALONCHANGESPOKETO());
      }
    },
    RESETVALONCHANGESPOKETO: async () => {
      await dispatch(RESETVALONCHANGESPOKETO());
    },
    MULTISELECTCALLWRAPUPNOTEINPUTS: async (event) => {
      const value = event.target.value;
      await dispatch(ADDCALLWRAPUPNOTEINPUTS(value, ""));
    },
    SUBMITFORMCALL: async (responsibleId, reqBody) => {
      await dispatch(SUBMITFORMCALL(responsibleId, reqBody));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCallWrapUpNote);
