import { extractImagePath } from '../../../../../Common/commonfunctions';

const defaultMinDate = new Date('1900-01-01');
const defaultMaxDate = new Date('2049-12-31');
const currentDate = new Date();
export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('add.png')} width="18px" />,
    accessor: 'icon',
    operation: []
  },
  {
    label: 'Add Bankruptcy Information',
    accessor: 'title',
    operation: []
  },
  {
    label: <img src={extractImagePath('close.png')} />,
    accessor: 'CloseIcon',
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
    size: 'small'
  },
  {
    label: 'Submit',
    accessor: 'addButton',
    operation: ['click'],
    type: 'button',
    variant: 'contained',
    size: 'small'
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
    accessor: 'addButton',
    type: 'submit'
  }
];

export const BankruptcyInfoFormData = [
  {
    id: 1,
    type: 'radio',
    accessor: 'isBankrupted',
    label: 'Bankrupt?',
    size: 'small',
    xs: 12,
    style: {
      width: '304px'
    },
    name: 'isBankrupted',
    required: true,
    default: true,
    disabled: true,
    options: {
      optionsData: [
        {
          label: 'Yes',
          accessor: 'Yes',
          value: true
        },
        {
          label: 'No',
          accessor: 'No',
          value: false,
          disabled: true
        }
      ]
    }
  },
  {
    id: 2,
    type: 'select',
    accessor: 'bankruptcyTypeId',
    label: 'Bankruptcy Type',
    size: 'small',
    xs: 12,
    placeholder: 'Select Bankruptcy Type',
    name: 'bankruptcyTypeId',
    width: '280px',
    style: {
      marginRight: '16px'
    },
    options: {
      optionsData: []
    }
  },
  {
    id: 3,
    type: 'date',
    accessor: 'fileDate',
    label: 'File Date',
    size: 'small',
    xs: 3.75,
    name: 'fileDate',
    required: false,
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'mm/dd/yyyy',
    style: {
      marginRight: '16px'
    },
    minDate: defaultMinDate,
    maxDate: currentDate
  },
  {
    id: 4,
    type: 'input',
    accessor: 'caseNumber',
    label: 'Case Number',
    size: 'small',
    xs: 3.75,
    name: 'caseNumber',
    placeholder: 'Enter Case Number',

    style: {
      marginRight: '16px'
    }
  },
  {
    id: 5,
    type: 'date',
    accessor: 'verificationDate',
    label: 'Verification Date',
    size: 'small',
    xs: 3,
    name: 'verificationDate',
    required: true,
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'mm/dd/yyyy',
    width: '178px',
    style: {
      marginRight: '16px'
    },

    minDate: defaultMinDate,
    maxDate: currentDate
  }
];

//court Info
export const CourtInfoFormData = [
  {
    id: 1,
    type: 'input',
    accessor: 'name',
    label: 'Name',
    size: 'small',
    xs: 3.75,
    name: 'name',
    placeholder: 'Enter Court Name',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 2,
    type: 'input',
    accessor: 'district',
    label: 'District',
    size: 'small',
    xs: 3.75,
    name: 'district',
    placeholder: 'Enter District',
    style: {
      marginRight: '16px'
    },
  },
  {
    id: 3,
    type: 'input',
    accessor: 'division',
    label: 'Division',
    size: 'small',
    xs: 3,
    placeholder: 'Enter Division ',
    name: 'division',
    width: '178px',
    style: {
      marginRight: '16px'
    },
    options: {
      optionsData: [{}]
    }
  },
  {
    id: 4,
    type: 'input',
    accessor: 'addressLine1',
    label: 'Address Line 1',
    size: 'small',
    xs: 12,
    name: 'addressLine1',
    placeholder: 'Enter Address',
    width: '547px'
  },
  {
    id: 5,
    type: 'input',
    accessor: 'addressLine2',
    label: 'Address Line 2',
    size: 'small',
    xs: 12,
    name: 'addressLine2',
    placeholder: 'Enter Address',
    width: '547px'
  },
  {
    id: 6,
    type: 'input',
    accessor: 'city',
    label: 'City',
    size: 'small',
    xs: 3.75,
    name: 'city',
    placeholder: 'Enter City Name',
    style: {
      marginRight: '16px'
    }
  },

  {
    id: 7,
    type: 'input',
    accessor: 'county',
    label: 'County',
    size: 'small',
    xs: 3.75,
    name: 'county',
    placeholder: 'Enter County',
    options: {},
    style: {
      marginRight: '16px'
    }
    // sendUserInputs: true
  },
  {
    id: 8,
    type: 'select',
    accessor: 'stateId',
    label: 'State',
    size: 'small',
    xs: 3,
    placeholder: 'Select State',
    name: 'stateId',
    width: '178px',
    style: {
      marginRight: '16px'
    },
    options: {
      optionsData: []
    }
  },
  {
    id: 9,
    type: 'patternInput',
    accessor: 'postalCode',
    label: 'Postal Code',
    size: 'small',
    xs: 3.75,
    name: 'postalCode',
    placeholder: 'Enter Postal Code',
    operation: ['formatZipcode'],
    sendUserInputs: true,
    mask: '',
    format: '######',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 10,
    type: 'patternInput',
    accessor: 'phone',
    label: 'Phone/Ext',
    currentLabel: 'Phone/Ext',
    size: 'small',
    xs: 3.75,
    name: 'phone',
    operation: ['formatPhoneNumber'],
    currentXs: 3.75,
    placeholder: '(___) ___-____,_____',
    mask: '_',
    format: '(###) ###-####',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 11,
    type: 'input',
    accessor: 'website',
    label: 'Website',
    size: 'small',
    xs: 3,
    name: 'website',
    placeholder: 'Enter Website ',
    operation:["validateWebsite"],
    width: '178px',
    style: {
      marginRight: '16px'
    }
  }
];

//Trustee
export const TrusteeInfoFormData = [
  {
    id: 1,
    type: 'input',
    accessor: 'firstName',
    label: 'First Name',
    size: 'small',
    xs: 3.75,
    name: 'firstName',
    placeholder: 'Enter First Name',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 2,
    type: 'input',
    accessor: 'lastName',
    label: 'Last Name',
    size: 'small',
    xs: 3.75,
    name: 'lastName',
    placeholder: 'Enter Last Name',
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 3,
    type: 'input',
    accessor: 'addressLine1',
    label: 'Address Line 1',
    size: 'small',
    xs: 12,
    name: 'addressLine1',
    placeholder: 'Enter Address',
    width: '547px'
  },
  {
    id: 4,
    type: 'input',
    accessor: 'addressLine2',
    label: 'Address Line 2',
    size: 'small',
    xs: 12,
    name: 'addressLine2',
    placeholder: 'Enter Address',
    width: '547px'
  },
  {
    id: 5,
    type: 'input',
    accessor: 'city',
    label: 'City',
    size: 'small',
    xs: 3.75,
    name: 'city',
    placeholder: 'Enter City Name',
    operation: ['validateAlphaText'],
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 6,
    type: 'select',
    accessor: 'stateId',
    label: 'State',
    size: 'small',
    xs: 3.75,
    placeholder: 'Select State',
    name: 'stateId',
    style: {
      marginRight: '16px'
    },
    options: {
      optionsData: []
    }
  },
  {
    id: 7,
    type: 'patternInput',
    accessor: 'postalCode',
    label: 'Postal Code',
    size: 'small',
    xs: 3,
    name: 'postalCode',
    placeholder: 'Enter Postal Code',
    operation: ['formatZipcode'],
    sendUserInputs: true,
    mask: '',
    format: '######',
    width: '178px'
  },
  {
    id: 8,
    type: 'patternInput',
    accessor: 'phone',
    label: 'Phone/Ext',
    currentLabel: 'Phone/Ext',
    size: 'small',
    xs: 3.75,
    name: 'phone',
    operation: ['formatPhoneNumber'],
    currentXs: 3.75,
    placeholder: '(___) ___-____,_____',
    mask: '_',
    format: '(###) ###-####'
  }
];
