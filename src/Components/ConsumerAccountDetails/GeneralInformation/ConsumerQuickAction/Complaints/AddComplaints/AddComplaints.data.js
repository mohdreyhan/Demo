import { IconButton } from '@oasis/react-core';
import { extractImagePath } from '../../../../../Common/commonfunctions';
export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('add.png')} width="16px" />,
    accessor: 'icon',
    operation: []
  },
  {
    label: 'Add Complaint Information',
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
    type: 'button',
    disabled: false
  },
  {
    id: 2,
    component: 'label',
    accessor: 'addButton',
    type: 'submit',
    disabled: false

  }
];

export const AddComplaintFormData = [
  {
    id: 1,
    size: 'small',
    xs: 6.2,
    type: 'select',
    label: 'Reason for Complaint',
    accessor: 'reasonId',
    name: 'reasonId',
    placeholder: 'Select Reason for Complaint',
    required: true,
    options: {}
  },
  {
    id: 2,
    type: 'date',
    accessor: 'complaintDate',
    label: 'Date of Complaint',
    size: 'small',
    xs: 6.2,
    name: 'complaintDate',
    placeholder: 'mm/dd/yyyy',
    required: true,
    disableFuture: true,
    maxDate: new Date()
  },
  {
    id: 3,
    type: 'radio',
    accessor: 'hasComplaints',
    label: 'Is the complaint valid?',
    size: 'small',
    xs: 6.2,
    name: 'isValid',
    required: false,
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
  }
];
