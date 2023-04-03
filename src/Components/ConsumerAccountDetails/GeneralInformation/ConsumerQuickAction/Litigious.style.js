import { makeStyles } from "@oasis/react-core";
import {ColorPallete} from '../../../../theme/ColorPallete';

export default makeStyles(
  {
    consumerDetailslabel:{
      fontFamily: "poppins",
      fontStyle: "regular" ,
      fontWeight: "400 !important",
      fontSize: "12px !important",
      color: ColorPallete.Text.Secondary,
    },
    consumerDetailsAccesor:{
      fontFamily: "poppins",
      fontStyle: "regular" ,
      fontWeight: "400 !important",
      fontSize: "14px !important",
      color: ColorPallete.Color.Black,
    },
    consumerDetailsTitle:{
      fontFamily: "poppins",
      fontStyle: "regular" ,
      fontWeight: "700 !important",
      fontSize: "14px !important",
      color: ColorPallete.Text.Primary,
      marginLeft:"10px",
      marginTop:"10px",
      paddingBottom:"2px"
    }},
  { index: 1 }
);
