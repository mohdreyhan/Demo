import { Grid } from "@oasis/react-core";
import useStyles from "../../Styles/WorkflowStyle";
import Controls from "../Common/controls/index";
import { FormLayout } from "../formlayout";
import { tmpForm } from "./WorkflowForm";

const messageValues = {
  type: "",
  content: "",
};

const WorkflowFormSubmit = (props) => {
  const { formCancelAction } = props;
  const workflowFormTempData = tmpForm;
  const classes = useStyles();
  const { values, handlePropertyChange, errors, setErrors} =
    FormLayout([{}]);

  const getObjValue = (type, property) => {
    if (type === "values") {
      return values[property];
    } else if (type === "errors") {
      return errors[property];
    }
  };

  const validate = () => {
    let temp = {};
    for (let tmp1 in workflowFormTempData) {
      let tmpName = workflowFormTempData[tmp1]?.name;
      if (workflowFormTempData[tmp1]?.required) {
        temp[tmpName] = values[tmpName]?.length > 0 ? "" : "Field is required";
      }
    }
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((newValue) => newValue == "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate()
  };

  return (
    <div>
      {workflowFormTempData?.map((field) => {
        if (field.type === "input") {
          return (
            <Grid
              container
              sx={{ p: 2 }}
              style={{ width: "60%" }}
              key={field.id}
            >
              <Grid
                item
                xs={field.spacing}
                key={field.id}
                className={classes.textgrid}
                style={{ margin: "5px" }}
              >
                <Controls.TextInput
                  className={classes.textinputs}
                  key={field.id}
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  value={getObjValue("values", field.name)}
                  onChange={handlePropertyChange}
                  error={getObjValue("errors", field.name)}
                  length={field.length}
                />
              </Grid>
            </Grid>
          );
        }
      })}
      <Grid item xs={12}>
        <div className={classes.flexDiv1}>
          <div
            className={classes.buttonDiv}
            onClick={(event) => formCancelAction(event)}
          >
            Cancel
          </div>
          <div
            className={classes.primarybuttonDiv}
            onClick={(event) => handleSubmit(event)}
          >
            Save
          </div>
        </div>
      </Grid>
    </div>
  );
};
export default WorkflowFormSubmit;
