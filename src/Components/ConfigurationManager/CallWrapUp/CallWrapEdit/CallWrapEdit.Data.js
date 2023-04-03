import EditIcon from '../../../../../Icons/Edit.svg';
import CloseIcon from '../../../../../Icons/Close.svg';

export const dialogDataHeader = [
  {
    label: <img src={EditIcon} />,
    accessor: 'AddIcon',
    operation: []
  },
  {
    label: 'Update Call Wrap Up',
    accessor: 'title',
    operation: []
  },
  {
    label: <img src={CloseIcon} />,
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
    accessor: 'AddIcon',
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

export const EditAlertFormData = [
  {
    id: 1,
    type: 'input',
    accessor: 'description',
    label: ' Outcome Description',
    required: true,
    size: 'small',
    xs: 12.2,
    placeholder: 'Enter Outcome Name',
    name: 'description'
  },
  {
    id: 2,
    type: 'multiSelect',
    options: [
      {
        label: 'Inbound',
        value: 'INBOUND'
      },
      {
        label: 'Outbound',
        value: 'OUTBOUND'
      }
    ],

    xs: 12.2,
    label: 'Call method',
    placeholder: 'Select Call Method',
    accessor: 'methods',
    tracker: 'callmethods',
    labelaccessor: 'label',
    valueaccessor: 'value',
    required: true,
    disabled: false,
    value: 'PropTypes.string',
    allowSelectAll: true,
    allOption: [],
    name: 'callMethod',
    clearValues: true,
    noOptionsMessage: 'No Options Available',
    errorMessage: 'ERROR'
  }
];
