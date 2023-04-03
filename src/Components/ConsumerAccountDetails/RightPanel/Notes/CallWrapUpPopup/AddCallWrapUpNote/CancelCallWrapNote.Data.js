import CrossIcon from "../../../../../../../Icons/CallWrapIcon/Vector.svg";
import CloseIcon from "../../../../../../../Icons/Close.svg";
import { ColorPallete } from "../../../../../../theme/ColorPallete";

export const dialogDataHeader = [
  {
    label: <img src={CrossIcon} />,
    accessor: "CancelIcon",
    operation: [],
  },
  {
    label: "Cancel Call Wrap Up",
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
    label: "Go Back",
    accessor: "gobackButton",
    operation: ["click"],
    type: "button",
    variant: "outlined",
    size: "small",
  },
  {
    label: "Cancel Call Wrap Up",
    accessor: "cancelWrapup",
    operation: ["click"],
    type: "button",
    variant: "outlined",
    size: "small",
    color: "error",
  },
];

export const dialogStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: "label",
    accessor: "CancelIcon",
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
    accessor: "gobackButton",
    type: "goback",
  },
  {
    id: 2,
    component: "label",
    accessor: "cancelWrapup",
    type: "button",
    styles: {
      color: ColorPallete.Color.AlertBackground,
      borderColor:ColorPallete.Color.AlertBackground,
    },
  },
];
