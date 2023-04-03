import { TextField, Box, Grid } from '@oasis/react-core';
import useStyles from './BusinessProcessStyles';
import { ColorPallete } from '../../../theme/ColorPallete';

const TextAreaField = (props) => {
  const {
    label,
    required,
    error = null,
    onChange,
    length,
    errorMsg,
    width,
    multiline,
    rows,
    gridWidth,
    errorColor,
    onBlur,
    text2,
    ...other
  } = props;

  // ...other props > name,placeholder,value
  const classes = useStyles();
  const noBlur = () => null;
  return (
    <>
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
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused': {
                  '& fieldset': {
                    borderColor: ColorPallete.Border.Primary
                  }
                },
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  border: 'none'
                }
              }}
              inputProps={{
                classes: {
                  root: `${classes.textfields}`
                },
                maxLength: { length }
              }}
              className={`${error && classes.errorField}`}
              autoComplete="off"
              multiline={multiline}
              rows={rows ?? 4}
              //value={value}
              onChange={onChange}
              error={error}
              onBlur={required ? onBlur : noBlur}
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
    </>
  );
};
export default TextAreaField;
