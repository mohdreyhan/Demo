import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete";

export default makeStyles(
  {
    toltip: {
      position: "relative",
      display: "inline-block",

      "&:hover": {
        "& $tooltiptxt": {
          visibility: "visible",
        },
      },
    },
    tooltiptxt: {
      visibility: "hidden",
      // whiteSpace: "nowrap",
      backgroundColor: ColorPallete.Color.Black,
      color: ColorPallete.Color.White,
      textAlign: "left",
      borderRadius: "8px",
      padding: "8px",
      position: "absolute",
      zIndex: "1",
      top: "100%",
      // left: "-250%",
      marginLeft: "20px",
      boxShadow: "0px -1px 8px rgba(0, 0, 0, 0.25)",
      fontSize: "12px",
      lineHeight: "18px",
      width : "250px"
    },
    disableText:{
      color: `${ColorPallete.Color.DarkGrey} !important`,
    },   
  },

  { index: 1 }
);
