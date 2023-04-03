import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from "../../../theme/ColorPallete";

export default makeStyles(
    {
        // textInputFieldCss start
        hiddenBox: {
            display: 'none',
        },
        textinpuHeader: {
            color: `${ColorPallete.Text.Primary}`
        },
        textfields: {
            border: `1px solid ${ColorPallete.Border.Primary}`,
            width: "100%",
            margin: "0px",
            padding: "5px 0px",
            borderRadius: "3px"
        },
        textgrid: {
            padding: "0px",
        },
        errorField: {
            background: `${ColorPallete.FormInput.backgroundColor} !important`,
            border: `1px solid ${ColorPallete.Color.AlertBackground} !important`,
            color: `${ColorPallete.Color.AlertBackground} !important`,
            borderRadius: "3px",
            height:'auto'
        },
        errorColor: {
            color: `${ColorPallete.Color.AlertBackground} !important`,
        },
        readOnlyField: {
            background: `${ColorPallete.Color.LightGrey} !important`,
        },
        // textInputFieldCss end
        flowformbtn: {
            color: "blue",
            cursor: "pointer",
            marginLeft: "20px",
        },
        accordionMain: {
            maxHeight: "25px",
            minHeight: "25px"

        },
        Accordiondetails: {
            maxHeight: "120px",
            overflowY: "scroll",
            overflowX: "hidden"
        },
        selectinputs: {
            width: "100% !important",
            margin: "0px !important",
            padding: "5px 0 !important",
        },
        buttonDiv: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "4px 12px",
            gap: "4px",
            background: `${ColorPallete.Color.White}`,
            border: `1px solid ${ColorPallete.Button.Primary}`,
            borderRadius: "4px",
            height: "29px",
            color: `${ColorPallete.Button.Secondary}`,
            marginRight: "16px",
            cursor: "pointer",
            width: "70px"
        },
        flexDiv2: {
            display: "flex",
            padding: "10px 0px",
            alignSelf: "end",
            width: "50%",
        },
        flexDiv1: {
            display: "flex",
            padding: "0px 0px 0px 5px",
        },

        textinputs: {
            width: "100% !important",
            margin: "0px !important",
            padding: "5px 0 !important",
        },
        primarybuttonDiv: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "4px 12px",
            gap: "4px",
            background: `${ColorPallete.Button.Primary}`,
            border: `1px solid ${ColorPallete.Button.Primary}`,
            borderRadius: "4px",
            height: "29px",
            color: `${ColorPallete.Color.White}`,
            // marginRight: "16px",
            cursor: "pointer",
        },
        tabpanel: {
            maxHeight: "90%",
            minHeight: "90%",
        },
        scrollflow: {
            height: "50vh",
            overflowY: "auto"
        },
        currentHistoryFlowbtns: {
            //marginBottom: "10px",
            textAlign: "right",
            paddingRight: "24px"
        },
        customTblHeader: {
            height: "100%",
            overflow: "auto",
            "& td": {
                cursor: "pointer",
            },
            "& .selected td": {
                background: "var(--aj-primary-color) !important",
                color: "var(--aj-text-white)",
            },
        },
        tableBody: {
            "& tr": {
                "& td": {
                    fontSize: "14px !important",
                },
            },
        },
        statusCls: {
            color: `${ColorPallete.Table.Main}`
        },
        textLabel: {
            fontsize: '12px !important',
            color: `${ColorPallete.Text.Primary}`,
        },
        subContent: {
            fontsize: '10px !important',
            color: `${ColorPallete.Text.Secondary}`,
        }

    },
    { index: 1 }
);
