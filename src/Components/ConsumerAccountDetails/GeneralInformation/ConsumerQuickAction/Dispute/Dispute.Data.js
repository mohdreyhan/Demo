import MoreButton from '../../../../Common/AEComponents/More/MoreButton';
import { extractImagePath } from '../../../../Common/commonfunctions';
import { ColorPallete } from '../../../../../theme/ColorPallete';
import connect_without_contact from "../../../../../../Icons/connect_without_contact.png";

export const ToolbarData = [
  {
    label: <img src={connect_without_contact} style={{ width: '22px' }} />,
    accessor: 'icon'
  },
  {
    label: 'Dispute Information',
    accessor: 'disputeInformation'
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
    accessor: 'disputeInformation',
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
    accessor: 'Update Dispute Information',
    parentComponent: 'dispute',
    componentToRender: 'editDispute',
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
