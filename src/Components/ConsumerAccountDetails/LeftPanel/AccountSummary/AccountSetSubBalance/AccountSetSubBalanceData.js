import AccountsIcon from "../../../../../../Icons/Accounts.svg";
import CloseIcon from "../../../../../../Icons/Close.svg";
import { ColorPallete } from "../../../../../theme/ColorPallete";

export const dialogDataHeader = [
  {
    label: <img src={AccountsIcon} />,
    accessor: "AccountsIcon",
    operation: [],
  },
  {
    //     //Account Set Subbalance
    // Account Balance Subbalance
    // Placement Amount Subbalance
    label: "Account Balance Subbalance",
    accessor: "title",
    operation: [],
  },
  {
    label: <img src={CloseIcon} />,
    accessor: "CloseIcon",
    operation: ["click"],
  },
];

export const dialogDataFooter = [
  {
    label: "Cancel",
    accessor: "cancelButton",
    operation: ["click"],
    type: "button",
    variant: "outlined",
    size: "small",
  },
];

export const dialogStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: "label",
    accessor: "AccountsIcon",
    styles: {
      display: "flex",
    },
  },
  {
    id: 2,
    size: 11,
    component: "label",
    accessor: "title",
    styles: {
      paddingLeft: "5px",
      color: ColorPallete.Text.Primary,
    },
  },
  {
    id: 31,
    size: 0.5,
    component: "label",
    accessor: "CloseIcon",
    styles: {
      cursor: "pointer",
    },
  },
];

export const dialogStructureFooter = [
  {
    id: 1,
    component: "label",
    accessor: "cancelButton",
    type: "button",
  },
];

export const TableHeaders = [
  {
    title: "ACCOUNT",
    property: "accountNumber",
    operation: [],
    style: { align: "left" },
  },
  {
    title: "BALANCE",
    property: "accountBalance",
    operation: ["formatCurrencyAllowZero"],
    style: { align: "right" },
  },
  // {
  //   label: "PRINCIPAL",
  //   accessor: "principal",
  //   operation: ["formatCurrencyAllowZero"],
  //   style: { align: "right" },
  // },
  // {
  //   label: "CLIENT INTEREST",
  //   accessor: "clientInterest",
  //   operation: ["formatCurrencyAllowZero"],
  //   style: { align: "right" },
  // },
  // {
  //     label: "AGENCY INTEREST",
  //     accessor: "agencyInterest",
  //     operation: [""],
  //     style: {align:"right"}
  // },
];
