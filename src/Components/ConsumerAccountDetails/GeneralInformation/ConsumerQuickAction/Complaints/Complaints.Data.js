import MoreButton from '../../../../Common/AEComponents/More/MoreButton';
import { extractImagePath } from '../../../../Common/commonfunctions';
import { ColorPallete } from '../../../../../theme/ColorPallete';
import ComplaintsView from "../../../../../../Icons/complaints_book.png";
export const ToolbarData = [
  {
    label: <img src={ComplaintsView} style={{ width: '16px' }} />,
    accessor: 'icon'
  },
  {
    label: 'Complaints',
    accessor: 'complaintInformation'
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
    accessor: 'complaintInformation',
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
export const PositionedMenuAddItems = [
  {
    id: 1,
    label: <img src={extractImagePath('add.png')} />,
    accessor: 'Add Complaint Information',
    parentComponent: 'complaints',
    componentToRender: {
      name: 'Complaints',
      isBusinessprocess: false,
      id: 6,
      isInProgress: [],
      componentToRender: 'complaint',
      disabled: false
    },
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
export const PositionedMenuEditItems = [
  {
    id: 1,
    label: <img src={extractImagePath('edit.png')} />,
    accessor: 'Update Complaint Information',
    parentComponent: 'complaints',
    componentToRender: 'editComplaints',
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