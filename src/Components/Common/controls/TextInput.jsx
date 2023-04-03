import { TextField, Box } from "@oasis/react-core";
import useStyles from "../../../Styles/WorkflowStyle";
import {ColorPallete} from '../../../theme/ColorPallete';

const TextInput = (props) => {
  const {
    name,
    value,
    label,
    required,
    error = null,
    onChange,
    length,
    ...other
  } = props;
  const classes = useStyles();

  return (
    <>
      <Box component="div" className={classes.heading}>
        {label} {required && <span style={{ color: ColorPallete.Border.Tertiary }}>*</span>}
      </Box>
      <TextField
        InputProps={{
          classes: {
            root: classes.textfields,
            disabled: classes.disabledInput,
          },
          maxLength: { length },
        }}
        // className={classes.textfields}
        // placeholder={label}
        autoComplete="off"
        name={name}
        value={value}
        onChange={onChange}
        {...other}
        {...(error && { error: true, helperText: error })}
      />
    </>
  );
};
export default TextInput;
