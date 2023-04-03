import { ColorPallete } from '../../../../theme/ColorPallete';
import { extractImagePath } from '../../../Common/commonfunctions';
import Add from '../../../../Images/Add.png';

export const dialogDataHeader = [
  {
    label: <img src={Add} />,
    accessor: 'AddIcon',
    operation: []
  },
  {
    label: 'Add Status Code Priority',
    accessor: 'title',
    operation: []
  },
  {
    label: <img src={extractImagePath('close.png')} />,
    accessor: 'CloseIcon',
    operation: ['click']
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
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px'
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

export const FormData = [
  {
    id: 1,
    type: 'input',
    name: 'priority',
    label: 'Priority',
    spacing: 4,
    required: true,
    placeHolder: 'Enter Priority',
    typeFomart: 'number'
  },
  {
    id: '2',
    type: 'select',
    name: 'accountHolderStatus',
    label: 'Account Holder Status',
    spacing: 8.1,
    required: true,
    idaccessor: 'categoryId',
    valueaccessor: 'name'
  }
];

export const statusFormDatas = [
  {
    id: 1,
    type: 'input',
    accessor: 'priority',
    label: 'Priority',
    size: 'small',
    xs: 12,
    placeholder: 'Enter Priority',
    name: 'priority',
    required: true,
    fieldType: 'number',
    inputProps: {
      min: 1
    },
    sx: {
      width: '20% !important',
      '& .MuiInputBase-root': {
        '& .MuiInputBase-input': {
          padding: '7px'
        }
      },
      input: {
        '&::placeholder': {
          color: ColorPallete.Text.Secondary,
          fontSize: '14px',
          opacity: 1,
          fontFamily: 'poppins'
        }
      }
    },
    validationRequired: true,
    validationFormat: new RegExp('^[1-9]d*$'),
    onKeyPress: true,
    onKeyPressFn: (event) => {
      if (event?.key === '-' || event?.key === '+' || event?.key === '.') {
        event.preventDefault();
      }
    }
  },
  {
    id: 2,
    size: 'small',
    xs: 4,
    type: 'select',
    label: 'Accountholder Status',
    accessor: 'statusCodeUUID',
    name: 'statusCodeUUID',
    placeholder: 'Select Accountholder Status',
    required: true,
    options: {},
    style: {
      marginRight: '16px'
    },
    sx: {
      '& .MuiInputBase-input': {
        padding: '9px'
      }
    },
    helperStyle: {
      marginLeft: '0px'
    }
  },
  {
    id: 3,
    type: 'input',
    accessor: 'phase',
    label: 'Phase',
    size: 'small',
    xs: 3,
    disabled: true,
    required: true,
    name: 'phase'
  },
  {
    id: 4,
    type: 'input',
    accessor: 'criteriaDescription',
    label: 'Evaluation Criteria Description',
    size: 'small',
    xs: 7,
    placeholder: 'Enter Evaluation Criteria Description',
    name: 'criteriaDescription',
    required: true,
    sx: {
      width: '95% !important',
      '& .MuiInputBase-root': {
        '& .MuiInputBase-input': {
          padding: '7px'
        }
      },
      input: {
        '&::placeholder': {
          color: ColorPallete.Text.Secondary,
          fontSize: '14px',
          opacity: 1,
          fontFamily: 'poppins'
        }
      }
    }
  },
  {
    id: 5,
    type: 'input',
    accessor: 'criteria',
    label: 'Evaluation Criteria',
    size: 'small',
    xs: 12,
    placeholder: 'Enter Evaluation Criteria',
    name: 'criteria',
    rows: 4,
    multiline: true,
    required: true,
    sx: {
      width: '100% !important',
      '& .MuiOutlinedInput-root': {
        padding: '7px'
      },
      textarea: {
        '&::placeholder': {
          color: ColorPallete.Text.Secondary,
          fontSize: '14px',
          opacity: 1,
          fontFamily: 'poppins'
        }
      }
    }
  }
];
