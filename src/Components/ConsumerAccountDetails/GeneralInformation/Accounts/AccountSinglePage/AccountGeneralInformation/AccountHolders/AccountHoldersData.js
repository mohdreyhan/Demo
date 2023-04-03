import AccountsIcon from "../../../../../../../../Icons/Accounts.svg";
import { ColorPallete } from "../../../../../../../theme/ColorPallete";
export const ToolbarData = [
    {
      label: <img src={AccountsIcon} />,
      accessor: "icon",
    },
    {
      label: "Account Holders",
      accessor: "accounts",
    }
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
        color: ColorPallete.Text.Primary,
        paddingRight: "24px",
        width: "auto",
        whiteSpace: "nowrap",
      },
    }
  ];

  export const TableHeaders = [
    {
        label: "RELATIONSHIP",
        accessor: "relationshipType",
        operation: [],
        style: {align:"left"}
    },
    {
        label: "NAME",
        accessor: "name",
        operation: [],
        style: {align:"left"}
    },
    {
      label: "STATUS",
      accessor: "active",
      operation: ["convertBooleanToActiveInActiveWithIcon"],
      style: {align:"left"}
  },
];


export const currentData = [{
    name: "Machael Jones",
    relationshipType: "Primary",
    accountStatus: true,
  },
  {
    name: "Pam Jones",
    relationshipType: "Spouse",
    accountStatus: false,
  },
  {
    name: "Ethel Jones",
    relationshipType: "Dependent",
    accountStatus: false,
  },
  {
    name: "Richard Jones",
    relationshipType: "Dependent",
    accountStatus: false,
  }
];