import { IconButton } from '@oasis/react-core';
import CloseIcon from '../../../../../../Icons/Close.svg';
import AddIcon from '../../../../../../Icons/AddIcon.svg';

export const dialogDataHeader = [
  {
    label: <img src={AddIcon} />,
    accessor: 'AddIcon',
    operation: []
  },
  {
    label: 'Add New Employer',
    accessor: 'title',
    operation: []
  },
  {
    label: (
      <IconButton style={{ pointer: 'cursor' }}>
        <img src={CloseIcon} />
      </IconButton>
    ),
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
    label: 'Save',
    accessor: 'updateButton',
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
    accessor: 'AddIcon',
    styles: {
      display: 'flex'
    }
  },
  {
    id: 2,
    size: 11,
    component: 'label',
    accessor: 'title'
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
    accessor: 'updateButton',
    type: 'submit'
  }
];

export const AddEmployerInfoData = [
  {
    id: 1,
    type: 'radio',
    accessor: 'active',
    label: 'Employer Type',
    currentLabel: 'Employer Type',
    size: 'small',
    xs: 8,
    currentXs: 8,
    required: true,
    default: true,
    name: 'active',
    options: {
      optionsData: [
        {
          title: 'Current',
          accessor: 'Current Employer',
          id: true
        },
        {
          title: 'Historical',
          accessor: 'Historical Employer',
          id: false
        }
      ]
    }
  },
  {
    id: 2,
    type: 'input',
    accessor: 'companyName',
    label: 'Employer Name',
    currentLabel: 'Employer Name',
    required: true,
    size: 'small',
    xs: 6.7,
    currentXs: 6.7,
    name: 'companyName',
    placeholder: 'Company Name'
  },
  {
    id: 3,
    type: 'select',
    accessor: 'employmentTypeId',
    label: 'Employment Type',
    currentLabel: 'Employment Type',
    placeholder: 'Select Type',
    size: 'small',
    xs: 6.7,
    currentXs: 6.7,
    name: 'employmentTypeId',
    required: true,
    options: {},
    optionsLabel: 'description',
    optionsValue: 'id',
    defaultTitle: 'Select Type'
  },
  {
    id: 4,
    type: 'input',
    accessor: 'address1',
    label: 'Address 1',
    currentLabel: 'Address 1',
    required: true,
    size: 'small',
    xs: 6.7,
    currentXs: 6.7,
    placeholder: 'Address line 1',
    name: 'address1'
  },
  {
    id: 5,
    type: 'input',
    accessor: 'address2',
    label: 'Address 2',
    currentLabel: 'Address 2',
    required: false,
    size: 'small',
    xs: 6.7,
    currentXs: 6.7,
    placeholder: 'Address line 2',
    name: 'address2'
  },
  {
    id: 6,
    type: 'select',
    accessor: 'stateCode',
    label: 'State',
    currentLabel: 'State',
    size: 'small',
    xs: 6.7,
    currentXs: 6.7,
    placeholder: 'Select state',
    name: 'stateCode',
    options: {},
    required: true,
    optionsLabel: 'displayName',
    optionsValue: 'id',
    defaultTitle: 'Select State'
  },
  {
    id: 7,
    type: 'input',
    accessor: 'city',
    label: 'City',
    currentLabel: 'City',
    required: true,
    size: 'small',
    xs: 6.7,
    currentXs: 6.7,
    placeholder: 'Enter city',
    name: 'city'
  },
  {
    id: 8,
    type: 'input',
    accessor: 'countryCode',
    label: 'Country',
    currentLabel: 'Country',
    size: 'small',
    xs: 6.7,
    currentXs: 6.7,
    placeholder: 'Select Country',
    name: 'countryCode',
    options: {},
    required: true,
    disabled: true,
    sendUserInputs: true
  },
  {
    id: 9,
    type: 'patternInput',
    accessor: 'zipCode',
    label: 'Zip Code',
    currentLabel: 'Zip Code',
    required: true,
    size: 'small',
    xs: 6.7,
    currentXs: 6.7,
    length: 5,
    placeholder: 'Zip code',
    name: 'zipCode',
    mask: '',
    format: '######',
    operation: ['formatZipcode']
  },
  {
    id: 10,
    type: 'patternInput',
    accessor: 'phoneNumberOne',
    label: 'Employer Phone 1',
    currentLabel: 'Employer Phone 1',
    size: 'small',
    xs: 6.7,
    name: 'phoneNumberOne',
    operation: ['formatPhoneNumber'],
    length: 14,
    required: true,
    currentXs: 6.7,
    placeholder: '(___) ___-____',
    mask: '_',
    format: '(###) ###-####'
  },
  {
    id: 11,
    type: 'patternInput',
    accessor: 'phoneNumberTwo',
    label: 'Employer Phone 2',
    currentLabel: 'Employer Phone 2',
    size: 'small',
    xs: 6.7,
    name: 'phoneNumberTwo',
    length: 14,
    operation: ['formatPhoneNumber'],
    required: false,
    currentXs: 6.7,
    placeholder: '(___) ___-____',
    mask: '_',
    format: '(###) ###-####'
  },
  {
    id: 12,
    type: 'input',
    accessor: 'employerContact',
    label: 'Employer Contact',
    currentLabel: 'Employer Contact',
    size: 'small',
    xs: 10,
    currentXs: 10,
    name: 'employerContact',
    required: true,
    width: '304px',
    placeholder: 'Name of the Contact'
  },
  {
    show: 'flex',
    id: 13,
    type: 'date',
    accessor: 'startDate',
    label: 'Start & End Date',
    currentLabel: 'Start Date',
    size: 'small',
    xs: 4,
    currentXs: 6.7,
    name: 'startDate',
    operation: ['concat'],
    required: false,
    labelWidth: 12,
    btoh: true,
    openTo: 'year',
    views: ['year', 'month', 'day'],
    allowSameDateSelection: true,
    maxDate: new Date()
  },
  {
    type: 'label',
    title: 'to',
    xs: 0.65,
    style: {
      alignSelf: 'center',
      justifyContent: 'center',
      display: 'flex',
      paddingTop: "10px"
    },
    show: 'flex',
    current: false
  },
  {
    show: 'flex',
    id: 14,
    type: 'date',
    accessor: 'endDate',
    label: '',
    size: 'small',
    xs: 4,
    name: 'endDate',
    disabled: true,
    operation: ['concat'],
    style: {
      paddingTop: '20px'
    },
    current: false,
    dontShowOptional: true,
    openTo: 'year',
    views: ['year', 'month', 'day'],
    allowSameDateSelection: true,
    maxDate: new Date()
  },
  {
    id: 15,
    type: 'radio',
    accessor: 'verified',
    label: 'Verified',
    currentLabel: 'Verified',
    size: 'small',
    xs: 6.7,
    name: 'verified',
    required: true,
    default: false,
    currentXs: 6.7,
    options: {
      optionsData: [
        {
          title: 'Yes',
          accessor: 'Yes',
          id: true
        },
        {
          title: 'No',
          accessor: 'No',
          id: false
        }
      ]
    }
  }
  // {
  //   id: 9,
  //   type: "select",
  //   accessor: "type",
  //   label: "Type",
  //   size: "small",
  //   xs: 6.7,
  //   name: "type",
  //   required: false,
  //   options: {
  //     optionsData: [
  //       {
  //         label: "Full Time",
  //         accessor: "Full Time",
  //         value: "Full Time"
  //       },
  //       {
  //         label: "Part Time",
  //         accessor: "Part Time",
  //         value:"Part Time"
  //       },
  //     ],
  //   },
  // },
];
