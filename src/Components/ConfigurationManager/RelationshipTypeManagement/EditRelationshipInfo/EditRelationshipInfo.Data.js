import CloseIcon from '../../../../../Icons/Close.svg';
import { FolderOpenIcon } from '@oasis/react-core';
import { ColorPallete } from '../../../../theme/ColorPallete';

export const dialogDataHeader = [
  {
    label: (
      <FolderOpenIcon
        style={{ fontSize: '21px', marginRight: '7%', color: ColorPallete.Button.Secondary }}
      />
    ),
    accessor: 'PlaceOfEmployementIcon',
    operation: []
  },
  {
    label: '  Relationship Type Settings',
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
    label: 'close',
    accessor: 'cancelButton',
    operation: ['click'],
    type: 'button',
    variant: 'outlined',
    size: 'small'
  },
  {
    label: 'Save',
    accessor: 'saveButton',
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
    accessor: 'PlaceOfEmployementIcon',
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
      marginLeft: '0'
    }
  },
  {
    id: 31,
    size: 0.3,
    component: 'label',
    accessor: 'CloseIcon',
    styles: {
      cursor: 'pointer',
      display: 'block',
      // align: "center",
      // alignItems: "center",
      // justifyContent: "center",
      marginLeft: 'auto'
    }
  }
];
export const dialogStructureFooter = [
  {
    id: 1,
    component: 'label',
    accessor: 'cancelButton',
    type: 'button'
  }
];

export const EditRelationshipInfoData = [
  {
    id: 1,
    type: 'input',
    accessor: 'name',
    label: 'Relationship Name',
    required: true,
    size: 'small',
    xs: 6.2,
    disabled: true,
    name: 'name',
    styles: {
      fontSize: '12px'
    }
  },
  {
    id: 2,
    type: 'checkbox',
    accessor: 'responsible',
    label: 'Is responsible',
    size: 'small',
    disabled: true,
    xs: 6.2,
    name: 'responsible'
  },
  {
    id: 3,
    type: 'textarea',
    accessor: 'description',
    label: 'Description',
    size: 'large',
    xs: 12,
    disabled: true,
    required: true,
    name: 'description',
    styles: {
      fontSize: '12px'
    }
  }
];
