import AccountsIcon from '../../../../../Icons/Accounts.svg';
import MoreButton from '../../../Common/AEComponents/More/MoreButton';
import { getMenuOptions,extractImagePath } from '../../../Common/commonfunctions';

export const TabsData = [
  {
    label: 'Current Account Set', //@744 Account In Set
    component: 'accountsInSet',
    value: '1'
  },
  {
    label: 'All Accounts',
    component: 'allAccounts',
    value: '2'
  }
];

export const ToolbarData = [
  {
    label: <img src={AccountsIcon} />,
    accessor: 'icon'
  },
  {
    label: 'Accounts',
    accessor: 'accounts'
  },
  {
    accessor: 'tabs'
  },
  {
    label: <MoreButton />,
    accessor: 'moreButton'
  }
];

export const ToolbarStructure = [
  {
    id: 1,
    tag: 'div',
    size: 0.55,
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
    size: 2,
    component: 'label',
    accessor: 'accounts',
    styles: {
      alignSelf: 'center',
      display: 'flex',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      color: '#444444',
      paddingRight: '24px',
      width: 'auto',
      whiteSpace: 'nowrap'
    }
  },
  {
    id: 3,
    tag: 'div',
    size: 11,
    component: 'label',
    accessor: 'tabs',
    styles: {
      display: 'flex',
      width: '100%'
    }
  },
  {
    id: 3,
    tag: 'div',
    size: 1,
    component: 'label',
    accessor: 'moreButton',
    styles: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      width: 'auto'
    }
  }
];

export const PositionedMenuEditItems = {
  accountsInSet: [
    {
      id: 1,
      label: getMenuOptions(extractImagePath("eye.png"), 'View Account Details'),
      parentComponent: 'accountsInSet',
      componentToRender: 'accountsInSet',
      routePath: '/consumer/accountpage/general',
      styles: {
        icon: {
          display: 'flex',
          height: '20px'
        },
        text: {
          paddingLeft: '5px',
          fontWeight: 400
        }
      }
    }
  ],
  allAccounts: [
    {
      id: 1,
      label: getMenuOptions(extractImagePath("eye.png"), 'View Account Details'),
      parentComponent: 'allAccounts',
      componentToRender: 'allAccounts',
      routePath: '/consumer/accountpage/general',
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
  ]
};
