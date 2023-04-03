import EditIcon from "../../../../../../../Icons/Edit.svg";
import CloseIcon from "../../../../../../../Icons/Close.svg";
const currentDataTime=new Date();
export const dialogDataHeader = [
  {
    label: <img src={EditIcon} />,
    accessor: "AddIcon",
    operation: [],
  },
  {
    label: "Edit Email Address",
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

export const EditEmailFormData = [
  {
    id: 1,
    type: "input",
    accessor: "emailAddress",
    label: "Email Address",
    required: true,
    size: "small",
    xs: 6.2,
    placeholder: "Email address",
    name: "emailAddress",
    format: "email",
    operation: ["formatEmailAddress"]
  },
  {
    id: 2,
    type: "select",
    accessor: "emailType",
    label: "Email Address Type",
    size: "small",
    xs: 10,
    placeholder: "Email address type",
    name: "emailType",
    options: {},
    required: true,
    width: "282px",
  },
  {
    id: 3,
    type: "radio",
    accessor: "emailConsent",
    label: "Email Consent",
    size: "small",
    xs: 3.1,
    name: "emailConsent",
    required: true,
    options: {
      optionsData: [
        {
          label: "Yes",
          accessor: "Yes",
          value : true
        },
        {
          label: "No",
          accessor: "No",
          value : false
        },
      ],
    },
  },
  {
    id: 4,
    type: "input",
    accessor: "emailConsentDate",
    label: "Email Consent Date",
    size: "small",
    xs: 6,
    name: "emailConsentDate",
    dateFormat: 'MM/dd/yyyy hh:mm a',
    placeholder: 'mm/dd/yyyy',
    disabled :true,
    maxDateTime:currentDataTime,
    width: "141px",
  },
  {
    id: 5,
    type: "radio",
    accessor: "esignConsent",
    label: "E-Sign Consent",
    size: "small",
    xs: 3.1,
    name: "esignConsent",
    required: true,
    options: {
      optionsData: [
        {
          label: "Yes",
          accessor: "Yes",
          value : true
        },
        {
          label: "No",
          accessor: "No",
          value : false
        },
      ],
    },
  },
  {
    id: 6,
    type: "input",
    accessor: "esignConsentDate",
    label: "E-Sign Consent Date",
    size: "small",
    xs: 6,
    name: "esignConsentDate",
    dateFormat: 'MM/dd/yyyy hh:mm a',
    placeholder: 'mm/dd/yyyy',
    disabled :true,
    maxDateTime:currentDataTime,
    width: "141px",
  },
  {
    id: 7,
    type: "select",
    accessor: "emailConsentSourceRefId",
    label: "Source",
    size: "small",
    xs: 6.2,
    placeholder: "Select Source",
    name: "emailConsentSourceRefId",
    // options: {
    //   optionsData: [
    //     {
    //       label: "Client",
    //       accessor: "Client",
    //       value: "CLIENT",
    //     },
    //     {
    //       label: "Consumer",
    //       accessor: "Consumer",
    //       value: "CONSUMER",
    //     },
    //     {
    //       label: "Spouse",
    //       accessor: "Spouse",
    //       value: "SPOUSE",
    //     },
    //     {
    //       label: "Co-Maker",
    //       accessor: "Co-Maker",
    //       value: "COMAKER",
    //     },
    //     {
    //       label: "Attorney",
    //       accessor: "Attorney",
    //       value: "ATTORNEY",
    //     },
    //     {
    //       label: "Other",
    //       accessor: "Other",
    //       value: "OTHER",
    //     },
    //   ],
    // },
    required: true,
  },{
    id: 8,
    type: "radio",
    accessor: "active",
    label: "Active",
    size: "small",
    xs: 6.2,
    name: "active",
    options: {
      optionsData: [
        {
          label: "Yes",
          accessor: "Yes",
          value : true
        },
        {
          label: "No",
          accessor: "No",
          value : false
        },
      ],
    },
  },
  {
    id: 9,
    type: "radio",
    accessor: "isDefault",
    label: "Primary",
    size: "small",
    xs: 6.2,
    name: "isDefault",
    changeValue : false,
    options: {
      optionsData: [
        {
          label: "Yes",
          accessor: "Yes",
          value : true
        },
        {
          label: "No",
          accessor: "No",
          value : false
        },
      ],
    },
  },
];