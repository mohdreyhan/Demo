import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { CalendarTodayOutlinedIcon, Box, TextField , IconButton, makeStyles } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  nestedIfCaseHandle
} from '../../../../Components/Common/commonfunctions.js';

const useStyles = makeStyles((theme)=>({
  calendar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: "4px 6px 4px 8px",
    '& .MuiPickersCalendarHeader-iconButton': {
      color: "red"
    },
    '& .MuiPickersCalendarHeader-switchHeader': {
      fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
    },
    '& .MuiPickersDay-day': {
      minHeight: '20px',
      fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
    },
  },
  daterangepicker:{
    width: "640px",
    height: "360px",
    margin: theme.spacing(2),
  }
}));

function DateRangePickerCalander(props) {
  const {
    startDateValue,
    endDateValue,
    onDateRangeChange,
    handleClearDateRange,
    clearAll
  }  = props;

  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      fontWeightRegular: 400,
    },
    input: {
      display: 'flex',
      fontFamily: 'Poppins',
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      fontWeightRegular: 400,
    },
  });


  const [dateRange, setDateRange] = React.useState([startDateValue, endDateValue]);

  const handleDateRangeChange = (newValue , name) => {
    const [startDate, endDate] = newValue.map(date => date ? date : null);
    setDateRange([startDate,endDate]);
    if (onDateRangeChange) {
      onDateRangeChange([startDate,endDate]);
    }
  };

  React.useEffect(()=>{
    if(clearAll) handleClearDateRange(setDateRange);
  },[clearAll])

  const getMaxDate = (props) => {
    if (props.maxDate) {
      return props.maxDate;
    } else if (props.data?.maxDate) {
      return new Date(props.data?.maxDate);
    } else {
      return new Date('2050-12-31');
    }
  };
  const classes = useStyles();

  const minDate = props.data?.minDate
    ? new Date(props.data?.minDate)
    : new Date('1900-01-01');
  const maxDate = getMaxDate(props);

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        calendars={props?.calendars ?? 2}
        value={dateRange ?? null}
        onChange={handleDateRangeChange}
        allowSameDateSelection={props?.allowSameDateSelection ?? true}
        disableAutoMonthSwitching={props?.disableAutoMonthSwitching ?? false}
        disabled={props?.data?.disabled || false}
        inputFormat={props?.inputFormat ?? 'MM/DD/YYYY'}
        startText={props?.startText ?? ''}
        endText={props?.endText ?? ''}
        mask={props?.mask ?? '__/__/____'}
        maxDate={maxDate ?? null}
        minDate={minDate ?? null}
        PopperProps={{ placement: 'bottom-end', ...props?.PopperProps }}
        PopperComponent={props?.PopperComponent}
        TransitionComponent={props?.TransitionComponent}
        DialogProps={props?.DialogProps}
        onClose={props?.onClose}
        onOpen={props?.onOpen}
        open={props?.open}
        showToolbar={props?.showToolbar ?? false}
        calendarsClassName={props?.calendarsClassName}
        toolbarTitle={props?.toolbarTitle ?? 'Select Dates'}
        clearable={props?.clearable ?? true}
        clearText={props?.clearText ?? 'Clear'}
        PaperProps={{
          sx: {
            marginTop: '12px',
            marginLeft: '-35px',
            boxShadow:
              '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)'
          }
        }}
        disableFuture={props?.data?.disableFuture || false}
        InputAdornmentProps={{}}
        calendarPosition="bottom"
        className={classes.calendar}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField
              // placeholder ="Start" //not working
              onKeyDown={onKeyDown}
              InputProps={{
                placeholder: "Start", // not working
                endAdornment: (
                  <IconButton style={{padding: "0px"}}>
                    <CalendarTodayOutlinedIcon />
                  </IconButton>
                ),
              }}
              autoComplete="off"
              {...startProps}
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
                '&& .MuiInputBase-input':
                {
                  padding: '0px !important',
                },
                '& .MuiButtonBase-root': {
                  paddingLeft: '0px !important'
                },
                '& .MuiInputAdornment-root': {
                  marginLeft: '0px'
                }
              }}
            />
            <Box sx={{ mx: 0.5 }}></Box>
            <TextField
              onKeyDown={onKeyDown}
              autoComplete="off"
              // placeholder ="End" //not working
              InputProps={{
                placeholder: "End", // not working
                endAdornment: (
                  <IconButton style={{padding: "0px"}}>
                    <CalendarTodayOutlinedIcon />
                  </IconButton>
                ),
              }}
              {...endProps}
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
                '&& .MuiInputBase-input':
                {
                  padding: '0px !important',
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
            />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
    </ThemeProvider>
  );
}

export default DateRangePickerCalander;
