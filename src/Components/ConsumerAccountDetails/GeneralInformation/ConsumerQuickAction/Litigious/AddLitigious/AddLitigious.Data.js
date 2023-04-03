import { extractImagePath } from '../../../../../Common/commonfunctions.js';

export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('add.png')} width = "18px" />,
    accessor: 'icon',
    operation: []
  },
  {
    label: 'Add Litigious Information',
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
    size: 'small',
    disabled: false
  },
  {
    label: 'Submit',
    accessor: 'addButton',
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
    accessor: 'addButton',
    type: 'submit'
  }
];

export const ADDLIGITIOUSFORMDATA = [
  {
    id: 1,
    type: 'radio',
    accessor: 'isLitigious',
    label: 'Litigious?',
    size: 'small',
    xs: 6.5,
    name: 'isLitigious',
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
          disabled: true
        }
      ]
    }
  },
  {
    id: 2,
    type: 'date',
    accessor: 'filedDate',
    label: 'File Date',
    size: 'small',
    required: true,
    xs: 6.5,
    name: 'filedDate',
    placeholder: 'MM/DD/YYYY',
    maxDate: new Date()
  },
  {
    id: 3,
    type: 'radio',
    accessor: 'isFcra',
    label: 'FCRA (Fair Credit Reporting Act)',
    size: 'small',
    xs: 7,
    name: 'isFcra',
    required: true,
    default: false,
    options: {
      optionsData: [
        {
          label: 'Yes',
          accessor: 'Yes',
          value: true,
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
    id: 4,
    type: 'radio',
    accessor: 'isTcpa',
    label: 'TCPA (Telephone Consumer Protection Act)',
    size: 'small',
    xs: 7,
    name: 'isTcpa',
    required: true,
    default: false,
    options: {
      optionsData: [
        {
          label: 'Yes',
          accessor: 'Yes',
          value: true,
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
    id: 5,
    type: 'radio',
    accessor: 'isFdCpa',
    label: 'FDCPA (Fair Debt Collection Practices Act)',
    size: 'small',
    xs: 7,
    name: 'isFdCpa',
    required: true,
    default: false,
    options: {
      optionsData: [
        {
          label: 'Yes',
          accessor: 'Yes',
          value: true,
        },
        {
          label: 'No',
          accessor: 'No',
          value: false,
        }
      ]
    }
  }
];
