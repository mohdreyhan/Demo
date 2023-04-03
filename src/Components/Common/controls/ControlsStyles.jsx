import { makeStyles } from "@oasis/react-core";
import {ColorPallete} from '../../../theme/ColorPallete';

export default makeStyles(
  {
    heading: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
      color: ColorPallete.Color.Black,
      marginLeft: "10px",
    },
    textfields: {
      border: "1px solid #A6A6A6",
      borderColor: ColorPallete.Border.Primary,
      borderRadius: "3px",
      height: "32px",
    },
  },
  { index: 1 }
);
