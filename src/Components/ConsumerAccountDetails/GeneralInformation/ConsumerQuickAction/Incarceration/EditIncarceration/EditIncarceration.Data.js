import { IconButton } from '@oasis/react-core';
import { extractImagePath } from '../../../../../Common/commonfunctions';

export const dialogDataHeader = [
  {
    label: <img src={extractImagePath('update.png')} width = "16px" />,
    accessor: 'EditIcon',
    operation: []
  },
  {
    label: 'Update Incarcerated Information',
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

export const EditIncarceratedFormData = [
  {
    id: 1,
    type: 'radio',
    accessor: 'isIncarcerated',
    label: 'Incarcerated?',
    size: 'small',
    xs: 6.2,
    name: 'isIncarcerated',
    required: true,
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
    type: 'input',
    accessor: 'penitentiary',
    label: 'Penitentiary',
    size: 'small',
    xs: 6.2,
    placeholder: 'Enter Penitentiary',
    name: 'penitentiary'
  },
  {
    id: 3,
    type: 'date',
    accessor: 'expectedReleaseDate',
    label: 'Expected Release Date',
    size: 'small',
    xs: 6.2,
    name: 'expectedReleaseDate',
    placeholder: 'MM/DD/YYYY',
  },
  {
    id: 4,
    type: 'date',
    accessor: 'verifiedDate',
    label: 'Verified Date',
    size: 'small',
    xs: 6.2,
    name: 'verifiedDate',
    placeholder: 'MM/DD/YYYY',
    maxDate: new Date()
  }
];
