import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from "../../../../../../../theme/ColorPallete";

export default makeStyles(
    {
        paymentDetailslabel: {
            fontFamily: "poppins",
            fontStyle: "regular",
            fontWeight: "400 !important",
            fontSize: "12px !important",
            color: ColorPallete.Text.Secondary,
        },
        paymentDetailsAccesor: {
            fontFamily: "poppins",
            fontStyle: "regular",
            fontWeight: "400 !important",
            fontSize: "16px !important",
            color: ColorPallete.Color.Black,
        },
    },

    { index: 1 }
);
