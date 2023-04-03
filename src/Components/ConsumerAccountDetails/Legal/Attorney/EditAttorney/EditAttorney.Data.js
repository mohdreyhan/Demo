import { extractImagePath } from '../../../../Common/commonfunctions';

export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('update.png')} />,
    accessor: 'icon',
    operation: []
  },
  {
    label: 'Update Attorney Information',
    accessor: 'title',
    operation: []
  },
  {
    label: <img src={extractImagePath('close.png')} />,
    accessor: 'CloseIcon',
    type: "showCancel",
    operation: ['click']
  }
];

export const dialogDataFooter = [
  {
    label: 'Cancel',
    accessor: 'cancelButton',
    operation: ['click'],
    type: 'button',
    variant: 'outlined',
    size: 'small',
    disabled: false
  },
  {
    label: 'Update',
    accessor: 'updateButton',
    operation: ['click'],
    type: 'button',
    variant: 'contained',
    size: 'small',
    disabled: false
  }
];

export const dialogStructureHeader = [
  {
    id: 1,
    size: 0.5,
    component: 'label',
    accessor: 'icon',
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
    id: 3,
    size: 0.5,
    component: 'label',
    accessor: 'CloseIcon',
    styles: {
      cursor: 'pointer'
    }
  }
];

export const dialogStructureFooter = [
  {
    id: 1,
    component: 'label',
    accessor: 'cancelButton',
    type: 'button'
  },
  {
    id: 2,
    component: 'label',
    accessor: 'updateButton',
    type: 'submit'
  }
];

export const EditAttorneyData = [
  {
    id: 1,
    type: 'radio',
    accessor: 'hasAnAttorney',
    label: 'Attorney Assigned?',
    size: 'small',
    xs: 6.2,
    name: 'hasAnAttorney',
    required: true,
    default: true,
    disabled: true,
    options: {
      optionsData: [
        {
          label: 'Yes',
          accessor: 'Yes',
          value: true,
          disabled: false
        },
        {
          label: 'No',
          accessor: 'No',
          value: false,
          disabled: false
        }
      ]
    }
  },

  {
    id: 2,
    type: 'input',
    accessor: 'firstName',
    label: 'Attorney First Name',
    size: 'small',
    xs: 6.2,
    placeholder: 'Enter Attorney First Name',
    name: 'firstName'
  },
  {
    id: 3,
    type: 'input',
    accessor: 'lastName',
    label: 'Attorney Last Name',
    size: 'small',
    xs: 6.2,
    placeholder: 'Enter Attorney Last Name',
    name: 'lastName'
  },
  {
    id: 4,
    type: 'input',
    accessor: 'firmName',
    label: 'Firm Name',
    size: 'small',
    xs: 6.2,
    placeholder: 'Enter Firm Name',
    name: 'firmName',
    // operation: ['validateAlphanumeric']
  },
  {
    id: 5,
    type: 'input',
    accessor: 'contactFirstName',
    label: 'Contact First Name',
    size: 'small',
    xs: 6.2,
    placeholder: 'Enter Contact First Name',
    name: 'contactFirstName'
  },
  {
    id: 6,
    type: 'input',
    accessor: 'contactLastName',
    label: 'Contact Last Name',
    size: 'small',
    xs: 6.2,
    placeholder: 'Enter Contact Last Name',
    name: 'contactLastName'
  },
  {
    id: 7,
    type: 'input',
    accessor: 'addressLine1',
    label: 'Address Line 1',
    size: 'small',
    xs: 12,
    placeholder: 'Address Line 1',
    name: 'addressLine1'
  },
  {
    id: 8,
    type: 'input',
    accessor: 'addressLine2',
    label: 'Address Line 2',
    size: 'small',
    xs: 12,
    placeholder: 'Address Line 2',
    name: 'addressLine2'
  },
  {
    id: 9,
    type: 'input',
    accessor: 'city',
    label: 'City',
    size: 'small',
    xs: 4,
    placeholder: 'Enter City',
    name: 'city',
    operation: ['validateAlphaText'],
    style: {
      paddingRight: "15px"
    }
  },
  {
    id: 10,
    type: 'select',
    accessor: 'stateId',
    label: 'State',
    size: 'small',
    xs: 4,
    placeholder: 'Select state',
    name: 'stateId',
    options: {},
    style: {
      paddingRight: "15px"
    }
  },
  {
    id: 11,
    type: 'patternInput',
    accessor: 'zip',
    label: 'Zip Code',
    size: 'small',
    xs: 4,
    placeholder: 'Zip Code',
    name: 'zip',
    operation: ['formatZipcode'],
    sendUserInputs: true,
    mask: '',
    format: '######'
  },
  {
    id: 12,
    type: 'input',
    accessor: 'countryId',
    label: 'Country',
    size: 'small',
    xs: 6.2,
    placeholder: 'Select a country',
    name: 'countryId',
    options: {},
    disabled: true,
    sendUserInputs: true
  },
  {
    id: 13,
    type: 'patternInput',
    accessor: 'mobileNumber',
    label: 'Mobile Number',
    currentLabel: 'Mobile Number',
    size: 'small',
    xs: 6.2,
    name: 'mobileNumber',
    operation: ['formatPhoneNumber'],
    currentXs: 6.2,
    placeholder: '(___) ___-____',
    mask: '_',
    format: '(###) ###-####',
    errorMsg:'Invalid Mobile Number'
    
  },
  {
    id: 14,
    type: 'patternInput',
    accessor: 'officeNumber',
    label: 'Office Number',
    currentLabel: 'OfficeNumber',
    size: 'small',
    xs: 6.2,
    name: 'officeNumber',
    operation: ['formatPhoneNumber'],
    currentXs: 6.2,
    placeholder: '(___) ___-____',
    mask: '_',
    format: '(###) ###-####',
    errorMsg:'Invalid Office Number'
  },
  {
    id: 15,
    type: 'patternInput',
    accessor: 'faxNumber',
    label: 'Fax Number',
    currentLabel: 'FaxNumber',
    size: 'small',
    xs: 6.2,
    name: 'faxNumber',
    operation: ['formatPhoneNumber'],
    currentXs: 6.2,
    placeholder: '(___) ___-____',
    mask: '_',
    format: '(###) ###-####',
    errorMsg:'Invalid Fax Number'
  },
  {
    id: 16,
    type: 'input',
    accessor: 'email',
    label: 'Email Address',
    size: 'small',
    xs: 6.2,
    placeholder: 'Email Address',
    name: 'email',
    format: 'email',
    operation: ['formatEmailAddress']
  },
  {
    id: 17,
    type: 'input',
    accessor: 'barcode',
    label: 'Bar Number',
    size: 'small',
    xs: 6.2,
    placeholder: 'Bar Number',
    name: 'barcode',
    operation: ['validateAlphanumeric']
  }
];
