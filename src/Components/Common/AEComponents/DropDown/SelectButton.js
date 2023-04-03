import * as React from 'react';
import {
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  styled,
  Tooltip,
  tooltipClasses
} from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete.js';
import useStyles from '../AEStyle';
import {
  validateError,
  validateHelperText,
  returnValueOrDefaultNested,
  returnValueOrDefault
} from '../../commonfunctions.js';

function SelectButtonComp(props) {
  const [value, setValue] = React.useState(
    props.editValues && props.editValues[props.data.accessor]
      ? [props?.editValues[props.data?.accessor]]
      : ''
  );
  const [errorMsg, setErrorMsg] = React.useState('');
  const styleClass = useStyles();
  const BootstrapTooltip = styled(({ className, ...data }) => (
    <Tooltip {...data} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: '12px',
      font: 'Poppins'
    }
  }));

  const captureValues = (values) => {
    let target = {};
    props.data.options.optionsData.map((dropDownValue) => {
      if (dropDownValue) {
        target = {
          target: { name: props.data.name, value: values }
        };
      }
    });
    setValue(values);
    props.captureInputs(target);
  };

  React.useEffect(() => {
    if (!props.editValues && props.data?.default) {
      captureValues(props.data?.default);
    }
  }, []);

  React.useEffect(() => {
    if (props.editValues && props.editValues[props.data.accessor]) {
      setValue(props.editValues[props.data.accessor]);
    }
  }, [props.editValues]);

  const handleChange = (event) => {
    const eventRestructure = {
      ...event,
      target: {
        name: props.data.name,
        value: event.target.value
      }
    };
    if (props?.others?.sendIndex) {
      props.captureInputs(eventRestructure, props.others.index);
    } else {
      props.captureInputs(eventRestructure);
    }
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if (props.defaultValue) {
      captureValues(props.defaultValue);
      setValue(props.defaultValue);
    }
    if (props.willReset) {
      setValue(props.defaultValue || '');
    }
    if (props.data.required && props.error?.length > 0) {
      const msg = validateHelperText(props.data, props.error);
      setErrorMsg(msg || '');
    } else if (props.error?.length == 0) {
      setErrorMsg('');
    }
  }, [props.error, props.defaultValue]);

  return (
    <div>
      <FormControl
        fullWidth
        required={returnValueOrDefault(props.data.required, false)}
        sx={{ borderRight: 'none' }}>
        <BootstrapTooltip
          title={returnValueOrDefaultNested([props.data.disabled], [props.data.toolTipMsg], '')}
          sx={{ cursor: 'Pointer' }}>
          <Select
            displayEmpty
            disabled={props.data.disabled}
            value={value}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: '0px',
                  width: '120px !important',
                  maxHeight: props.showSearchMethod ? '220px !important' : '180px !important',
                  maxWidth: '220px !important',
                  overflowX: 'visible !important',
                  boxShadow: "rgb(0 0 0 / 50%) 0px 0px 4px !important",
                  'ul li': {
                    textTransform: 'none !important'
                  }
                }
              }
            }}
            input={<OutlinedInput />}
            renderValue={
              value !== ''
                ? undefined
                : () => (
                    <div
                      style={{
                        color: ColorPallete.Text.Secondary,
                        fontSize: '14px',
                        opacity: 1,
                        fontFamily: 'poppins'
                      }}>
                      {props?.data?.placeholder ?? props.placeholder ?? 'Select'}
                    </div>
                  )
            }
            style={{
              backgroundColor:
                props.data.disabled && !validateError(props.data, props.error)
                  ? ColorPallete.Button.Tertiary
                  : ColorPallete.Color.White
            }}
            sx={{
              ...(props.data.sx ?? {}),
              '& .MuiSelect-icon': {
                borderLeft: `1px solid ${ColorPallete.Border.Primary}`,
                transform: 'unset'
              },
              ...(props.showSearchMethod && {
                '&& .MuiInputBase-input':
                {
                  paddingRight: '0px !important',
                },
                width: '160px !important',
                height: '24px !important',
                marginTop: '4px !important',
                marginBotton: '4px !important',
                textTransform: 'none !important',
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': {
                  border: '0px'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '.MuiOutlinedInput-input': {
                  padding: '5px 6px 6px 5px'
                },
                '& .MuiSelect-icon': {
                  borderLeft: '0px'
                }
              })
            }}
            className={`${validateError(props.data, props.error) && styleClass.errorField}`}
            error={
              props.data.required && props.error?.length > 0
                ? validateError(props.data, props.error)
                : false
            }>
            {props.component == 'address' && props.accessor == 'stateCode' && (
              <MenuItem value="Select">Select</MenuItem>
            )}
            {props.data.options?.optionsData?.map((optionValue, index) => {
              return (
                <MenuItem
                  style={{ textTransform: 'none !important' }}
                  key={`${optionValue?.id}_${index+1}`}
                  value={
                    props.showName
                      ? optionValue.name
                      : optionValue.id ?? optionValue.value ?? optionValue.description
                  }
                  disabled={!!optionValue.disabled}>
                  {optionValue.label ??
                    optionValue.displayName ??
                    optionValue.description ??
                    optionValue.name ??
                    optionValue.source ??
                    optionValue.code ??
                    optionValue.reason}
                </MenuItem>
              );
            })}
          </Select>
        </BootstrapTooltip>
        <FormHelperText
          sx={{ color: ColorPallete.Color.errorColor, ...(props.data.helperStyle ?? {
            fontSize: '12px !important',
            lineHeight: "1.66 !important"
          }) }}>
          {errorMsg}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

const SelectButton = React.memo(SelectButtonComp);
export default SelectButton;
