import { RadioGroup, FormControl, FormControlLabel, Radio, Grid, Box } from '@oasis/react-core';
import useStyles from './BusinessProcessStyles';
import { ColorPallete } from '../../../theme/ColorPallete';

const RadioField = (props) => {
  const {
    name,
    value,
    label,
    onBlur,
    onChange,
    items,
    gridWidth,
    required,
    error,
    errorMsg,
    errorColor,
    text2,
    ...other
  } = props;
  // ...other row,
  const classes = useStyles();
  const noBlur = () => null;
  return (
    <Grid container sx={{ p: 0, mt: 2 }} style={{ width: gridWidth ?? '100%' }}>
      <Grid item xs={12} className={classes.textgrid} style={{ margin: '0px' }}>
        <FormControl>
          <label>
            <div
              style={{ display: 'inline' }}
              dangerouslySetInnerHTML={{
                __html: label?.replace(/href/g, "target='_black' href")
              }}></div>
            {required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
          </label>
          <RadioGroup
            name={name}
            value={value}
            onChange={onChange}
            onBlur={required ? onBlur : noBlur}
            {...other}>
            {items?.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.value}
                control={<Radio classes={{ root: error ? classes.errorColor : '' }} />}
                label={item.name}
                checked={item.value == value ? true : false}
              />
            ))}
          </RadioGroup>
          <Box component="div" className={classes.textinpuHeader}>
            <div
              style={{ display: 'inline' }}
              dangerouslySetInnerHTML={{
                __html: text2?.replace(/href/g, "target='_black' href")
              }}></div>
          </Box>
          {error && (
            <Box component="div" className={classes.textinpuHeader}>
              <span style={{ color: errorColor ?? ColorPallete.Border.Tertiary }}>{errorMsg}</span>
            </Box>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default RadioField;
