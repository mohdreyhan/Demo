import { IconButton } from '@oasis/react-core';
import { extractImagePath } from '../../../../../Common/commonfunctions';

export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('update.png')} width="16px" />,
    accessor: 'EditIcon',
    operation: []
  },
  {
    label: 'Update Complaint Information',
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
    label: 'Update',
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
    accessor: 'updateButton',
    type: 'submit'
  }
];

export const EditComplaintsFormData = [
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
    accessor: 'date',
    label: 'Date of Complaint',
    size: 'small',
    xs: 6.2,
    name: 'date',
    placeholder: 'MM/DD/YYYY',
    required: true,
    disableFuture: false,
    maxDate: new Date()
  },
  {
    id: 3,
    type: 'radio',
    accessor: 'isValid',
    label: 'Is the complaint valid?',
    size: 'small',
    xs: 6.2,
    name: 'isValid',
    required: true,
    default: true,
    disabled:true,
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
  }  
];
