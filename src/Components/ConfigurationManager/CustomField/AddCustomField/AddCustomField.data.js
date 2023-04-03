import AddIcon from '../../../../../Icons/AddIcon.svg';
import CloseIcon from '../../../../../Icons/Close.svg';
export const NoCharacterLimitRequired = ['Date','Boolean (Checkbox)'];
export const DROP_DOWN_TEXT = 'Drop-Down List';
export const CustomRequiredOption = [
  {
    id: 'Yes',
    title: 'Yes',
  },
  {
    id: 'No',
    title: 'No',
  },
];
export const dialogDataHeader = [
  {
    label: <img src={AddIcon} />,
    accessor: 'AddIcon',
    operation: []
  },
  {
    label: 'Add a New Custom Field',
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
    label: 'Add',
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
    accessor: 'addButton',
    type: 'submit'
  }
];


