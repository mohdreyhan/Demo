import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import useStyles from './BusinessProcessStyles';
import { ColorPallete } from '../../../theme/ColorPallete';
import { Box, Grid, TextField } from '@oasis/react-core';
import { returnValueOrDefault } from '../commonfunctions';

const DatePickerField = (props) => {
  const {
    name,
    value,
    label,
    required,
    onChange,
    gridWidth,
    width,
    minDate,
    maxDate,
    error,
    onBlur,
    size,
    errorMsg,
    errorColor,
    text2
  } = props;
  const classes = useStyles();
  const noBlur = () => null;
  const convertToEvent = (nameVal, values) => {
    if (values) {
      const offset = new Date(values).getTimezoneOffset() * 60000;
      const convertedValue = new Date(new Date(values) - offset).toISOString();
      if (required) {
        onBlur({
          target: {
            name: nameVal,
            value: convertedValue
          }
        });
      }
      return {
        target: {
          name: nameVal,
          value: convertedValue
        }
      };
    } else {
      if (required) {
        onBlur({
          target: {
            name: nameVal,
            value: values
          }
        });
      }
      return {
        target: {
          name: nameVal,
          value: values
        }
      };
    }
  };
  return (
    <>
      <Grid
        container
        sx={{ p: 0, mt: 2 }}
        style={{ width: returnValueOrDefault(gridWidth, '100%') }}>
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
              <DatePicker
                name={name}
                openTo="year"
                showDaysOutsideCurrentMonth
                views={['year', 'month', 'day']}
                value={value}
                //value={'1900-05-01'}
                minDate={minDate && new Date(minDate)}
                maxDate={maxDate && new Date(maxDate)}
                onChange={(date) => onChange(convertToEvent(name, date))}
                componentsProps={{
                  actionBar: { actions: ['clear', 'today', 'cancel', 'accept'] }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={name}
                    onBlur={required ? onBlur : noBlur}
                    autoComplete="off"
                    className={`${error && classes.errorField}`}
                    size={size}
                    color={error ? 'error' : 'primary'}
                    error={error}
                    sx={{
                      width: returnValueOrDefault(width, '100%'),
                      '& .MuiCalendarPicker-root': {
                        border: `1px solid ${ColorPallete.Border.Primary}`
                      },
                      '& .MuiIconButton-root ': {
                        color: `${error ? ColorPallete.Color.AlertBackground : ''}`
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <Box component="div" className={classes.textinpuHeader}>
              <div
                style={{ display: 'inline' }}
                dangerouslySetInnerHTML={{
                  __html: text2?.replace(/href/g, "target='_black' href")
                }}></div>
            </Box>
            {!!error && (
              <Box component="div" className={classes.textinpuHeader}>
                <span
                  style={{ color: returnValueOrDefault(errorColor, ColorPallete.Border.Tertiary) }}>
                  {errorMsg}
                </span>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DatePickerField;
