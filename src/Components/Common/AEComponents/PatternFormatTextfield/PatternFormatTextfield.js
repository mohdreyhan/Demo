import React, { useState } from "react";
import { FormControl, TextField } from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete.js";
import useStyles from "../AEStyle";
import { returnValueOrDefault, validateError, validateHelperText } from "../../commonfunctions.js";
import { PatternFormat } from "react-number-format";

function PatternFormatTextfield(props) {
  const classes = useStyles();
  const [value, setValue] = useState((props.editValues && props.editValues[props.data.accessor] !== null) ? props.editValues[props.data.accessor] : "");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.captureInputs({target:{
      name: event.target.name,
      value: event.target.value
    }});
  }

  return (
    <FormControl required={returnValueOrDefault(props.data?.required, false)} fullWidth>
      <PatternFormat
        value={value}
        autoComplete="off"
        onChange={handleChange}
        name={returnValueOrDefault(props.data?.name, "")}
        disabled={returnValueOrDefault(props.data?.disabled, false)}
        placeholder={returnValueOrDefault(props.data?.placeholder, "")}
        mask={returnValueOrDefault(props.data?.mask, "")}
        format={returnValueOrDefault(props.data?.format, "")}
        customInput={TextField}
        sx={returnValueOrDefault(props.sx, {})}
        className={`${validateError(props.data, props.error) && classes.textErrorField}`}
        style={props.data?.disabled ? { backgroundColor: ColorPallete.Button.Tertiary } : {}}
        error={props.error?.length > 0 ? validateError(props.data, props.error) : false}
        helperText={props.error?.length > 0 ? validateHelperText(props.data, props.error) : ""}
      />
    </FormControl>
  );
}

export default PatternFormatTextfield;
