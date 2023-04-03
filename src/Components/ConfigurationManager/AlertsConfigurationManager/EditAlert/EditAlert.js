import * as React from "react";
import { Grid, TextField, FormControl } from "@oasis/react-core";
import PopUp from "../../../Common/AEComponents/DialogBox/PopUp";
import SelectButton from "../../../Common/AEComponents/DropDown/SelectButton.js";
import {
  dialogDataHeader,
  dialogDataFooter,
  EditAlertFormData,
  dialogStructureHeader,
  dialogStructureFooter,
} from "./EditAlert.Data.js";
import { ColorPallete } from "../../../../theme/ColorPallete";
import { connect } from "react-redux";
import { EDITALERT } from "../../../../Actions/StaticData/ActionCreators";

function EditAlert(props) {
  const formRef = React.useRef();
  const formData = [];
 const [tableRowData, setTableRowData] = React.useState({});
  const [count, setCount] = React.useState(1);
  const [errorText, setErrorText] = React.useState({});
  const [errorValue, setError] = React.useState([null]);

  React.useEffect(() => {
    const originalData = props.alertData.filter(
      (value) => value.id == props.tableRowData.id
    );
    originalData[0].active =
      originalData[0].active.props.children[1] == "Active" ? true : false;
    setTableRowData(originalData[0]);
    setCount(originalData[0]?.description?.length);
  }, [props.tableRowData]);


  React.useEffect(() => {
    setError("");
    setCount(null);
  }, [props.showDialog]);

  const handleCount = (e) => {
    setCount(e.target.value.length);
    setError("");
  };

  const handleChange = (event) => {
    const obj = {
      ...tableRowData,

      [event.target.name]: event.target.value,
    };
    setTableRowData(obj);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let internalArr = [];
    let validInput = true;
    const form = formRef;
    tableRowData.description = tableRowData.description.trim();
    let duplicateData = props.alertData.some(
      (val) =>
        val.description.toLowerCase().trim() ===
        tableRowData.description.toLowerCase().trim()
    );
    const originalData = props.alertData.filter(
      (value) => value.id == props.tableRowData.id
    );
    duplicateData =
      duplicateData &&
      tableRowData.description.toLowerCase() !=
        originalData[0].description.toLowerCase();
    setCount(tableRowData.description.trim().length);
    if (count == 0 || tableRowData.description.trim() === "") {
      internalArr.push("description");
      setErrorText({
        fieldName: "description",
        text: "Please enter description",
      });
      validInput = false;
      setError(internalArr);
    } else if (duplicateData) {
      validInput = false;
      setErrorText({
        fieldName: "description",
        text: "Alert already exists.",
      });

      internalArr.push("description");
      setError(internalArr);
    }

    if (validInput) {
      props.EDITALERT(
        form,
        tableRowData,
        props.handleDialog,
        props.showDialog,
        props.responsibleId
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
        formName="editAlertForm"
      >
        <EditAlertForm
          EditAlertFormData={formData}
          handleFormSubmit={handleFormSubmit}
          formRef={formRef}
          handleChange={handleChange}
          tableRowData={tableRowData}
          handleCount={handleCount}
          errorValue={errorValue}
          errorText={errorText}
          count={count}
        />
      </PopUp>
    </>
  );
}

const EditAlertForm = (props) => {
  return (
    <form
      id="editAlertForm"
      onSubmit={(event) => props.handleFormSubmit(event)}
      ref={props.formRef}
      novalidate="novalidate"
    >
      <Grid container>
        {EditAlertFormData.map((data) => {
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
                  <FormControl required={data.required ?? false} fullWidth>
                    <TextField
                      autoComplete="off"
                      name={data.name}
                      autoFocus={true}
                      inputProps={{ maxLength: 50 }}
                      placeholder={data.placeholder}
                      size={data.size ?? ""}
                      disabled={data.disabled ?? false}
                      onChange={props.handleChange}
                      onInput={props.handleCount}
                      value={props.tableRowData[data.accessor]}
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
                    <div>
                      <span
                        style={{
                          color: ColorPallete.Text.Secondary,
                          marginTop: "10px",
                        }}
                      >
                        {props.tableRowData.description?.length
                          ? props.tableRowData.description?.length + "/50"
                          : ""}
                      </span>
                    </div>
                  </FormControl>
                )} 
                {data.type == "select" && (
                  <SelectButton
                    data={data}
                    captureInputs={props.handleChange}
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
    alertData: state.StaticDataReducer.alertData,
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITALERT: async (form, editAlertInputs, handleDialog, showDialog,responsibleId) => {
      await dispatch(
        EDITALERT(form, editAlertInputs, handleDialog, showDialog,responsibleId)
      );
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditAlert);
