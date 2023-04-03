import { makeStyles } from "@oasis/react-core";
import { ColorPallete } from '../theme/ColorPallete';
export default makeStyles(
    {
        hisMainWrapper: { 
            border: "1px solid #A6A6A6",
            borderRadius: "8px",
            marginTop: "10px",
            maxWidth: "99%",
        },
        processName: { fontSize: "16px" },
        version: {
            color: "#6B6B6B",
            fontSize: "12px"
        },
        listIcon: { width: "16px", marginBottom: "-4px" },
        pt: { paddingTop: "5px !important", paddingBottom: "3px !important" },
        status: { float: "right", marginRight: "8px" },
        inprogress: {
            fontSize: "12px !important",
            backgroundColor: "#FDD0B7 !important",
            borderRadius: "4px !important",
            padding: "0px 4px",
            color: "#444444 !important",
            height: "18px !important"
        },
        completed: {
            fontSize: "12px !important",
            backgroundColor: "#DCF9A5 !important",
            borderRadius: "4px !important",
            padding: "0px 8px",
            color: "#444444 !important",
            height: "18px !important"
        },
        cancelled: {
            fontSize: "12px !important",
            backgroundColor: "#F6CACA !important",
            borderRadius: "4px !important",
            padding: "0px 8px",
            color: "#980000 !important",
            height: "18px !important"
        },
        remediate: {
            fontSize: "12px !important",
            backgroundColor: "#F6CACA !important",
            borderRadius: "4px !important",
            padding: "0px 8px",
            color: "#980000 !important",
            height: "18px !important"
        },
        buttonDiv: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "4px 12px",
            gap: "4px",
            background: "#FFFFFF",
            border: "1px solid #006FBA",
            borderRadius: "4px",
            height: "29px",
            color: "#003F74",
            marginRight: "16px",
            cursor: "pointer",
            width: "70px"
        },
        groupName: {
            fontSize: "14px",
            fontWeight: "700",
            color: ColorPallete.Text.Primary,
            marginBottom: "-7px"
        },
        formName: {
            fontSize: "16px",
            fontWeight: "700",
            color: ColorPallete.Color.Black,
            paddingTop:"6px"
        },
        flowRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            maxWidth: "100%",
            wordBreak: "break-word",
            "& item": {
                marginRight: "10px"
            }
        },
        historyRecord: {
            marginBottom: "5px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "5px 0px 5px 16px",
        },
        active_in_process: {
            "&:hover": {
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)"
            }
        },
        cancelBtn: {
            padding: "4px 12px !important",
            color: `${ColorPallete.Color.AlertBackground} !important`,
            border: `1px solid ${ColorPallete.Color.AlertBackground} !important`,
            height: "29px",
            minWidth: "130px !important",
            background: "transparent !important",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif !important",
            fontWeight: "500 !important",
            fontSize: "0.875rem !important",
            lineHeight: "1.75 !important",
            letterSpacing: "0.02857em",
            textTransform: "uppercase !important",
            "&:hover": {
                color: `${ColorPallete.Color.White} !important`,
                backgroundColor: `${ColorPallete.Color.AlertBackground} !important`,
            }
        },
        alert: {
            background: `${ColorPallete.FormInput.backgroundColor}`,
            alignItems: "center",
            padding: "5px 10px 5px 10px !important",
            height: " 43px",
            marginBottom: "10px",
            "&.MuiAlert-action": {
                padding: "8px"
            }
        },
        accessDenied: {
            fontSize: "14px",
            color: ColorPallete.Color.AlertBackground,
            fontWeight: "700",
            paddingTop: '8px',
        },
        accessDeniedButtonLeft: {
            marginTop: "43px",
            position: "inherit",
            float: "left",
            marginRight: "20px"
        },
        accessDeniedButtonRight: {
            marginTop: "43px",
            position: "inherit",
            float: "right",
            //marginRight: "20px"
        },
        hisLoadMore: {
            position: "absolute",
            top: "calc(50% - 4em)",
            left: "calc(50% - 4em)",
        },
        accessDeniedFrequency: {
            fontSize: "14px",
            color: ColorPallete.Text.Primary,
            fontWeight: "700",
            paddingTop: '8px',
        },
    }, { index: 1 })