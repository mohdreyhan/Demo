import { IconButton } from "@oasis/react-core";
import EditIcon from "../../../../../../../Icons/Edit.svg";
import CloseIcon from "../../../../../../../Icons/Close.svg";

export const dialogDataHeader = [
  {
    label: <img src={EditIcon} />,
    accessor: "AddIcon",
    operation: [],
  },
  {
    label: "Update Address",
    accessor: "title",
    operation: [],
  },
  {
    
    label: <IconButton style={{pointer : "cursor" }} ><img src={CloseIcon} /></IconButton>,
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
    label: "Update",
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
    accessor: "addButton",
    type: "submit"
  },
];

export const EditAddressFormData = [
  {
    id: 1,
    type: "select",
    accessor: "typeId",
    label: "Address Type",
    size: "small",
    xs: 6.2,
    placeholder: "Select address type",
    name: "typeId",
    options: {},
    required: true,
  },
  {
    id: 2,
    type: "input",
    accessor: "address1",
    label: "Address 1",
    required: true,
    size: "small",
    xs: 6.2,
    placeholder: "Address line 1",
    name: "address1",
  },
  {
    id: 3,
    type: "input",
    accessor: "address2",
    label: "Address 2",
    required: false,
    size: "small",
    xs: 6.2,
    placeholder: "Address line 2",
    name: "address2",
  },
  {
    id: 4,
    type: "select",
    accessor: "stateCode",
    label: "State",
    size: "small",
    xs: 6.2,
    placeholder: "Select state",
    name: "stateCode",
    options: {},
    required: true,
  },
  {
    id: 5,
    type: "input",
    accessor: "city",
    label: "City",
    required: true,
    size: "small",
    xs: 6.2,
    placeholder: "Select city",
    name: "city",
  },
  {
    id: 6,
    type: "input",
    accessor: "countryCode",
    label: "Country",
    size: "small",
    xs: 6.2,
    placeholder: "Select a country",
    name: "countryCode",
    options: {},
    required: true,
    disabled : true
  },  
  {
    id: 7,
    type: "patternInput",
    accessor: "zipCode",
    label: "Zip Code",
    required: true,
    size: "small",
    xs: 6.2,
    length: 10,
    placeholder: "Zip code",
    name: "zipCode",
    operation: ["zipCodeFormat"],
    mask: "",
    format: "######"
  },
  {
    id: 8,
    type: "select",
    accessor: "sourceRefId",
    label: "Source",
    size: "small",
    xs: 6.2,
    placeholder: "Select Source",
    name: "sourceRefId",
    options: {},
    required: true,
  },
  {
    id: 9,
    type: "radio",
    accessor: "active",
    label: "Active",
    size: "small",
    xs: 6.2,
    name: "active",
    required: true,
    options: {
      optionsData: [
        {
          label: "Yes",
          accessor: "Yes",
          value: true,
        },
        {
          label: "No",
          accessor: "No",
          value: false,
        },
      ],
    },
  },
  {
    id: 10,
    type: "radio",
    accessor: "isDefault",
    label: "Primary",
    size: "small",
    xs: 6.2,
    name: "isDefault",
    required: true,
    options: {
      optionsData: [
        {
          label: "Yes",
          accessor: "Yes",
          value: true,
        },
        {
          label: "No",
          accessor: "No",
          value: false,
        },
      ],
    },
  },
];
