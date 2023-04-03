import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from "./theme/ColorPallete";

export default makeStyles(
  {
    MainLayout: {
      // padding: 5,
      backgroundColor: ColorPallete.Border.Panel,
      marginTop: "-89px",
      // marginLeft: "0px",
      marginLeft: "56px",
      overflowY: "scroll",
      height: "calc(100% - 93px)",
      position: "fixed",
      /* height: -webkit-calc(100% - 18px), */
      // width: "100%",
      width: "calc(100% - 56px)",
      padding: "0px 5px 5px 5px",
    },
    leftPanel: {
      "& .arrowIcon": {
        position: "absolute",
        right: "-10px",
        top: "75px",
        borderRadius: "50%",
        color: ColorPallete.Color.Black,
        cursor: "pointer",
        backgroundColor: ColorPallete.Color.White,
        boxShadow:
          "rgb(9 30 66 / 8%) 0px 0px 0px 1px, rgb(9 30 66 / 8%) 0px 2px 4px 1px",
        display: "none",
        width: "30px",
        height: "30px",
        zIndex: "999"
      },
      "&:hover": {
        "& .arrowIcon": {
          display: "block",
        },
      },
    },
    rightPanel: {
      "& .arrowIcon": {
        position: "absolute",
        left: "-10px",
        top: "75px",
        borderRadius: "50%",
        color: ColorPallete.Color.Black,
        cursor: "pointer",
        backgroundColor: ColorPallete.Color.White,
        boxShadow:
          "rgb(9 30 66 / 8%) 0px 0px 0px 1px, rgb(9 30 66 / 8%) 0px 2px 4px 1px",
        display: "none",
        width: "30px",
        height: "30px",
      },
      "&:hover": {
        "& .arrowIcon": {
          display: "block",
        },
      },
    },
    // mainContainer: {
    //   padding: "0 5px 5px 5px",
    //   backgroundColor: "#E5E5E5",
    //   overflowY: "scroll",
    //   height: "calc(100% - 95px)",
    //   position: "absolute",
    //   width: "calc(100% - 56px)",
    // },
  },

  { index: 1 }
);
