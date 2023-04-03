import { FormControl, Checkbox, FormControlLabel, Box, Grid } from '@oasis/react-core';
import useStyles from './BusinessProcessStyles';
import { ColorPallete } from '../../../theme/ColorPallete';
import { nestedIfCaseHandle } from '../commonfunctions';

const returnValueOrDefault = (value, defaultVal) => {
  if (value) {
    return value;
  }
  return defaultVal;
};

const CheckboxField = (props) => {
  const {
    name,
    value,
    label,
    items,
    onChange,
    onBlur,
    gridWidth,
    width,
    required,
    error,
    errorColor,
    errorMsg,
    text2
  } = props;
  const classes = useStyles();
  const noBlur = () => null;
  const setOnBlur = () => {
    let checker = Object.values(value).filter((v) => {
      return nestedIfCaseHandle(v, v, '');
    });
    onBlur({
      target: {
        name: name,
        value: nestedIfCaseHandle(checker.length > 0, value, null)
      }
    });
  };
  const convertToEvent = (nameVal, optionName, checked) => ({
    target: {
      name: nameVal,
      value: { ...value, [optionName]: checked } ?? {}
    }
  });

  const checkValueAndDefaultValue = (allItemValues, itemValue, defaultItemValue) => {
    if (allItemValues) {
      return nestedIfCaseHandle(itemValue, true, false);
    }
    return defaultItemValue;
  };

  return (
    <>
      <Grid
        container
        sx={{ p: 0, mt: 2 }}
        style={{ width: returnValueOrDefault(gridWidth, '100%') }}>
        <Grid item xs={12} className={classes.textgrid} style={{ margin: '0px' }}>
          <FormControl name={name} error={error}>
            <label>
              <div
                style={{ display: 'inline' }}
                dangerouslySetInnerHTML={{
                  __html: label?.replace(/href/g, "target='_black' href")
                }}></div>
              {required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
            </label>
            <Box component="div" style={{ width: returnValueOrDefault(width, '100%') }}>
              {items?.map((item) => {
                return (
                  <FormControlLabel
                    key={`${item.id}_${value[item.name]}`}
                    control={
                      <Checkbox
                        name={item.name}
                        color="primary"
                        checked={value.item}
                        classes={{ root: nestedIfCaseHandle(error, classes.errorColor, '') }}
                        defaultChecked={checkValueAndDefaultValue(
                          value,
                          value[item.name],
                          returnValueOrDefault(item?.isDefault, false)
                        )}
                        onChange={(e) =>
                          onChange(convertToEvent(name, e.target.name, e.target.checked))
                        }
                        onBlur={required ? setOnBlur : noBlur}
                      />
                    }
                    label={item.name}
                    value={item.value}
                  />
                );
              })}
              <Box component="div" className={classes.textinpuHeader}>
                <div
                  style={{ display: 'inline' }}
                  dangerouslySetInnerHTML={{
                    __html: text2?.replace(/href/g, "target='_black' href")
                  }}></div>
              </Box>
              {error ? (
                <Box component="div" className={classes.textinpuHeader}>
                  <span
                    style={{
                      color: returnValueOrDefault(errorColor, ColorPallete.Border.Tertiary)
                    }}>
                    {errorMsg}
                  </span>
                </Box>
              ) : (
                ''
              )}
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default CheckboxField;
