import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from "../../../theme/ColorPallete";
export default makeStyles({
  textErrorField: {
    "& .MuiOutlinedInput-root": {
      background: `${ColorPallete.FormInput.backgroundColor} !important`,
      border: `${ColorPallete.Color.AlertBackground} !important`,
      color: `${ColorPallete.Color.AlertBackground} !important`,
    },
  },
  errorField: {
    background: `${ColorPallete.FormInput.backgroundColor} !important`,
    border: `${ColorPallete.Color.AlertBackground} !important`,
    color: `${ColorPallete.Color.AlertBackground} !important`,
  },
});
