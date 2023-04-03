import { makeStyles } from "@oasis/react-core";
import {ColorPallete} from '../../../../theme/ColorPallete';


export default makeStyles(
  {
    title: {
      fontStyle: "normal",
      fontWeight: "400 !important",
      fontSize: "12px !important",
      color: ColorPallete.Text.Secondary,
      fontFamily: "poppins",
    },
    gridValue: {
      fontFamily: "poppins",
      fontStyle: "normal",
      fontWeight: "400 !important",
      fontSize: "14px !important",
      color: ColorPallete.Border.Grid,
     },
    box: {
     borderRadius: "8px",
     padding: "16px",
     marginBottom: "16px",
     display: 'flex',
     flexDirection: 'column',
     width:'auto',
     gap: '5px',
    backgroundColor:ColorPallete.Color.White,
     },
  },
);
