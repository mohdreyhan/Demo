import { IconButton } from '@oasis/react-core';
import { extractImagePath } from '../../../../../Common/commonfunctions';

export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('add.png')} width="16px" />,
    accessor: 'icon',
    operation: []
  },
  {
    label: 'Add Dispute Information',
    accessor: 'title',
    operation: []
  },
  {
    label: (
      <IconButton style={{ pointer: 'cursor' }}>
        <img src={extractImagePath('close.png')} width="16px" />
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

export const AddDisputeFormData = [
  {
    id: 1,
    type: 'radio',
    accessor: 'isDisputed',
    label: 'Dispute?',
    size: 'small',
    xs: 6.2,
    name: 'isDisputed',
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
    size: 'small',
    xs: 6.2,
    type: 'select',
    label: 'Reason for Dispute',
    accessor: 'reasonId',
    name: 'reasonId',
    placeholder: 'Select Reason for Dispute',
    required: false,
    options:{}
  },
  {
    id: 3,
    type: 'date',
    accessor: 'date',
    label: 'Dispute Date',
    size: 'small',
    xs: 6.2,
    name: 'date',
    placeholder: 'MM/DD/YYYY',
    disableFuture: false,
    maxDate: new Date()
  }
];
