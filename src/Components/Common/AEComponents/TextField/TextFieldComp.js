import React from 'react';
import { FormControl, TextField } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete.js';
import useStyles from '../AEStyle';
import { returnValueOrDefault, validateError, validateHelperText } from '../../commonfunctions.js';

const validateTxtFieldValue = (props) => {
  if (props.editValues) {
    return props.editValues[props.data.accessor];
  } else if (props.userInputs && props.data.accessor in props.userInputs) {
    return props.userInputs[props.data.accessor];
  } else {
    return null;
  }
};

function TextFieldComp(props) {
  const [value, setValue] = React.useState(validateTxtFieldValue(props));
  const classes = useStyles();
  const { others } = props;

  React.useEffect(() => {
    const value = validateTxtFieldValue(props);
    setValue(value);
  }, [props.editValues, props.userInputs]);

  const handleOnChange = (event) => {
    if (others?.sendIndex) {
      props.captureInputs(event, others.index);
    } else {
      props.captureInputs(event);
    }
    setValue(event.target.value)
  };
  return (
    <FormControl required={returnValueOrDefault(props.data.required, false)} fullWidth>
      <TextField
        type={returnValueOrDefault(props.data?.fieldType, 'text')}
        multiline={returnValueOrDefault(props.multiline, false)}
        autoComplete="off"
        onChange={(event) => handleOnChange(event)}
        size={returnValueOrDefault(props.data.size, '')}
        name={returnValueOrDefault(props.data.name, '')}
        disabled={returnValueOrDefault(props.data.disabled, false)}
        placeholder={returnValueOrDefault(props.data.placeholder, '')}
        rows={returnValueOrDefault(props.rows, '1')}
        sx={returnValueOrDefault(props.sx, {})}
        style={props.data.disabled ? { 
          "& .MuiOutlinedInput-root": {
            background: `${ColorPallete.Button.Tertiary} !important`},
        } : {}}
        className={`${validateError(props.data, props.error) && classes.textErrorField}`}
        onKeyPress={props.data.onKeyPress && props.data.onKeyPressFn}
        inputProps={{
          maxLength: returnValueOrDefault(props.data.length, 10000),
          ...returnValueOrDefault(props.data.inputProps, {})
        }}
        value={value}
        error={props.error?.length > 0 ? validateError(props.data, props.error) : false}
        helperText={props.error?.length > 0 ? validateHelperText(props.data, props.error) : ''}
      />
    </FormControl>
  );
}

export default TextFieldComp;
