import EditIcon from "../../../../../../Icons/Edit.svg";
import CloseIcon from "../../../../../../Icons/Close.svg";

export const dialogDataHeader = [
  {
    label: <img src={EditIcon} />,
    accessor: "EditIcon",
    operation: [],
  },
  {
    label: "Update Consumer Details",
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
    label: "Update",
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
    accessor: "EditIcon",
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
  },
  {
    id: 2,
    component: "label",
    accessor: "updateButton",
    type: "submit",
  },
];

export const EditConsumerFormData = [
  {
    id: "1",
    type: "input",
    accessor: "firstName",
    label: "First Name",
    required: true,
    size: "small",
    xs: 5,
    name: "firstName",
  },
  {
    id: "2",
    type: "input",
    accessor: "middleName",
    label: "Middle Name",
    size: "small",
    xs: 5,
    name: "middleName",
  },
  {
    id: "3",
    type: "input",
    accessor: "lastName",
    label: "Last Name",
    size: "small",
    required: true,
    xs: 5,
    name: "lastName",
  },
  {
    id: "4",
    type: "input",
    accessor: "ssn",
    label: "SSN",
    size: "small",
    disabled: true,
    xs: 5,
    name: "ssn",
  },
  {
    id: "5",
    type: "date",
    accessor: "dateOfBirth",
    label: "DOB",
    size: "small",
    xs: 5,
    name: "dateOfBirth",
  },
  {
    id: "6",
    type: "select",
    accessor: "languageReferenceId",
    label: "Preferred Language",
    size: "small",
    xs: 5,
    placeholder: "Select",
    name: "languageReferenceId",
     options: {
      //optionsData: [
    //   {
    //     label: "Dutch",
    //     accessor: "Dutch",
    //     value: "DUTCH",
    //   },
    //   {
    //     label: "English",
    //     accessor: "English",
    //     value: "ENGLISH",
    //   },
    //   {
    //     label: "French",
    //     accessor: "French",
    //     value: "FRENCH",
    //   },
    //   {
    //     label: "German",
    //     accessor: "German",
    //     value: "GERMAN",
    //   },
    //   {
    //     label: "Italian",
    //     accessor: "Italian",
    //     value: "ITALIAN",
    //   },
    //   {
    //     label: "Latin",
    //     accessor: "Latin",
    //     value: "LATIN",
    //   },
    //   {
    //     label: "Portuguese",
    //     accessor: "Portuguese",
    //     value: "PORTUGUESE",
    //   },
    //   {
    //     label: "Russian",
    //     accessor: "Russian",
    //     value: "RUSSIAN",
    //   },
    //   {
    //     label: "Spanish",
    //     accessor: "Spanish",
    //     value: "SPANISH",
    //   },
    // ]
  },
    required: false,
  },
];
