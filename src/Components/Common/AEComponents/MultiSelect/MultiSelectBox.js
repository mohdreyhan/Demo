import React, { useState, useEffect } from "react";
import makeAnimated from "react-select/animated";
import { components, default as ReactSelect } from "react-select";
import { ArrowDropDownIcon, Box, FormHelperText } from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete.js";
import { extractImagePath } from "../../commonfunctions";


const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input type="checkbox" checked={props.isSelected} />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValue = (props) => props.data.label !== "Select All" && (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);
const MultiValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props}>
      <img src={extractImagePath("clear.png")}></img>
    </components.MultiValueRemove>
  );
};
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDropDownIcon />
    </components.DropdownIndicator>
  );
};
const animatedComponents = makeAnimated();
const MultiSelectBox = (props) => {
  const {
    options,
    onChange,
    clearValues,
    required,
    label,
    value,
    name,
    labelaccessor,
    valueaccessor,
    disabled,
    noOptionsMessage,
    placeholder,
    errorMessage,
    controlStyles
  } = props;
  const [fomattedOptions, setfomattedOptions] = useState(options);
  const getColor = (type, state) => {
    if (state.isFocused && errorMessage) {
      return `2px solid ${ColorPallete.Color.errorColor} !important`;
    } else if (state.isFocused) {
      return `2px solid  ${ColorPallete.Color.Focused} !important`;
    } else if (type === "border") {
      return "1px solid";
    } else if (errorMessage) {
      return ColorPallete.Color.errorColor
    }
    else {
      return "rgba(0, 0, 0, 0.87)";
    }

  };
  const convertToevent = (selectedOptions) => ({
    target: {
      name: name,
      value: selectedOptions,
    },
  });
  useEffect(() => {
    let newResult = options?.map((option) => {
      let formattedOption = {};
      formattedOption.label = option[labelaccessor];
      formattedOption.value = option[valueaccessor];
      return formattedOption;
    });
    setfomattedOptions(newResult);
  }, [options]);

  const styles = {
    container: (base) => ({
      ...base,
      paddingTop: "1.5px",
    }),
    control: (base, state) => ({
      ...base,
      boxSizing: 'border-box',
      color: errorMessage ? ColorPallete.Color.errorColor : "rgba(0, 0, 0, 0.25)",
      border: getColor("border", state),
      borderColor: errorMessage ? ColorPallete.Color.errorColor : "rgba(0, 0, 0, 0.25)",
      background: errorMessage
        ? `${ColorPallete.FormInput.backgroundColor} !important`
        : "",
      boxShadow: errorMessage ? ColorPallete.Color.errorColor : "rgba(0, 0, 0, 0.87)",
      ":hover": {
        borderColor: getColor("borderColor", state),
      },
      ...controlStyles
    }),
    multiValue: () => ({
      display: "flex",
      alignItems: "center",
      background: ColorPallete.AccordionSummary.backgroundColor,
      border: "1px solid #66A9D6",
      borderRadius: "4px",
      gap: "4px",
      padding: "0px 8px",
      margin: "2px",
    }),
    menu: (base) => ({ ...base, zIndex: "3" }),

    multiValueLabel: () => ({
      fontSize: "14px",
      fontWeight: 400,
      color: ColorPallete.Color.Black,
      wordBreak: "break-word",
    }),
    multiValueRemove: () => ({
      cursor: "pointer",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      transition: "all .05s ease",
      color: "rgba(0, 0, 0, 0.54)",
      transform: state.selectProps.menuIsOpen ? "scaleY(-1)" : null,
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    option: (base) => ({
      ...base,
      backgroundColor: ColorPallete.Color.White,
      color: ColorPallete.Color.Black,
      whiteSpace: "nowrap",

      alignItems: "center",
      verticalAlign: "midlle",
      "&:hover": {
        borderRadius: "3px",
        backgroundColor: "#66A9D6",
        color: "#f9f9f9",
      },
      'input[type="checkbox"]': {
        width: "16px",
        height: "16px",
        borderRadius: "0.15em",
        marginRight: "0.5em",
      },
      label: {
        position: "relative",
        top: "-3px",
      },
    }),
  };

  return (
    <>
      <Box component="div" class="label">
        {label} {required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
      </Box>

      <ReactSelect
        options={fomattedOptions}
        isMulti
        closeMenuOnSelect={false}
        name={props.name}
        hideSelectedOptions={false}
        menuPortalTarget={document.body}
        noOptionsMessage={() => {
          return noOptionsMessage || "No Options";
        }}
        components={{
          Option,
          MultiValue,
          MultiValueRemove,
          DropdownIndicator,
          animatedComponents,
        }}
        onChange={(selected) => onChange(convertToevent(selected))}
        isClearable={clearValues}
        value={value}
        styles={styles}
        isDisabled={disabled}
        placeholder={placeholder || "Select"}
      />
      {errorMessage && (
        <>
          <FormHelperText sx={{ color: ColorPallete.Color.errorColor }}>{errorMessage}</FormHelperText>
        </>
      )}
    </>
  );
};

export default MultiSelectBox;