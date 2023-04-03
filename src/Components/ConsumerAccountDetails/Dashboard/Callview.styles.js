import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from '../../../theme/ColorPallete';

export default makeStyles({
  messageHeading: {
    fontFamily: "Poppins",
    fontSize: "20px !important",
    fontWeight: "700 !important",
    lineHeight: "30px !important",
    letterSpacing: "0em",
    textAlign: "center",
    color: ColorPallete.Text.Primary,
  },
  messageSubheading: {
    fontFamily: "Poppins",
    fontSize: "12px !important",
    fontWeight: "400 !important",
    lineHeight: "18px !important",
    letterSpacing: "0em",
    textAlign: "center",
    color: ColorPallete.Text.Primary,
  },
  searchoffIconStyle: {
    position: "relative",
    width: "100%",
    textAlign: "center",
    fontSize: "65px !important",
    alignItems: "center",
    justifyContent: "center",
  },
  cardDivstyle: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "236px",
    background: ColorPallete.Color.White,
    border: "1px solid #A6A6A6",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "8px",
    margin: "0 0 0 0",
  },
  AppBarStyle: {
  
    height: 'unset !important',
  
    zindex: 'unset !important',
   
  }

});
