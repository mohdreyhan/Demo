import * as React from "react";
import { Grid, TextField, FormControl } from "@oasis/react-core";
import PopUp from "../../../Common/AEComponents/DialogBox/PopUp";
import {
  dialogDataHeader,
  dialogDataFooter,
  AddAlertFormData,
  dialogStructureHeader,
  dialogStructureFooter,
} from "./AddAlert.Data.js";
import { ColorPallete } from "../../../../theme/ColorPallete";
import { connect } from "react-redux";
import { ADDALERT } from "../../../../Actions/StaticData/ActionCreators";
import { ADDALERTINPUTS } from "../../../../Actions/StaticData/Actions";

function AddAlert(props) {
  const formRef = React.useRef();
  const [count, setCount] = React.useState(0);
  const formData = [];
  const [errorText, setErrorText] = React.useState({});
  const [adAlertInputs, setInputs] = React.useState({});
  const [errorValue, setError] = React.useState([null]);

  React.useEffect(() => {
    setInputs(props.addAlertInputs);
  }, [props.addAlertInputs]);

  React.useEffect(() => {
    setError("");
    setCount(0);
  }, [props.showDialog]);

  const handleCount = (e) => {
    setCount(e.target.value.length);
    setError("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let internalArr = [];
    let validInput = true;
    const form = formRef;
 
    adAlertInputs.description=adAlertInputs.description.trim()
    const dublicateData = props.alertData.some(
      (val) => val.description.toLowerCase().trim() === adAlertInputs.description.toLowerCase().trim()
    );
    if (count == 0|| adAlertInputs.description.trim()==="") {
      internalArr.push("description");
      setErrorText({
        fieldName: "description",
        text: "Please enter description",
      });
      validInput = false;
      setError(internalArr);
    } else if (dublicateData) {
      validInput = false;
      setErrorText({
        fieldName: "description",
        text: "Alert already exists.",
      });

      internalArr.push("description");
      setError(internalArr);
    }
    if (validInput) {
      props.ADDALERT(form, adAlertInputs, props.handleDialog, props.showDialog);
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
        formName="addAlertForm"
      >
        <AddAlertForm
          AddAlertFormData={formData}
          ADDALERTINPUTS={props.ADDALERTINPUTS}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          errorValue={errorValue}
          errorText={errorText}
          handleCount={handleCount}
          count={count}
        />
      </PopUp>
    </>
  );
}

const AddAlertForm = (props) => {

 return (
    <form
      id="addAlertForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate"
    >
      <Grid container>
        {AddAlertFormData.map((data) => {
          return (
            <Grid item xs={data.xs} key={`${data.id}_${data.accessor}`} sx={{ paddingBottom: "10px" }}>
              <div>
                {data.label}
                {data.required && (
                  <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>
                )}
              </div>
              <div>
                {data.type == "input" && (
                  <FormControl required={data.required} fullWidth>
                    <TextField
                     autoFocus={true}
                      inputProps={{ maxLength: 50 }}
                      autoComplete="off"
                      name={data.name}
                      placeholder={data.placeholder ?? ""}
                      size={data.size ?? ""}
                      disabled={data.disabled ?? false}
                      onChange={props.ADDALERTINPUTS}
                      onInput={props.handleCount}
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          padding: "6px 8px 5px 8px",
                        },
                        input: {
                          "& ::placeholder": {
                            textOverflow: "ellipsis !important",
                            color: ColorPallete.Text.Secondary,
                          },
                        },
                      }}
                      style={{
                        backgroundColor: data.disabled
                          ? ColorPallete.Button.Tertiary
                          : "",
                        padding: "2px 0px 0px 2px !important",
                      }}
                      error={props.errorValue?.length > 0}
                      helperText={
                        data.required &&
                        props.errorValue?.length > 0 &&
                        props.errorValue?.includes(data.name)
                          ? props.errorText.text
                          : ""
                      }
                    />
                  </FormControl>
                )}
              </div>
              <div>
                <span
                  style={{
                    color: ColorPallete.Text.Secondary,
                    marginTop: "10px",
                  }}
                >
                  {props.count + "/50"}
                </span>
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
    addAlertInputs: state.StaticDataReducer.addAlertInputs,
    alertData: state.StaticDataReducer.alertData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ADDALERTINPUTS: async (event) => {
      const name = event.target.name;
      const value = event.target.value;
      await dispatch(ADDALERTINPUTS(name, value));
    },
    ADDALERT: async (
      form,
      addAlertInputs,
      alertId,
      handleDialog,
      showDialog
    ) => {
      await dispatch(
        ADDALERT(form, addAlertInputs, alertId, handleDialog, showDialog)
      );
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAlert);