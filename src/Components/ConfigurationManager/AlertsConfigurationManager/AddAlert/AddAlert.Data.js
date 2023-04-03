import AddIcon from "../../../../../Icons/AddIcon.svg";
import CloseIcon from "../../../../../Icons/Close.svg";

export const dialogDataHeader = [
  {
    label: <img src={AddIcon} />,
    accessor: "AddIcon",
    operation: [],
  },
  {
    label: "Create New Alert",
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
  {
    label: "Create New Alert",
    accessor: "addButton",
    operation: ["click"],
    type: "button",
    variant: "contained",
    size: "small",
  },
];

export const dialogStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: "label",
    accessor: "AddIcon",
    styles: {
      display: "flex",
    },
  },
  {
    id: 2,
    size: 11,
    component: "label",
    accessor: "title",
    styles : {
      paddingLeft : "5px"
    }
  },
  {
    id: 3,
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
    type: "button"
  },
  {
    id: 2,
    component: "label",
    accessor: "addButton",
    type: "submit"
  },
];

export const AddAlertFormData = [
  {
    id: 1,
    type: "input",
    accessor: "description",
    label: "Description",
    required: true,
    size: "small",
    xs: 12.2,
    placeholder: "Description of Alert",
    name: "description",
  },
  
 
];