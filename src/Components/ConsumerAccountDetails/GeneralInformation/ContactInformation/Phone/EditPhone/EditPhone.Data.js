import EditIcon from "../../../../../../../Icons/Edit.svg";
import CloseIcon from "../../../../../../../Icons/Close.svg";
export const dialogDataHeader = [
  {
    label: <img src={EditIcon} />,
    accessor: "EditIcon",
    operation: [],
  },
  {
    label: "Update Phone Number",
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
    accessor: "updateButton",
    type: "submit"
  },
];

export const EditPhoneFormData = [
  {
    id: 1,
    type: "patternInput",
    accessor: "number",
    label: "Phone Number ",
    required: true,
    size: "small",
    xs: 6.2,
    placeholder: "(_ _ _) _ _ _ - _ _ _",
    name: "number",
    mask: "_",
    format: "(###) ###-####",
    operation: ["formatPhoneNumber"],
  },
  {
    id: 2,
    type: "select",
    accessor: "type",
    label: "Phone Number Type ",
    size: "small",
    xs: 6.2,
    placeholder: "Phone Number type",
    name: "type",
    options: {optionsData: [
      // {
      //   label: "Cell",
      //   accessor: "Cell",
      //   value: "Cell",
      // },
      // {
      //   label: "Mobile",
      //   accessor: "Mobile",
      //   value: "Mobile",
      // },
      // {
      //   label: "Home",
      //   accessor: "Home",
      //   value: "Home",
      // }
    ],},
    required: true,
  },
  {
    id: 3,
    type: "select",
    accessor: "sourceRefId",
    label: "Source ",
    size: "small",
    xs: 6.2,
    placeholder: "Source",
    name: "sourceRefId",
    // options: {optionsData: [
    //   {
    //     label: "Client",
    //     accessor: "Client",
    //     value: "CLIENT",
    //   },
    //   {
    //     label: "Consumer",
    //     accessor: "Consumer",
    //     value: "CONSUMER",
    //   },
    //   {
    //     label: "Spouse",
    //     accessor: "Spouse",
    //     value: "SPOUSE",
    //   },
    //   {
    //     label: "Co-Maker",
    //     accessor: "Co-Maker",
    //     value: "COMAKER",
    //   },
    //   {
    //     label: "Attorney",
    //     accessor: "Attorney",
    //     value: "ATTORNEY",
    //   },
    //   {
    //     label: "Other",
    //     accessor: "Other",
    //     value: "OTHER",
    //   },
    // ],},
    required: true,
  },
  {
    id: 4,
    type: "select",
    accessor: "status",
    label: "Phone Status ",
    size: "small",
    xs: 10,
    placeholder: "Phone Status",
    name: "status",
    options: {optionsData: [
      {
        label: "Good",
        accessor: "Good",
        value: "GOOD",
      },
      {
        label: "Bad",
        accessor: "Bad",
        value: "BAD",
      },
      {
        label: "Wrong",
        accessor: "Wrong",
        value: "WRONG",
      },
      {
        label: "Unknown",
        accessor: "Unknown",
        value: "UNKNOWN",
      },
      {
        label: "Never Call",
        accessor: "Never Call",
        value: "NEVERCALL",
      },
      
      
    ],},
    required: true,
    width: "282px",
  },
  {
    id: 5,
    type: "radio",
    accessor: "callConsent",
    label: "Call Consent ",
    size: "small",
    xs: 3.1,
    name: "callConsent",
    required: true,
    default: false,
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
    id: 6,
    type: "input",
    accessor: "callConsentDate",
    label: "Call Consent Date ",
    size: "small",
    xs: 6,
    name: "callConsentDate",
    required: false,
    dateFormat: "MM/dd/yyyy",
    placeholder: "mm/dd/yyyy",
    disabled :true,
    width: "141px",
  }, {
    id: 7,
    type: "radio",
    accessor: "smsConsent",
    label: "SMS Consent ",
    size: "small",
    xs: 3.1,
    name: "smsConsent",
    required: true,
    default: false,
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
    id: 8,
    type: "input",
    accessor: "smsConsentDate",
    label: "SMS Consent Date ",
    size: "small",
    xs: 6,
    name: "smsConsentDate",
    required: false,
    dateFormat: "MM/dd/yyyy",
    placeholder: "mm/dd/yyyy",
    disabled :true,
    width: "141px",
  },

  {
   id: 9,
   type: "radio",
   accessor: "preRecordedMessageConsent",
   label: "Pre-Recorded Message Consent",
   size: "small",
   xs: 5.5,
   name: "preRecordedMessageConsent",
   required: true,
   default: null,
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
   type: "input",
   accessor: "preRecordedMessageConsentDate",
   label: "Consent Date",
   size: "small",
   xs: 6,
   name: "preRecordedMessageConsentDate",
   disabled: true,
   required: false,
   dateFormat: "MM/dd/yyyy",
   placeholder: "mm/dd/yyyy",
   width: "141px",
 },
 {
   id: 11,
   type: "radio",
   accessor: "artificialVoiceConsent",
   label: "Artificial Voice Consent",
   size: "small",
   xs: 4.1,
   name: "artificialVoiceConsent",
   required: true,
   default: null,
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
   id: 12,
   type: "input",
   accessor: "artificialVoiceConsentDate",
   label: "Consent Date",
   size: "small",
   xs: 6,
   name: "artificialVoiceConsentDate",
   disabled: true,
   required: false,
   dateFormat: "MM/dd/yyyy",
   placeholder: "mm/dd/yyyy",
   width: "141px",
 },
  {
    id: 13,
    type: "radio",
    accessor: "active",
    label: "Active ",
    size: "small",
    xs: 6.2,
    name: "active",
    required: false,
    default: false,
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
    id: 14,
    type: "radio",
    accessor: "isDefault",
    label: "Primary",
    size: "small",
    xs: 6.2,
    name: "isDefault",
    required: false,
    default: false,
    changeValue : false,
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
  }
];
