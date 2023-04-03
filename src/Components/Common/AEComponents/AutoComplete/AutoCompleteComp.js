import * as React from "react";
import { Box, TextField, Autocomplete, Paper } from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete";
import useStyles from "../AEStyle";
import { returnValueOrDefault, validateError, validateHelperText } from "../../commonfunctions.js";

export default function AutoCompleteComp(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(props.editValues ? props.editValues[props.data.accessor] : null);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (props.data?.options?.optionsData && options !== props.data.options.optionsData) {
      setOptions(props.data.options.optionsData); ///Save dropdown options when country is selected
      setValue(null); ///Null the state when country changes
    }
  }, [props.data?.options?.optionsData]);

  React.useEffect(() => {
    let Data = [];
    if (props?.editValues && props?.editValues[props.data.accessor]) {
      if (options?.length > 0) {
        Data = options.filter((option) => option.id == props.editValues[props.data.accessor]);
      }
      setValue(Data[0]);
    }
  }, [options]);

  const handleChange = (event, newValue) => {
    const eventRestructure = {
      ...event,
      target: {
        name: props.data.name,
        value: newValue.id,
      },
    };
    props.captureInputs(eventRestructure);
    setValue(newValue);
  };

  return (
    <div>
      <Autocomplete
        disableClearable={true}
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        noOptionsText={
          <div style={{ padding: "16px" }}>
            <div style={{ fontSize: "14px" }}>
              <b>No State Found</b>
            </div>
          </div>
        }
        autoHighlight
        getOptionLabel={(option) => option.code && option.name}
        renderOption={(propsData, option) => (
          <Box component="li" {...propsData}>
            {option.label ?? option.name}
          </Box>
        )}
        PaperComponent={({ children }) => (
          <Paper
            sx={{
              boxShadow: " 0px 0px 4px rgba(0, 0, 0, 0.5)!important",
              borderRadius: " 8px",
            }}
          >
            {children}
          </Paper>
        )}
        sx={{
          "& .MuiOutlinedInput-input": {
            padding: "0px",
          },
          "& .MuiAutocomplete-input": {
            padding: "0px 0px 0px 0px !important",
          },
          "& .MuiAutocomplete-endAdornment": {
            borderLeft: `1px solid ${ColorPallete.Border.Primary}`,
            transform: "unset",
            marginTop: "2px",
          },
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              input: {
                "&::placeholder": {
                  color: ColorPallete.Text.Secondary,
                  fontSize: "14px ",
                  opacity: 1,
                  fontFamily: "poppins",
                },
              },
            }}
            className={`${
              validateError(props.data, props.error) &&
              classes.textErrorField
            }`}
            {...params}
            placeholder={returnValueOrDefault(props?.data?.placeholder, "Select")}
            error={validateError(props.data, props.error)}
            helperText={validateHelperText(props.data, props.error)}
          />
        )}
      />
    </div>
  );
}
