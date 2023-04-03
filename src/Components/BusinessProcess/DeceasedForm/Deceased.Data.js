import MoreButton from '../../../Components/Common/AEComponents/More/MoreButton';
import { extractImagePath } from '../../../Components/Common/commonfunctions.js';
import { ColorPallete } from '../../../theme/ColorPallete';

export const ToolbarData = [
  {
    label: <img src={extractImagePath('user.png')} style={{ width: '16px' }} />,
    accessor: 'icon'
  },
  {
    label: 'Deceased Information',
    accessor: 'deceasedInformation'
  },
  {
    label: <MoreButton />,
    accessor: 'moreButton',
    operation: ['click']
  }
];

export const ToolbarStructure = [
  {
    id: 1,
    tag: 'div',
    component: 'label',
    accessor: 'icon',
    styles: {
      alignSelf: 'center',
      display: 'flex',
      paddingRight: '8px'
    }
  },
  {
    id: 2,
    tag: 'div',
    component: 'label',
    accessor: 'deceasedInformation',
    styles: {
      alignSelf: 'center',
      display: 'flex',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      color: ColorPallete.Text.Primary,
      paddingRight: '24px',
      width: 'auto',
      whiteSpace: 'nowrap'
    }
  },
  {
    id: 3,
    tag: 'div',
    component: 'label',
    accessor: 'moreButton',
    styles: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      width: '100%'
    }
  }
];

export const PositionedMenuEditItems = [
  {
    id: 1,
    label: <img src={extractImagePath('edit.png')} />,
    accessor: 'Update Deceased Information',
    parentComponent: 'deceased',
    componentToRender: 'editDeceased',
    styles: {
      icon: {
        display: 'flex'
      },
      text: {
        paddingLeft: '5px',
        fontWeight: 400
      }
    }
  }
];