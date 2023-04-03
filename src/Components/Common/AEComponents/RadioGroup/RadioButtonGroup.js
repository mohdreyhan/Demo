import * as React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText
} from '@oasis/react-core';
import useStyles from './RadioButtonGroup.styles.js';
import { ColorPallete } from '../../../../theme/ColorPallete.js';
import {
  returnValueOrDefaultNested,
  validateError,
  validateHelperText,
} from '../../commonfunctions.js';

export default function RadioButtonGroup(props) {
  const styles = useStyles();
  const [value, setValue] = React.useState(props.editValues ? props.editValues[props.data.accessor] : props.data?.default    );
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    if("defaultData" in props.data) {
      setValue(props.data?.defaultData);
    } else {
      let editData=props.editValues ? props.editValues[props.data.accessor] : props.data?.default
      setValue(editData);
    }
  }, [props.data?.defaultData]);

  React.useEffect(() => {
    if (props.data?.changeValue) {
      setValue(false);
    }
  }, [props.data?.changeValue]);

  const captureValues = () => {
    let target = {};
    props.data.options.optionsData.map((radioButtonValue, index) => {
      if (radioButtonValue.value) {
        target = { target: { name: props.data.name, value: props.data?.default } };
      }
    });
    props.captureInputs(target);
  };

  React.useMemo(() => {
    if (!props.editValues) {
      captureValues();
    }
  }, []);

  React.useMemo(() => {
    if (props.data?.disabled) {
      const eventRestructure = {
        target: {
          name: props.data.name,
          value: value
        }
      };
      props.captureInputs(eventRestructure);
    }
  }, [value]);

  const handleChange = (event) => {
    let radioButtonChangedValue;
    if (event.target.value === 'true') {
      radioButtonChangedValue = true;
    } else if (event.target.value === 'false') {
      radioButtonChangedValue = false;
    } else {
      radioButtonChangedValue = '';
    }
    const eventRestructure = {
      target: {
        name: props.data.name,
        value: radioButtonChangedValue
      }
    };
    props.captureInputs(eventRestructure);
    setValue(radioButtonChangedValue);
  };

  React.useEffect(() => {
    let errorLength = props.error?.length > 0;
    let msg = validateHelperText(props.data, props.error) > 0;

    if (errorLength && msg) {
      setErrorMsg(msg);
    } else {
      setErrorMsg('');
    }
  }, [props.error]);

  return (
    <>
      <FormControl
        sx={{ height: 'unset !important' }}
        error={returnValueOrDefaultNested(
          [props.error?.length > 0],
          [validateError(props.data, props.error)],
          false
        )}>
        <RadioGroup
          row
          value={value}
          onChange={handleChange}
          sx={{
            curosr: 'pointer'
          }}>
          {props.data?.options?.optionsData?.map((optionsValue) => {
            return (
              <FormControlLabel
                key={`${optionsValue.label}_${optionsValue.value}`}
                value={optionsValue.value}
                control={<Radio sx={{ padding: '2px 8px !important' }} />}
                label={
                  optionsValue.disabled && optionsValue.name == props.data.name ? (
                    <span
                      className={returnValueOrDefaultNested(
                        [
                          optionsValue.disabled &&
                            optionsValue.name == props.data.name &&
                            props.data?.toolTipMsg?.length > 0
                        ],
                        [styles.toltip],
                        ''
                      )}>
                      <span
                        className={returnValueOrDefaultNested(
                          [props.data.disabled && optionsValue.name == props.data.name],
                          [styles.tooltiptxt],
                          ''
                        )}>
                        {props.data.toolTipMsg}
                      </span>
                      <span
                        className={returnValueOrDefaultNested(
                          [props.data.disabled && optionsValue.name == props.data.name],
                          [styles.disableText],
                          ''
                        )}>
                         {optionsValue.label}
                      </span>
                    </span>
                  ) : (
                    optionsValue.label
                  )
                }
                error={returnValueOrDefaultNested(
                  [props.error?.length > 0],
                  [validateError(props.data, props.error)],
                  false
                )}
                // title={optionsValue.disabled ? props.data.toolTipMsg : ""}
                sx={{
                  curosr: 'pointer'
                }}
                disabled={returnValueOrDefaultNested(
                  [props.data.disabled && optionsValue.disabled],
                  [optionsValue.disabled],
                  false
                )}
              />
            );
          })}
        </RadioGroup>
        {errorMsg && (
          <FormHelperText sx={{ color: ColorPallete.Color.errorColor }}>{errorMsg}</FormHelperText>
        )}
      </FormControl>
    </>
  );
}
