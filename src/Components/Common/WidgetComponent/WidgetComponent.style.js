import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from "../../../theme/ColorPallete";

export default makeStyles({
    widgetDetailsLabel: {
        fontFamily: "poppins",
        fontStyle: "regular",
        fontWeight: "400 !important",
        fontSize: "12px !important"
    },
    widgetDetailsAccessor: {
        fontFamily: "poppins",
        fontStyle: "regular",
        fontWeight: "400 !important",
        fontSize: "14px !important",
        color: ColorPallete.Color.Black,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
})