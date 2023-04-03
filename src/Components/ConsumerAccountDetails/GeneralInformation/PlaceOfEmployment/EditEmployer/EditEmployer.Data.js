
import { IconButton } from "@oasis/react-core";
import CloseIcon from "../../../../../../Icons/Close.svg";
import EditIcon from "../../../../../../Icons/Edit.svg";

export const dialogDataHeader = [
  {
    label: <img src={EditIcon} />,
    accessor: "EditIcon",
    operation: [],
  },
  {
    label: "Update Employer",
    accessor: "title",
    operation: [],
  },
  {
    label: (
      <IconButton style={{ pointer: "cursor" }}>
        <img src={CloseIcon} />
      </IconButton>
    ),
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
    type: "submit",
  },
];

export const EditEmployerInfoData = [
  {
    id: 1,
    type: "radio",
    accessor: "active",
    label: "Employer Type",
    currentLabel: "Employer Type",
    size: "small",
    xs: 6.7,
    required: true,
    name: "active",
    currentXs: 6.7,
    options: {
      optionsData: [
        {
          title: "Current",
          accessor: "Current Employer",
          id: true,
        },
        {
          title: "Historical",
          accessor: "Historical Employer",
          id: false,
        },
      ],
    },
  },
  {
    id: 2,
    type: "input",
    accessor: "companyName",
    label: "Employer Name",
    currentLabel: "Employer Name",
    required: true,
    size: "small",
    xs: 6.7,
    name: "companyName",
    currentXs: 6.7,
  },
  {
    id: 3,
    type: "select",
    accessor: "employmentTypeId",
    label: "Employment Type",
    currentLabel: "Employment Type",
    placeholder: "Select Type",
    size: "small",
    xs: 6.7,
    currentXs: 6.7,
    name: "employmentTypeId",
    required: true,
    options: {},
    optionsLabel: 'description',
    optionsValue: 'id',
    defaultTitle: 'Select Type'
  },
  {
    id: 4,
    type: "input",
    accessor: "address1",
    label: "Address 1",
    currentLabel: "Address 1",
    required: true,
    size: "small",
    xs: 6.7,
    placeholder: "Address line 1",
    name: "address1",
    currentXs: 6.7,
  },
  {
    id: 5,
    type: "input",
    accessor: "address2",
    label: "Address 2",
    currentLabel: "Address 2",
    required: false,
    currentXs: 6.7,
    size: "small",
    xs: 6.7,
    placeholder: "Address line 2",
    name: "address2",
  },
  {
    id: 6,
    type: "select",
    accessor: "stateCode",
    label: "State",
    currentLabel: "State",
    size: "small",
    xs: 6.7,
    placeholder: "Select State",
    name: "stateCode",
    options: {},
    required: true,
    currentXs: 6.7,
    optionsLabel: 'displayName',
    optionsValue: 'id',
    defaultTitle: 'Select State'
  },
  {
    id: 7,
    type: "input",
    accessor: "city",
    label: "City",
    currentLabel: "City",
    required: true,
    currentXs: 6.7,
    size: "small",
    xs: 6.7,
    placeholder: "Select city",
    name: "city",
  },
  {
    id: 8,
    type: "input",
    accessor: "countryCode",
    label: "Country",
    currentLabel: "Country",
    size: "small",
    xs: 6.7,
    placeholder: "Select Country",
    name: "countryCode",
    options: {},
    required: true,
    currentXs: 6.7,
    disabled : true
  },
  {
    id: 9,
    type: "patternInput",
    accessor: "zipCode",
    label: "Zip Code",
    required: true,
    currentXs: 6.7,
    currentLabel: "Zip Code",
    size: "small",
    xs: 6.7,
    placeholder: "Zip code",
    name: "zipCode",
    mask: "",
    format: "######",
    operation: ['formatZipcode'],
  },
  {
    id: 10,
    type: "patternInput",
    accessor: "phoneNumberOne",
    label: "Employer Phone 1",
    currentLabel: "Employer Phone 1",
    size: "small",
    xs: 6.7,
    name: "phoneNumberOne",
    operation: ["formatPhoneNumber"],
    required: true,
    currentXs: 6.7,
    placeholder: "(___) ___-____",
    mask: "_",
    format: "(###) ###-####"
  },
  {
    id: 11,
    type: "patternInput",
    accessor: "phoneNumberTwo",
    label: "Employer Phone 2",
    currentLabel: "Employer Phone 2",
    size: "small",
    xs: 6.7,
    name: "phoneNumberTwo",
    operation: ["formatPhoneNumber"],
    required: false,
    currentXs: 6.7,
    placeholder: "(___) ___-____",
    mask: "_",
    format: "(###) ###-####"
  },
  {
    id: 12,
    type: "input",
    accessor: "employerContact",
    label: "Employer Contact",
    currentLabel: "Employer Contact",
    size: "small",
    xs: 10,
    name: "employerContact",
    operation: [],
    required: true,
    currentXs: 10,
    width: "304px",
  },
  {
    show: "flex",
    id: 13,
    type: "date",
    accessor: "startDate",
    label: "Start & End Date",
    currentLabel: "Start Date",
    size: "small",
    xs: 4,
    currentXs: 6.7,
    name: "startDate",
    operation: ["concat"],
    required: false,
    labelWidth: 12,
    btoh: true,
    openTo: 'year',
    views: ['year', 'month', 'day'],
    allowSameDateSelection: true,
    maxDate: new Date()
  },
  {
    type: "label",
    title: "to",
    xs: 0.65,
    style: {
      alignSelf: "center",
      justifyContent: "center",
      display: "flex",
      paddingTop: "10px"
    },
    dontShowOptional: true,
  },
  {
    id: 14,
    type: "date",
    accessor: "endDate",
    label: "",
    size: "small",
    xs: 4,
    name: "endDate",
    operation: ["concat"],
    disabled: true,
    style: {
      paddingTop: "20px",
    },
    dontShowOptional: true,
    openTo: 'year',
    views: ['year', 'month', 'day'],
    allowSameDateSelection: true,
    maxDate: new Date(),

  },
  {
    id: 15,
    type: "radio",
    accessor: "verified",
    label: "Verified",
    currentLabel: "Verified",
    size: "small",
    xs: 6.7,
    name: "verified",
    required: true,
    default: false,
    currentXs: 6.7,
    options: {
      optionsData: [
        {
          title: "Yes",
          accessor: "Yes",
          id: true,
        },
        {
          title: "No",
          accessor: "No",
          id: false,
        },
      ],
    },
  },  
];
