import { IconButton } from '@oasis/react-core';
import { extractImagePath } from '../../../../../Common/commonfunctions';

export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('update.png')} width = "16px" />,
    accessor: 'EditIcon',
    operation: []
  },
  {
    label: 'Update Litigious Information',
    accessor: 'title',
    operation: []
  },
  {
    label: (
      <IconButton style={{ pointer: 'cursor' }}>
        <img src={extractImagePath('close.png')} width = "16px" />
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
    label: 'Update',
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
    accessor: 'addButton',
    type: 'submit'
  }
];

export const EditLitigiousFormData = [
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
          value: true
        },
        {
          label: 'No',
          accessor: 'No',
          value: false
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
          disabled: false,
        },
        {
          label: 'No',
          accessor: 'No',
          value: false,
          disabled: false,
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
          disabled: false,
        },
        {
          label: 'No',
          accessor: 'No',
          value: false,
          disabled: false,
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
          disabled: false,
        },
        {
          label: 'No',
          accessor: 'No',
          value: false,
          disabled: false,
        }
      ]
    }
  }
];