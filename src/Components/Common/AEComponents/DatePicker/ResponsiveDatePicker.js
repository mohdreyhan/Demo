import * as React from 'react';
import { TextField, CalendarTodayOutlinedIcon,FormControl,FormHelperText } from '@oasis/react-core';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ColorPallete } from '../../../../theme/ColorPallete';
import useStyles from '../AEStyle';
import {
  convertTimestamptoUSA,
  convertTimetoUTC,
  nestedIfCaseHandle,
  validateError,
  validateHelperText,
  returnValueOrDefaultNested
} from '../../../../Components/Common/commonfunctions.js';

const getMaxDate = (props) => {
  if (props.maxDate) {
    return props.maxDate;
  } else if (props.data?.maxDate) {
    return new Date(convertTimestamptoUSA(props.data?.maxDate));
  } else {
    return new Date('2050-12-31');
  }
};
export default function ResponsiveDatePicker(props) {
  const [value, setValue] = React.useState(
    props.editValues ? convertTimetoUTC(props.editValues[props.data.accessor]) : null
  );
  const [errorMsg, setErrorMsg] = React.useState('');
  const classes = useStyles();
  const minDate = props.data?.minDate
    ? new Date(convertTimestamptoUSA(props.data?.minDate))
    : new Date('1900-01-01');
  const maxDate = getMaxDate(props);

  React.useEffect(() => {
    if (props.error?.length > 0) {
     const msg = validateHelperText(props.data, props.error);
      setErrorMsg(msg || '');
    } else if (props.error?.length == 0) {
      setErrorMsg('');
    }
  }, [props.error]);

  const handleDatePicker = (newValue, name) => {
    setValue(newValue);
    const offset = new Date(newValue).getTimezoneOffset() * 60000;
    const convertedValue = newValue ? new Date(new Date(newValue) - offset).toISOString() : null;
    const events = {
      ...events,
      target: {
        name: name,
        value: convertedValue
      }
    };
    props.captureInputs(events);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <FormControl
        error={returnValueOrDefaultNested(
          [props.error?.length > 0],
          [validateError(props.data, props.error)],
          false
        )}>
      
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disabled={props.data.disabled || false}
        PopperProps={{ placement: 'right-end' }}
        PaperProps={{
          sx: {
            marginLeft: '-35px',
            boxShadow:
              '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)'
          }
        }}
        components={{
          OpenPickerIcon: CalendarTodayOutlinedIcon
        }}
        openTo="year"
        minDate={minDate}
        maxDate={maxDate}
        disableFuture={props.data.disableFuture || false}
        views={['year', 'month', 'day']}
        value={value}
        onChange={(newValue) => {
          handleDatePicker(newValue, props.data.name);
        }}
        allowSameDateSelection={true}
        InputAdornmentProps={{}}
        renderInput={(params) => (
          <TextField
            onKeyDown={onKeyDown}
            autoComplete="off"
            {...params}
            sx={{
              width: '100%',
              svg: { color: ColorPallete.Text.Primary, fontSize: '20px' },
              '& .MuiInputBase-root': {
                paddingRight: '8px',
                backgroundColor: nestedIfCaseHandle(
                  props.data.disabled,
                  ColorPallete.Button.Tertiary,
                  ColorPallete.Color.White
                )
              },
              '& .MuiOutlinedInput-input': {
                borderRight: `1px solid ${ColorPallete.Border.Primary}`,
                padding: '0px !important',
                margin: '8px 4px 8px 8px'
              },
              '& .MuiButtonBase-root': {
                paddingLeft: '0px !important'
              },
              '& .MuiInputAdornment-root': {
                marginLeft: '0px'
              }
            }}
            className={`${validateError(props.data, props.error)  && classes.textErrorField}`}
            error={props.error?.length > 0 ? validateError(props.data, props.error) : false}
            // helperText={props.error?.length > 0 ? props.validateHelperText(props.data, props.error) : ""}
          />
        )}
      />
    </LocalizationProvider>
      <FormHelperText sx={{ color: ColorPallete.Color.errorColor }}>{errorMsg}</FormHelperText>
  </FormControl>
  </>
  );
}
