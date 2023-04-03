import AddIcon from "../../../../../Icons/AddIcon.svg";
import CloseIcon from "../../../../../Icons/Close.svg";

export const dialogDataHeader = [
  {
    label: <img src={AddIcon} />,
    accessor: "AddIcon",
    operation: [],
  },
  {
    label: "Create New Call Wrap Up",
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
    label: "Create",
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
    styles: {
      paddingLeft: "5px"
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
    label: " Outcome Description",
    required: true,
    value: "",
    size: "small",
    xs: 12.2,
    placeholder: "Enter Outcome Name",
    name: "description",
  },
  {
    id: 2,
    type:"multiSelect",
    options: 
       [
        {
          label: "Inbound",
          value: true,
        },
        {
          label: "Outbound",
          value: false,
        }
      ],
    
    xs: 12.2,
    label: "Call method",
    placeholder: "Select Call Method",
    labelaccessor: "label",
    valueaccessor: "value",
    required: true,
    disabled: false,
    value: "PropTypes.string",
    allowSelectAll: true,
    allOption: [],
    name: "multi-select",
    clearValues: true,
    noOptionsMessage: "No Options Available",
    errorMessage: "ERROR",
  },
  {
    id: 3,
    type: "radio",
    accessor: "radio",
    label: "Select Status",
    size: "small",
    xs: 12.2,
    name: "radio",
    default: true,
    required: true,
    disabled:true,
    options: {
      optionsData: [
        {
          label: "Active",
          accessor: "Yes",
          value: true,
          disabled:false,
        },
        {
          label: "Inactive",
          accessor: "No",
          value: false,
          disabled:true
        },
      ],
    },
  },
];

