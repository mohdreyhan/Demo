import MoreButton from '../../../../Common/AEComponents/More/MoreButton';
import { extractImagePath } from '../../../../Common/commonfunctions.js';
import { ColorPallete } from '../../../../../theme/ColorPallete';

export const ToolbarData = [
  {
    label: <img src={extractImagePath('PeopleGrey.png')} style={{ width: '18px' }} />,
    accessor: 'icon'
  },
  {
    label: 'Litigious Information',
    accessor: 'litigiousInformation'
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
    accessor: 'litigiousInformation',
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
    accessor: 'Update Litigious Information',
    parentComponent: 'litigious',
    componentToRender: 'editLitigious',
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