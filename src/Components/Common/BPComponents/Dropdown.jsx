import { InputLabel, Box, Grid, MenuItem, FormControl, Select } from '@oasis/react-core';
import * as React from 'react';
import useStyles from './BusinessProcessStyles';
import { ColorPallete } from '../../../theme/ColorPallete';

const Dropdown = ({
  name,
  items,
  value,
  placeholder = null,
  label,
  onChange,
  required,
  onBlur,
  gridWidth,
  error = null,
  errorMsg,
  errorColor,
  formTextAlign,
  width,
  text2,
  ...other
}) => {
  const [selectedOption, setSelectedOption] = React.useState('');
  const handleChange = (event, setSelectedOptions) => {
    setSelectedOptions(event.target.value);
    onChange(event);
  };
  const classes = useStyles();
  const noBlur = () => null;

  return (
    <Grid container sx={{ p: 0, mt: 2 }} style={{ width: gridWidth ?? '100%' }}>
      <Grid item xs={12} className={classes.textgrid} style={{ margin: '0px' }}>
        <Box component="div" className={classes.textinpuHeader}>
          <div
            style={{ display: 'inline' }}
            dangerouslySetInnerHTML={{
              __html: label?.replace(/href/g, "target='_black' href")
            }}></div>
          {required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
        </Box>
      </Grid>

      <Box component="div" style={{ width: width ?? '100%' }}>
        <FormControl
          sx={{
            textAlign: { formTextAlign },
            '& .MuiOutlinedInput-root.Mui-focused': {
              '& fieldset': { borderColor: ColorPallete.Border.Primary }
            },
            '& .MuiOutlinedInput-input': {
              padding: '8.5px 14px'
            }
          }}
          fullWidth
          name={name}

          //error
        >
          <InputLabel>{placeholder}</InputLabel>
          {items && (
            <Select
              name={name}
              value={value ?? selectedOption}
              onChange={(e) => handleChange(e, setSelectedOption)}
              error={error}
              color={error ? 'error' : 'primary'}
              sx={{
                '& .MuiSelect-icon ': {
                  color: `${error ? ColorPallete.Color.AlertBackground : ''}`
                }
              }}
              onBlur={required ? onBlur : noBlur}
              {...other}>
              {items.map((item) => (
                <MenuItem key={item.id} value={item.value} disabled={item.disable}>
                  <div className={classes.textLabel}>{item?.value}</div>
                  <div className={classes.subContent}>{item?.subvalue}</div>
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
        <Box component="div" className={classes.textinpuHeader}>
          <div
            style={{ display: 'inline' }}
            dangerouslySetInnerHTML={{
              __html: text2?.replace(/href/g, "target='_black' href")
            }}></div>
        </Box>
        {error ? (
          <Box component="div" className={classes.textinpuHeader}>
            <span style={{ color: errorColor ?? ColorPallete.Border.Tertiary }}>{errorMsg}</span>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Grid>
  );
};
export default Dropdown;
