import MoreButton from '../../../Common/AEComponents/More/MoreButton';
import { ColorPallete } from '../../../../theme/ColorPallete.js';
import { extractImagePath } from "../../../Common/commonfunctions";
import AddInMenu from "../../../../../Icons/IconsInMenu/AddInMenu_gray.png";
import VerifiedIcon from "../../../../../Icons/verified.png";
import Vector from "../../../../../Icons/Vector.png";

export const TabsData = [
  {
    label: "Current",
    component: "current",
    value: "1",
  },
  {
    label: "Historical",
    component: "historical",
    value: "2",
  },
];

export const getAssignedLabel = (icon, label) => {
  return (
    <div style={{ display: "flex",marginTop:"8px" }}>
      <div>
        <img src={icon} />
      </div>
      <div style={{ paddingLeft: "5px", fontWeight: 400 , paddingRight: "16px"}}>{label}</div>
    </div>
  );
};

export const ToolbarData = [
  {
    label: <img src={extractImagePath("PeopleBlue.png")} height="18" width="22" />,
    accessor: 'icon'
  },
  {
    label: 'Attorney Information',
    accessor: 'attorneyInformation'
  },
  {
    accessor: "tabs",
  },
  {
    label: getAssignedLabel(VerifiedIcon, "Attorney Assigned"),
    accessor: "attorneyAssigned"
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
    accessor: 'attorneyInformation',
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
    tag: "div",
    size: 9.5,
    component: "label",
    accessor: "tabs",
    styles: {
      display: "flex",
      width: "auto",
    },
  },
  {
    id: 4,
    tag: 'div',
    component: 'label',
    accessor: 'verifiedIcon',
    styles: {
      alignSelf: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: "4px",
      marginTop:"4px",
       width: '100%',
    }
  },
  {
    id: 4,
    tag: 'div',
    component: 'label',
    accessor: 'attorneyAssigned',
    styles: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      width: '100%',
      color: "#527D24",
    }
  },
  {
    id: 5,
    tag: 'div',
    component: 'label',
    accessor: 'moreButton',
    styles: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      // width: '100%'
    }
  }
];

export const PositionedMenuAddItemsNoRecord = [
  {
    id: 1,
    label: <img src={AddInMenu} height="14" width="14" />,
    accessor: 'Assign an Attorney',
    componentToRender: 'assignAttorney',
    styles: {
      icon: {
        display: 'flex',
        color:"red",
      },
      text: {
        paddingLeft: '5px',
        fontWeight: 400,
        textTransform: "none"
      }
    }
  }
];

export const PositionedMenuAddItems = [
  {
    id: 1,
    label: <img src={extractImagePath("edit.png")} height="14" width="14" />,
    accessor: 'Update Assigned Attorney',
    componentToRender: 'updateAttorney',
    styles: {
      icon: {
        display: 'flex',
        color:"red",
      },
      text: {
        paddingLeft: '5px',
        fontWeight: 400
      }
    }
  },
];

const getMenuOptions = (icon, label) => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={icon} />
      </div>
      <div style={{ paddingLeft: "5px", fontWeight: 400 }}>{label}</div>
    </div>
  );
};

export const PositionedMenuEditItems = [
  {
    id: 1,
    label: getMenuOptions( extractImagePath("edit.png"), "Update Attorney Information"),
    parentComponent: "current",
    componentToRender: "editAttorney",
    operation: ["edit"],
    styles: {
      icon: {
        display: "flex",
      },
      text: {
        paddingLeft: "5px",
        fontWeight: 400,
      },
    },
  },
  {
    id: 2,
    label: getMenuOptions( Vector , "Remove Assigned Attorney"),
    parentComponent: "current",
    componentToRender: "removeAttorney",
    showRemove: 'remove',
    operation: "remove",
    styles: {
      icon: {
        display: "flex",
      },
      text: {
        paddingLeft: "5px",
        fontWeight: 400,
      },
    },
  },
];


export const AttorneyPopupData = [
  {
    id: 1,
    type: 'radio',
    accessor: 'HasanAttorney',
    label: 'Attorney Assigned?',
    size: 'small',
    xs: 6.2,
    name: 'HasanAttorney',
    required: true,
    default: true,
    disabled: true,
    options: {
      optionsData: [
        {
          label: 'Yes',
          accessor: 'Yes',
          value: true,
          disabled: false
        },
        {
          label: 'No',
          accessor: 'No',
          value: false,
          disabled: true,
        }
      ]
    }
  },
  {
    id: 2,
    type: 'autocomplete',
    accessor: 'searchAttorneyToadd',
    label: 'Search attorney to add',
    size: 'small',
    xs: 6.2,
    name: 'searchAttorneyToadd',
    //required: true,
    default: false
  }
];