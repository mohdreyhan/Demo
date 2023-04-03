import CrossIcon from "../../../../../../Icons/CallWrapIcon/Vector.svg";
import { extractImagePath } from '../../../../Common/commonfunctions';

export const dialogDataHeader = [
  {
    label: <img src={CrossIcon} />,
    accessor: "CancelIcon",
    operation: [],
  },
  {
    label: "Remove Assign Attorney",
    accessor: "title",
    operation: [],
  },
  {
    label: <img src={extractImagePath('close.png')}  />,
    accessor: "Close",
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
    label: "Remove",
    accessor: "removeAttorney",
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
    accessor: "Close",
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
    accessor: "removeAttorney",
    type: "button",
    style: {
      color: "red",
    },
  },
];
