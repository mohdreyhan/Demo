import { makeStyles } from "@oasis/react-core";

export default makeStyles(
    {
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
            background: "#FFFFFF",
            border: "1px solid #006FBA",
            borderRadius: "4px",
            height: "29px",
            color: "#003F74",
            marginRight: "16px",
            cursor: "pointer",
            width: "70px"
        },

        textgrid: {
            padding: "0px",
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
            background: "#006FBA",
            border: "1px solid #006FBA",
            borderRadius: "4px",
            height: "29px",
            color: "#FFFFFF",
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
            color: "#4f72b3"
        }
    },
    { index: 1 }
);
