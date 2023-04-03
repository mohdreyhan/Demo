import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from "../../../theme/ColorPallete";

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
      fontSize: "16px !important",
      color: ColorPallete.Color.Black,
    },
    
   typographyStyle:
   { fontWeight: "bold", color:"Black", fontSize:"14px",marginLeft:"-8px"  },
  },

  { index: 1 }
);
