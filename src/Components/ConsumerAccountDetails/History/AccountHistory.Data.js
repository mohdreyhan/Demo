import { FolderOpenIcon, ClearIcon, LinkIcon, LinkOffIcon } from '@oasis/react-core';
import { ColorPallete } from '../../../theme/ColorPallete';
import { extractImagePath, zipCodeFormat } from '../../Common/commonfunctions';

export const ActionHistoryDropdown = {
  id: 1,
  type: 'multiSelect',
  options: [
    {
      label: 'All History',
      value: 'all'
    },
    // {
    //     label: "Call Outcome",
    //     value: "calloutcome",
    // },
    {
      label: 'Channel Communication',
      value: 'CHANNEL_COMMUNICATIONS'
    },
    {
      label: 'Consent',
      value: 'CONSENT'
    },
    {
      label: 'Consumer Verification',
      value: 'CONSUMER_VERIFICATION'
    },
    {
      label: 'Contact Update',
      value: 'CONTACT_UPDATES'
    },
    {
      label: 'Business Process',
      value: 'BUSINESS_PROCESS'
    },
    // {
    //     label: "Payment",
    //     value: "payment"
    // }
    {
      label: 'Match',
      value: 'CONSUMER_MATCHING'
    },
    {
      label: 'Tie',
      value: 'TIE_UNTIE'
    }
  ],

  xs: 12.2,
  label: 'All ',
  placeholder: 'Select All History',
  labelaccessor: 'label',
  valueaccessor: 'value',
  disabled: false,
  value: 'PropTypes.string',
  allowSelectAll: true,
  allOption: [],
  name: 'multi-select',
  clearValues: true,
  noOptionsMessage: 'No Options Available',
  errorMessage: 'ERROR'
};

export const Status = {
  active: 'active',
  inactive: 'inactive',
  pending: 'pending'
};

export const FilterIgnoreKeys = [
  'id',
  'category',
  'recordId',
  'apiResponse',
  'statusCode',
  'isChanged',
  'isDefaultValueChanged',
  'tieTo',
  'surveyFlowId',
  'scheduleId',
  'stepId'
];

export const CardFromSingleAccount = {
  componentIsFrom: 'SingleAccount',
  cards: [
    {
      label: 'Payment',
      value: 'payment'
    }
  ]
};

export const CardFromHomeDefault = {
  componentIsFrom: 'Home',
  cards: [
    {
      label: 'All History',
      value: 'all'
    }
  ]
};

export const dialogPaymentHeader = [
  {
    label: <FolderOpenIcon sx={{ color: ColorPallete.Button.Secondary }} />,
    accessor: 'FolderOpenIcon',
    operation: []
  },
  {
    label: 'Single Payment',
    accessor: 'title',
    operation: []
  },
  {
    label: <ClearIcon />,
    accessor: 'ClearIcon',
    operation: ['click']
  }
];

export const dialogMatchHeader = [
  {
    label: <FolderOpenIcon />,
    accessor: 'FolderOpenIcon',
    operation: []
  },
  {
    label: 'Account Matched',
    accessor: 'title',
    operation: []
  },
  {
    label: <ClearIcon />,
    accessor: 'ClearIcon',
    operation: ['click']
  }
];

export const dialogTieHeader = [
  {
    label: <LinkIcon />,
    accessor: 'LinkIcon',
    operation: []
  },
  {
    label: 'Account Tied',
    accessor: 'title',
    operation: []
  },
  {
    label: <ClearIcon />,
    accessor: 'ClearIcon',
    operation: ['click']
  }
];

export const dialogUnTieHeader = [
  {
    label: <LinkOffIcon />,
    accessor: 'LinkOffIcon',
    operation: []
  },
  {
    label: 'Account Untied',
    accessor: 'title',
    operation: []
  },
  {
    label: <ClearIcon />,
    accessor: 'ClearIcon',
    operation: ['click']
  }
];

export const dialogStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: 'label',
    accessor: 'FolderOpenIcon',
    styles: {
      display: 'flex'
    }
  },
  {
    id: 2,
    size: 11,
    component: 'label',
    accessor: 'title',
    styles: {
      paddingLeft: '5px'
    }
  },
  {
    id: 31,
    size: 0.5,
    component: 'label',
    accessor: 'ClearIcon',
    styles: {
      cursor: 'pointer'
    }
  }
];

export const dialogTieStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: 'label',
    accessor: 'LinkIcon',
    styles: {
      display: 'flex',
      maxWidth: 'fit-content'
    }
  },
  {
    id: 2,
    size: 11,
    component: 'label',
    accessor: 'title',
    styles: {
      paddingLeft: '10px'
    }
  },
  {
    id: 31,
    size: 0.5,
    component: 'label',
    accessor: 'ClearIcon',
    styles: {
      cursor: 'pointer'
    }
  }
];

export const dialogUntieStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: 'label',
    accessor: 'LinkOffIcon',
    styles: {
      display: 'flex',
      maxWidth: 'fit-content'
    }
  },
  {
    id: 2,
    size: 11,
    component: 'label',
    accessor: 'title',
    styles: {
      paddingLeft: '10px'
    }
  },
  {
    id: 31,
    size: 0.5,
    component: 'label',
    accessor: 'ClearIcon',
    styles: {
      cursor: 'pointer'
    }
  }
];

export const dialogBPHeader = [
  {
    label: <img src={extractImagePath('account_tree.png')} />,
    accessor: 'FolderOpenIcon',
    operation: []
  },
  {
    label: 'Account Matched',
    accessor: 'title',
    operation: []
  },
  {
    label: <ClearIcon />,
    accessor: 'ClearIcon',
    operation: ['click']
  }
];

export const dialogPaymentFooter = [
  {
    label: 'Close',
    accessor: 'Close',
    operation: ['click'],
    type: 'button',
    variant: 'outlined',
    size: 'small'
  }
];

export const dialogMatchFooter = [
  {
    label: 'Close',
    accessor: 'Close',
    operation: ['click'],
    type: 'button',
    variant: 'outlined',
    size: 'small'
  }
];

export const dialogStructureFooter = [
  {
    id: 1,
    component: 'label',
    accessor: 'Close',
    type: 'button'
  }
];

export const categoryToContextCodes = {
  CONTACT_UPDATES: 'CONSUMER',
  BUSINESS_PROCESS: 'ACCOUNT_HOLDER',
  CHANNEL_COMMUNICATIONS: 'ACCOUNT_HOLDER',
  CONSUMER_MATCHING: 'CONSUMER',
  CONSUMER_VERIFICATION: 'CONSUMER',
  CONSENT: 'CONSUMER',
  TIE_UNTIE: 'ACCOUNT_HOLDER'
};

export const contactUpdatesTypes = {
  EMAIL_ADDED: { value: 'Email Added', action: 'added', typeName: 'Email' },
  ADDRESS_ADDED: { value: 'Address Added', action: 'added', typeName: 'Address' },
  PHONE_ADDED: { value: 'Phone Added', action: 'added', typeName: 'Phone' },
  EMAIL_UPDATED: { value: 'Email Updated', action: 'update', typeName: 'Email' },
  ADDRESS_UPDATED: { value: 'Address Updated', action: 'update', typeName: 'Address' },
  PHONE_UPDATED: { value: 'Phone Updated', action: 'update', typeName: 'Phone' }
};

export const businessProcessStatuses = {
  BUSINESS_PROCESS_STARTED: {
    status: 'In Progress',
    statusCode: 'pending',
    formStatus: '',
    formStatusCode: '',
    action: 'Business Process Started'
  },
  BUSINESS_PROCESS_COMPLETED: {
    status: 'Completed',
    statusCode: 'active',
    formStatus: '',
    formStatusCode: '',
    action: 'Business Process Completed'
  },
  BUSINESS_PROCESS_CANCELLED: {
    status: 'Cancelled',
    statusCode: 'inactive',
    formStatus: '',
    formStatusCode: '',
    action: 'Business Process Cancelled'
  },
  FORM_STARTED: {
    status: 'In Progress',
    statusCode: 'pending',
    formStatus: 'In Progress',
    formStatusCode: 'pending',
    action: 'Business Process'
  },
  FORM_COMPLETED: {
    status: 'Completed',
    statusCode: 'active',
    formStatus: 'Completed',
    formStatusCode: 'active',
    action: 'Business Process'
  },
  FORM_CANCELLED: {
    status: 'Cancelled',
    statusCode: 'inactive',
    formStatus: 'Cancelled',
    formStatusCode: 'inactive',
    action: 'Business Process'
  }
};

export const BPStatus = {
  IN_PROCESS: { status: 'In Progress', statusCode: 'pending' },
  FINISHED: { status: 'Completed', statusCode: 'active' },
  CANCELLED: { status: 'Cancelled', statusCode: 'inactive' }
};

export const BPFormStatus = {
  IN_PROCESS: { status: 'In Progress', statusCode: 'pending' },
  FINISHED: { status: 'Submitted', statusCode: 'active' },
  CANCELLED: { status: 'Cancelled', statusCode: 'inactive' }
};

export const consumerVerificationStatuses = {
  CONSUMER_VERIFICATION_SKIPPED: { status: 'Skipped', statusCode: 'inactive' },
  CONSUMER_VERIFIED: { status: 'Verified', statusCode: 'active' }
};

export const channelCommunicationType = {
  LETTER_CHANNEL_ACTION: 'Letter',
  EMAIL_CHANNEL_ACTION: 'Email',
  SMS_CHANNEL_ACTION: 'SMS'
};

export const matchAddressSet = (address, divider) => {
  let result = '';
  if (address?.address1) {
    result = result + address?.address1;
  }
  if (address?.address) {
    result = result + address?.address;
  }
  if (address?.address2) {
    result = result + divider + ` ${address?.address2}`;
  }
  if (address?.city) {
    result = result + divider + ` ${address?.city}`;
  }
  if (address?.postalCode) {
    result = result + divider + ` ${address?.postalCode}`;
  }
  if (address?.zipCode) {
    result = result + divider + ` ${address?.zipCode}`;
  }
  if (address?.state) {
    result = result + divider + ` ${address?.state}`;
  }
  if (address?.province) {
    result = result + divider + ` ${address?.province}`;
  }
  if (address?.country) {
    result = result + divider + ` ${address?.country}`;
  }
  return result;
};

export const setEmploymentStartDate = (responseDate) => {
  if (!responseDate) return 'N/A';
  let tmp = responseDate.split('T')[0].split('-');
  return `${tmp[1]}/${tmp[2]}/${tmp[0]}`;
};

export const contactUpdatedKeyTypes = {
  number: 'Phone updated',
  active: 'Active',
  typeName: 'Type',
  isDefault: 'Primary',
  emailAddress: 'Email Updated',
  source: 'Source',
  status: 'Status',
  emailConsentSource: 'Source'
};
export const consentUpdateStatus = {
  CONSENT_ADDED: { status: 'Consent Added', statusCode: 'active' },
  CONSENT_REMOVED: { status: 'Consent Removed', statusCode: 'inactive' },
  CONSENT_UPDATED: { status: 'Consent Updated', statusCode: 'active' }
};

export const typeOfConsentValue = {
  HomePhone: 'Home',
  WorkPhone: 'Work',
  MobilePhone: 'Mobile',
  OtherPhone: 'Other',
  PersonalEmail: 'Personal',
  WorkEmail: 'Work',
  OtherEmail: 'Other'
};

export const consentValue = {
  callConsent: 'Call Consent',
  smsConsent: 'SMS Consent',
  emailConsent: 'Email Consent',
  esignConsent: 'E-sign Consent'
};

export const consumerNameSet = (firstName, middleName, lastName) => {
  let name = '';
  if (firstName) {
    name = firstName;
  }
  if (middleName) {
    name = `${name} ${middleName}`;
  }
  if (lastName) {
    name = `${name} ${lastName}`;
  }
  return name;
};

export const contactUpdateAddressAlign = (addressRec, states, Countries) => {
  let matchStates =
    addressRec?.stateCode && Object.keys(states).length > 0
      ? states?.filter((item) => item.id == addressRec?.stateCode)
      : [];
  let matchCountries =
    addressRec?.countryCode && Object.keys(Countries).length > 0
      ? Countries?.filter((item) => item.id == addressRec?.countryCode)
      : [];
  addressRec = {
    ...addressRec,
    state: matchStates?.[0]?.name ?? '',
    country: matchCountries?.[0]?.name ?? '',
    zipCode: zipCodeFormat(addressRec.zipCode)
  };
  return addressRec;
};
