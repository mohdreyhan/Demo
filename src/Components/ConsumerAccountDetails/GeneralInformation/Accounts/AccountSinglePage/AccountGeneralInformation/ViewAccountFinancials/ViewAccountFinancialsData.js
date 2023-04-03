import MoreButton from "../../../../../../Common/AEComponents/More/MoreButton";
import DollarIcon from "../../../../../../../../Icons/Dollar.svg"
import { extractImagePath } from "../../../../../../Common/commonfunctions";

export const ToolbarData = [
    {
        label: <img src={DollarIcon} />,
        accessor: "icon"
    },
    {
        label: "Financials",
        accessor: "financials",
    },
    {
        label: <MoreButton handleClick={() => {}} hideToolTip={true}/>,
        accessor: "moreButton",
        operation: ["click"]
    },
]

export const ToolbarStructure = [
    {
        id: 1,
        tag: "div",
        size: 0.5,
        component: "label",
        accessor: "icon",
        styles: {
            alignSelf: "center",
            display: "flex",
            paddingRight: "10px"
        }
    },
    {
        id: 2,
        tag: "div",
        size: 2,
        component: "label",
        accessor: "financials",
        styles: {
            padding: "20px 0px",
            alignSelf: "center",
            display: "flex",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "16px",
            color: "#444444",
            paddingRight: "24px",
            width: "auto",
            whiteSpace: "nowrap",
        },
    },
    {
        id: 3,
        tag: "div",
        size: 1,
        component: "label",
        accessor: "moreButton",
        styles: {
            display: "flex",
            justifyContent: "flex-end",
            alignSelf: "center",
            width: "-webkit-fill-available",
        },
    },
]

export const accountFinancialsData = [
    {
        label: "Balance",
        accessor: "remainingBalance",
        xs: 6,
        operation: ["formatCurrencyAllowZero"]
    },
    {
        label: "Account Age",
        accessor: "accountAge",
        xs: 6
    },
    {
        label: "Interest Rate",
        accessor: "interestRate",
        xs: 6
    },
    {
        label: "Interest Base Amount",
        accessor: "interestBaseAmount",
        operation: ["formatCurrencyAllowZero"],
        xs: 6
    },
    {
        label: "Placement Date",
        accessor: "placementDate",
        operation: ["convertTimestamptoUSA"],
        xs: 6
    },
    {
        label: "Placement Amount",
        accessor: "placementAmount",
        xs: 6,
        operation: ["formatCurrencyAllowZero"],
        labelColor: "#006FBA"
    },
    {
        label: "Contingency Fee",
        accessor: "contingencyFeeScheduleCode",
        xs: 12
    },
]

export const accountFinancialsMockData = [{
    remainingBalance: 1000,
    accountAge: "8 Months",
    contingencyFeeScheduleCode: "FBBRT",
    interestRate: "5.0 %",
    interestBaseAmount: 145,
    placementDate: "2023-02-02T18:30:00.000Z",
    placementAmount: 1000
}]

const getMenuOptions = (icon, label) => {
    return (
        <div style={{ display: "flex" }}>
            <div>
                <img src={icon} />
            </div>
            <div style={{ paddingLeft: "5px", fontWeight: 400 }}>{label}</div>
        </div>
    );
};

export const PositionedMenuEditItems = [
    {
        id: 1,
        label: getMenuOptions(extractImagePath("edit.png"), "Update Financials"),
        parentComponent: "current",
        componentToRender: "editAttorney",
        operation: ["edit"],
        styles: {
            icon: {
                display: "flex",
            },
            text: {
                paddingLeft: "5px",
                fontWeight: 400,
            },
        },
    }
]

export const mockContingencyFeeList = [
    {
        uuid: "abc34-2886fc",
        name: "BRBB - Contingency Fee Added",
        code: "BRBB",
        status: true
    },
    {
        uuid: "afc12-2886fc",
        name: "FBBRT - Default contingency schedule",
        code: "FBBRT",
        status: true
    }
]