import AccountsIcon from "../../../../../../../../Icons/Accounts.svg";
import MoreButton from "../../../../../../Common/AEComponents/More/MoreButton";

export const ToolbarData = [
    {
      label: <img src={AccountsIcon} />,
      accessor: "icon",
    },
    {
      label: "Account Details",
      accessor: "accounts",
    },
    {
      label: <MoreButton handleClick={() => {}}/>,
      accessor: "moreButton",
    },
  ];
  
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
      },
    },
    {
      id: 2,
      tag: "div",
      size: 2,
      component: "label",
      accessor: "accounts",
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
  ];

  export const accountDemoData = [
    {
      label: "Account No.",
      accessor: "accountNumber",
      xs: 4
    },
    {
      label: "Status",
      accessor: "accountStatus",
      operation: ["convertBooleanToActiveInActive"],
      xs: 4
    },
    {
      label: "Relationship",
      accessor: "relationshipType",
      xs: 4
    },
    {
      label: "Client Name",
      accessor: "clientName",
      xs: 4
    },
    {
      label: "Creditor",
      accessor: "creditorName",
      xs: 4
    },
    {
      label: "LOB",
      accessor: "lineOfBusiness",
      xs: 4
    },
    {
      label: "Service Date",
      accessor: "serviceDate",
      operation: ["convertTimestamptoUSA"],
      xs: 4
    },
    {
      label: "Delinquency Date",
      accessor: "deliquencyDate",
      operation: ["convertTimestamptoUSA"],
      xs: 4
    },
    {
      label: "Charge Off Date",
      accessor: "chargeOffDate",
      operation: ["convertTimestamptoUSA"],
      xs: 4
    },
    {
      label: "Itemization Date",
      accessor: "itemizationDate",
      operation: ["convertTimestamptoUSA"],
      xs: 12
    },
  ];
  
  export const accountData = [{
    accountNumber: 38007,
    accountStatus: "Inactive",
    relationshipType: "Secondary",
    balance: null,
    accountAge: 405,
    clientname: "FirstName LastName",
    creditor: "FirstName LastName",
    lineOfBusiness: "credit Card",
    placementDate: "10/12/2021",
    placementAmount: "$40,081.66",
    serviceDate: null,
    delinquencyDate: null,
    chargeOffDate: null
  }];