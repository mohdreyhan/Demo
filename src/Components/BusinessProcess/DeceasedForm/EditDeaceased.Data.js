import { extractImagePath } from '../../Common/commonfunctions';
const defaultMinDate = new Date('1900-01-01');
const defaultMaxDate = new Date('2049-12-31');
const currentDate = new Date();
export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('edit.png')} />,
    accessor: 'EditIcon',
    operation: []
  },
  {
    label: 'Update Deceased Information',
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
    label: 'Update',
    accessor: 'editButton',
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
    accessor: 'EditIcon',
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
    accessor: 'editButton',
    type: 'submit'
  }
];

export const DeceasedInfoFormData = [
  {
    id: 1,
    type: 'radio',
    accessor: 'deceased',
    label: 'Deceased ?',
    size: 'small',
    xs: 12,
    style: {
      width: '304px'
    },
    name: 'deceased',
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
        }
      ]
    }
  },
  {
    id: 2,
    type: 'date',
    accessor: 'date',
    label: 'Deceased Date',
    size: 'small',
    xs: 12,
    name: 'date',
    required: false,
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'mm/dd/yyyy',
    width: '178px',
    style: {
      width: '304px'
    },
    minDate: defaultMinDate,
    maxDate: currentDate
  },
  {
    id: 3,
    type: 'input',
    accessor: 'city',
    label: 'City',
    size: 'small',
    xs: 3.75,
    name: 'city',
    placeholder: 'Enter City',
    operation:['validateAlphaText'],
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 4,
    type: 'select',
    accessor: 'stateRefId',
    label: 'State',
    size: 'small',
    xs: 3.75,
    placeholder: 'Select State',
    name: 'stateRefId',
    style: {
      marginRight: '16px'
    },
    options: {}
  },
  {
    id: 5,
    type: 'patternInput',
    accessor: 'zipCode',
    label: 'Postal Code',
    size: 'small',
    xs: 3.75,
    name: 'zipCode',
    placeholder: 'Enter Postal Code',
    operation: ['formatZipcode'],
    sendUserInputs: true,
    mask: '',
    format: '######'
  },
  {
    id: 6,
    type: 'date',
    accessor: 'fileDate',
    label: 'File Date',
    size: 'small',
    xs: 3.75,
    name: 'fileDate',
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'mm/dd/yyyy',
    style: {
      marginRight: '16px'
    },
    minDate: defaultMinDate,
    maxDate: currentDate
  },
  {
    id: 7,
    type: 'input',
    accessor: 'caseNumber',
    label: 'Case Number',
    size: 'small',
    xs: 3.75,
    name: 'caseNumber',
    placeholder: 'Enter CaseNumber',
    style: {
      marginRight: '16px'
    },
  },
  {
    id: 8,
    type: 'date',
    accessor: 'verifiedDate',
    label: 'Verified Date',
    size: 'small',
    xs: 3.75,
    name: 'verifiedDate',
    dateFormat: 'MM/dd/yyyy',
    placeholder: 'mm/dd/yyyy',
    minDate: defaultMinDate,
    maxDate: currentDate
  },
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
    accessor: 'stateRefId',
    label: 'State',
    size: 'small',
    xs: 3,
    placeholder: 'Select State',
    name: 'stateRefId',
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
    operation:['validateWebsite'],
    width: '178px',
    style: {
      marginRight: '16px'
    }
  }
];

//exicutor
export const ExcutorInfoFormData = [
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
      marginRight: '20px'
    }
  },
  {
    id: 3,
    type: 'input',
    accessor: 'city',
    label: 'City',
    size: 'small',
    xs: 3.75,
    name: 'city',
    placeholder: 'Enter City',
    operation:['validateAlphaText'],
    style: {
      marginRight: '16px'
    }
  },
  {
    id: 4,
    type: 'select',
    accessor: 'stateRefId',
    label: 'State',
    size: 'small',
    xs: 3.75,
    placeholder: 'Select State',
    name: 'stateRefId',
    style: {
      marginRight: '16px'
    },
    options: {
      optionsData: []
    }
  },
  {
    id: 6,
    type: 'patternInput',
    accessor: 'zipCode',
    label: 'Postal Code',
    size: 'small',
    xs: 3.75,
    name: 'zipCode',
    placeholder: 'Enter Postal Code',
    operation: ['formatZipcode'],
    mask: '',
    format: '######',
  },
  {
    id: 7,
    type: 'patternInput',
    accessor: 'phoneNumber',
    label: 'Phone/Ext',
    size: 'small',
    xs: 3.75,
    name: 'phoneNumber',
    operation: ['formatPhoneNumber'],
    currentXs: 3.75,
    placeholder: "(___) ___-____,_____",
    mask: "",
    format: "(###) ###-#####"
  }
];
