import CrossIcon from "../../../../../../Icons/CallWrapIcon/Vector.svg";
import { extractImagePath } from '../../../../Common/commonfunctions';
import { ColorPallete } from '../../../../../theme/ColorPallete.js';

export const dialogDataHeader = [
  {
    label: <img src={CrossIcon} />,
    accessor: "CancelIcon",
    operation: [],
  },
  {
    label: "Cancel Add New Attorney",
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
    label: "Cancel",
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
    accessor: "cancelWrapup",
    type: "button",
    styles: {
      color: ColorPallete.Color.AlertBackground,
      borderColor:ColorPallete.Color.AlertBackground,
    },
  },
];
