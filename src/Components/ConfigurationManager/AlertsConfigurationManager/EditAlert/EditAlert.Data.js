import EditIcon from "../../../../../Icons/Edit.svg";
import CloseIcon from "../../../../../Icons/Close.svg";

export const dialogDataHeader = [
  {
    label: <img src={EditIcon} />,
    accessor: "AddIcon",
    operation: [],
  },
  {
    label: "Update Alert",
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
    label: "Update Alert",
    accessor: "updateButton",
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
    type: "button"
  },
  {
    id: 2,
    component: "label",
    accessor: "updateButton",
    type: "submit"
  },
];

export const EditAlertFormData = [
  {
   
    id: 1,
    type: "input",
    accessor: "description",
    label: "Alert Description",
    required: true,
    size: "small",
    xs: 12.2,
    placeholder: "Description of Alert",
    name: "description",
  },
  {
    id: 2,
    type: "select",
    accessor: "active",
    label: "Status",
    size: "small",
    xs: 6.2,
    name: "active",
    options: {optionsData: [
      {
        label: "Active",
        accessor: "Active",
        value : true
      },
      {
        label: "Inactive",
        accessor: "Inactive",
        value : false
      },
    ],},
    required: true
  },
  
];