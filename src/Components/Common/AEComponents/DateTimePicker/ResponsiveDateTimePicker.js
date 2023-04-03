import * as React from "react";
import { TextField,CalendarTodayOutlinedIcon } from "@oasis/react-core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ColorPallete } from "../../../../theme/ColorPallete";

export default function ResponsiveDateTimePicker(props) {
  const getTimezoneOffset = (val) => val.getTimezoneOffset() * 60000;
  const makeLocalAppearUTC = (valueLocal) => {
    if (valueLocal == null) {
      return null;
    }
    const dateTime = new Date(valueLocal);
    return new Date(dateTime.getTime() + getTimezoneOffset(dateTime));
  };
  const [value, setValue] = React.useState(props.editValues ? makeLocalAppearUTC(props.editValues[props.data.accessor]) : null);

  const minDate = props.data.minDate ? props.data.minDate : new Date("1950-01-01");
  const maxDate = props.data.maxDate ? props.data.maxDate : new Date("2025-12-31");
  const maxDateTime = props.data.maxDateTime ? props.data.maxDateTime : null;

  const handleDatePicker = (newValue, name) => {
    const offset = new Date(newValue).getTimezoneOffset() * 60000;
    const convertedValue = new Date(new Date(newValue) - offset).toISOString();
    setValue(newValue);
    const event = {
      ...event,
      target: {
        name: name,
        value: convertedValue,
      },
    };
    props.captureInputs(event);
  };

  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        PopperProps={{ placement: "right-end" }}
        PaperProps={{
          sx: {
            marginLeft: "-35px",
            boxShadow: "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%) !important",
          },
        }}
        components={{
          OpenPickerIcon: CalendarTodayOutlinedIcon,
        }}
        openTo="year"
        minDate={minDate}
        maxDate={maxDate}
        maxDateTime={maxDateTime}
        views={["year", "month", "day", "hours", "minutes"]}
        //value={value?makeLocalAppearUTC(value):value}
        value={value}
        onChange={(newValue) => {
          handleDatePicker(newValue, props.data.name);
        }}
        inputFormat={props.data.dateFormat ? props.data.dateFormat : "MM/dd/yyyy hh:mm" ?? "MM/dd/yyyy hh:mm"}
        renderInput={(params) => (
          <TextField
            onKeyDown={onKeyDown}
            autoComplete="off"
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: props.data.placeholder
                ? props.data.placeholder
                : "mm/dd/yyyy hh:mm (am/pm)" ?? "mm/dd/yyyy hh:mm (am/pm)",
            }}
            sx={{
              width: "100%",
              svg: { color: ColorPallete.Text.Primary, fontSize: "20px" },
              "& .MuiInputBase-root": {
                paddingRight: "10px",
              },
              "& .MuiOutlinedInput-input": {
                borderRight: `1px solid ${ColorPallete.Border.Primary}`,
                padding: "0px !important",
                margin: "8px 4px 8px 8px",
              },
              "& .MuiButtonBase-root": {
                paddingLeft: "0px !important",
              },
              "& .MuiInputAdornment-root": {
                marginLeft: "0px",
              },
            }}
            error={props.error?.length > 0 ? props.validateError(props.data, props.error) : false}
            helperText={props.error?.length > 0 ? props.validateHelperText(props.data, props.error) : ""}
          />
        )}
      />
    </LocalizationProvider>
  );
}
