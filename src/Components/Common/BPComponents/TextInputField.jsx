import { TextField, Box, Grid } from '@oasis/react-core';
import useStyles from './BusinessProcessStyles';
import { ColorPallete } from '../../../theme/ColorPallete';

const TextInputField = (props) => {
  const {
    label,
    required,
    error = null,
    onChange,
    onBlur,
    length,
    errorMsg,
    width,
    gridWidth,
    errorColor,
    text2,
    ...other
  } = props;

  // ...other props > name,placeholder,value
  const classes = useStyles();
  const noBlur = () => null;
  return (
    <Box className={`${{ ...other }.hidden && classes.hiddenBox}`}>
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
          <Box component="div" style={{ width: width ?? '100%' }}>
            <TextField
              inputProps={{
                classes: {
                  root: `${classes.textfields}`
                },
                maxLength: { length }
              }}
              sx={{
                "& .MuiOutlinedInput-root .MuiInputBase-input": {
                  paddingRight: '8px !important'
                }
              }}
              className={`${error && classes.errorField} ${
                { ...other }.disabled && classes.readOnlyField
              }`}
              autoComplete="off"
              onChange={onChange}
              onBlur={required ? onBlur : noBlur}
              color={error ? 'error' : 'primary'}
              error={error}
              fullWidth
              {...other}
            />
            <Box component="div" className={classes.textinpuHeader}>
              <div
                style={{ display: 'inline' }}
                dangerouslySetInnerHTML={{
                  __html: text2?.replace(/href/g, "target='_black' href")
                }}></div>
            </Box>
            {error ? (
              <Box component="div" className={classes.textinpuHeader}>
                <span style={{ color: errorColor ?? ColorPallete.Border.Tertiary }}>
                  {errorMsg}
                </span>
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default TextInputField;
