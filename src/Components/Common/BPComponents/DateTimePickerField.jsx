import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import useStyles from './BusinessProcessStyles';
import { ColorPallete } from '../../../theme/ColorPallete';
import { Box, Grid, TextField } from '@oasis/react-core';
import { nestedIfCaseHandle } from '../commonfunctions';

const DateTimePickerField = (props) => {
  const {
    name,
    label,
    required,
    gridWidth,
    width,
    size,
    error,
    errorMsg,
    errorColor,
    onBlur,
    readOnly,
    editValues,
    minDate,
    maxDate,
    maxDateTime,
    disableFuture
  } = props;
  const getTimezoneOffset = (v) => v.getTimezoneOffset() * 60000;
  const makeLocalAppearUTC = (input) => {
    if (input) {
      const dateTime = new Date(input);
      return new Date(dateTime.getTime() + getTimezoneOffset(dateTime));
    }
    return null;
  };
  const [value, setValue] = React.useState(
    nestedIfCaseHandle(editValues, makeLocalAppearUTC(editValues[props.data?.accessor]), null)
  );
  const classes = useStyles();

  // date Format
  const views_Date = ['year', 'month', 'day'];
  const inputFormat_Date = 'MM/dd/yyyy';
  const placeholder_Date = 'mm/dd/yyyy';
  // time Format
  const views_Time = ['hours', 'minutes'];
  const inputFormat_Time = 'hh:mm a';
  const placeholder_Time = 'hh:mm (AM/PM)';
  //datetime Format
  const views_DateTime = ['year', 'month', 'day', 'hours', 'minutes'];
  const inputFormat_DateTime = 'MM/dd/yyyy hh:mm a';
  const placeholder_DateTime = 'mm/dd/yyyy hh:mm (AM/PM)';
  const maxDateDefault = new Date(new Date().setFullYear(new Date().getFullYear() + 5));
  const minimumDate = nestedIfCaseHandle(minDate, minDate, '1950-01-01');
  const maximumDate = nestedIfCaseHandle(maxDate, maxDate, maxDateDefault);
  const maximumDateTime = nestedIfCaseHandle(maxDateTime, maxDateTime, maxDateDefault);
  const handleDateTimePicker = (newValue, names) => {
    const offset = new Date(newValue).getTimezoneOffset() * 60000;
    const convertedValue = new Date(new Date(newValue) - offset).toISOString();
    setValue(newValue);
    const event = {
      ...event,
      target: {
        name: names,
        value: convertedValue
      }
    };
    props.captureInputs(event);
  };

  const handleRenderInput = (params, myplaceholder) => {
    return (
      <TextField
        {...params}
        name={name}
        onBlur={onBlur}
        autoComplete="off"
        inputProps={{
          ...params.inputProps,
          placeholder: myplaceholder
        }}
        className={`${error && classes.errorField}`}
        size={nestedIfCaseHandle(size, size, 'small')}
        color={nestedIfCaseHandle(error, 'error', 'primary')}
        error={error}
        sx={{
          width: nestedIfCaseHandle(width, width, '100%'),
          '& .MuiCalendarPicker-root': {
            border: `1px solid ${ColorPallete.Border.Primary}`
          },
          '& .MuiIconButton-root ': {
            color: `${nestedIfCaseHandle(error, ColorPallete.Color.AlertBackground, '')}`
          }
        }}
      />
    );
  };

  const dateTimeFunction = () => {
    if (props.data.type == 'date/time') {
      return (
        <DateTimePicker
          readOnly={readOnly}
          name={name}
          value={value}
          openTo="year"
          showDaysOutsideCurrentMonth
          onChange={(newValue) => {
            handleDateTimePicker(newValue, props.data.name);
          }}
          componentsProps={{ actionBar: { actions: ['clear', 'today', 'cancel', 'accept'] } }}
          minDate={minimumDate && new Date(minimumDate)}
          maxDate={maximumDate && new Date(maximumDate)}
          maxDateTime={maximumDateTime && new Date(maximumDateTime)}
          views={views_DateTime}
          inputFormat={inputFormat_DateTime}
          renderInput={(params) => handleRenderInput(params, placeholder_DateTime)}
        />
      );
    } else if (props.data.type == 'date') {
      return (
        <DatePicker
          allowSameDateSelection={true}
          readOnly={readOnly}
          name={name}
          value={value}
          openTo="year"
          showDaysOutsideCurrentMonth
          onChange={(newValue) => {
            handleDateTimePicker(newValue, props.data.name);
          }}
          componentsProps={{ actionBar: { actions: ['clear', 'today', 'cancel', 'accept'] } }}
          minDate={minimumDate && new Date(minimumDate)}
          maxDate={maximumDate && new Date(maximumDate)}
          disableFuture={disableFuture}
          views={views_Date}
          inputFormat={inputFormat_Date}
          renderInput={(params) => handleRenderInput(params, placeholder_Date)}
        />
      );
    } else if (props.data.type == 'time') {
      return (
        <TimePicker
          readOnly={readOnly}
          name={name}
          value={value}
          onChange={(newValue) => {
            handleDateTimePicker(newValue, name);
          }}
          componentsProps={{ actionBar: { actions: ['clear', 'today', 'cancel', 'accept'] } }}
          views={views_Time}
          inputFormat={inputFormat_Time}
          enderInput={(params) => handleRenderInput(params, placeholder_Time)}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Grid
        container
        sx={{ p: 0, mt: 2 }}
        style={{ width: nestedIfCaseHandle(gridWidth, gridWidth, '100%') }}>
        <Grid item xs={12} className={classes.textgrid} style={{ margin: '0px' }}>
          <Box component="div" className={classes.textinpuHeader}>
            <div
              style={{ display: 'inline' }}
              dangerouslySetInnerHTML={{
                __html: label?.replace(/href/g, "target='_black' href")
              }}></div>
            {required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
          </Box>
          <Box component="div">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {dateTimeFunction()}
            </LocalizationProvider>
            {error ? (
              <Box component="div" className={classes.textinpuHeader}>
                <span
                  style={{
                    color: nestedIfCaseHandle(errorColor, errorColor, ColorPallete.Border.Tertiary)
                  }}>
                  {errorMsg}
                </span>
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DateTimePickerField;
