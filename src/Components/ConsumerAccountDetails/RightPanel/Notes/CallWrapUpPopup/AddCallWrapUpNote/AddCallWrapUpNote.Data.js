import AddIcon from "../../../../../../../Icons/AddIcon.svg";
import CloseIcon from "../../../../../../../Icons/Close.svg";
export const dialogDataHeader = [
  {
    label: <img src={AddIcon} />,
    accessor: "AddIcon",
    operation: [],
  },
  {
    label: "Add Call Wrap Up",
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
    label: "Submit",
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
    accessor: "cancelButton",
    type: "button",
  },
  {
    id: 2,
    component: "label",
    accessor: "addButton",
    type: "submit",
  },
];

export const AddCallWrapUpFormData = [
  {
    id: 1,
    type: "select",
    accessor: "spokeToName",
    label: "Spoke To",
    size: "small",
    xs: 9,
    placeholder: "Select Spoke To", // Primary user name
    name: "spokeToName",
    default: false,
    // defaultValue:"Legend John",
    options: {
      optionsData: [
        // {
        //   label: "Legand John",
        //   accessor: "Legand John",
        //   value: "Legand John",
        // },
        // {
        //   label: "Fenwick Bart",
        //   accessor: "Michael Jones",
        //   value: "Michael Jones",
        // },
        // {
        //   label: "Bart Fenwick",
        //   accessor: "Bart Fenwick",
        //   value: "Bart Fenwick",
        // },
        
      ],
    },
    required: true,
  },
  {
    id: 2,
    type: "select",
    accessor: "callMethod",
    label: "Call Method",
    size: "small",
    xs: 6.6,
    placeholder: "Select Call Method",
    name: "callMethod",
    options: {
      optionsData: [
        // {
        //   label: "Inbound Call",
        //   accessor: "Inbound",
        //   value: "Inbound",
        // },
        // {
        //   label: "Outbound Manual Call",
        //   accessor: "Outbound",
        //   value: "Outbound",
        // },
      ],
    },
    required: true,
  },
  {
    id: 3,
    type: "select",
    accessor: "phoneNumber",
    label: "Phone Number",
    operation: ["formatPhoneNumber"],
    size: "small",
    xs: 6.6,
    placeholder: "(___) ___-____",
    name: "phoneNumber",
    options: {
      optionsData: [
        // {
        //   label: "(953) 028-7654",

        //   value: "9530287654",
        // },
        // {
        //   label: "(978) 654-3210",
        //   value: "9786543210",
        // },
      ],
    },
    required: true,
  },
  {
    id: 4,
    type: "select",
    accessor: "callOutcome",
    label: "Call Outcome",
    size: "small",
    xs: 9,
    placeholder: "Select Call Outcome",
    name: "callOutcome",
    disabled: true,
    toolTipMsg:"Call Outcome can only be selected after Call Method is selected",
    options: {
      optionsData: [
      ],
    },
    required: true,
  },
  {
    id: 5,
    type: "multiSelect", // Multi Select
    accessor: "accounts",
    label: "Accounts",
    labelaccessor: "label",
    valueaccessor: "value",
    size: "small",
    xs: 9,
    placeholder: "Select Accounts",
    name: "accounts",
    options: [
      // {
      // value: "2cfcc9f0-5a8a-4ddf-af3e-ef65ac6e80cb",
      //   label: "12312",
      // },
      // {
      //   value: "72104f13-9e08-4503-8a37-bc530ab8c6c3",
      //   label: "12313",
      // },
      // {
      //   value: "82104f13-9e08-4503-8a37-bc530ab8c6c3",
      //   label: "12314",
      // },
      // {
      //   value: "92104f13-9e08-4503-8a37-bc530ab8c6c3",
      //   label: "12315",
      // },
    ],
    required: true,
    disabled: false,
    value: "PropTypes.string",
    allowSelectAll: true,
    allOption: [],
    clearValues: true,
    noOptionsMessage: "No Options Available",
    errorMessage: "ERROR",
  },
  {
    id: 6,
    type: "TextField",
    accessor: "notes",
    label: "Notes",
    size: "large",
    xs: 9,
    placeholder: "Add Notes",
    name: "notes",
    multiline:true,
    length: 4000,
    styles: {
      fontSize: "12px",
      padding:"0px !important"
    },
    rows:"5"
  },
];
