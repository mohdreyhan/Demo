import PlaceOfEmploymentIcon from "../../../../../Icons/PlaceOfEmployment.svg";
import AddIcon from "../../../../../Icons/AddIcon.svg";
import EditInMenu from "../../../../../Icons/IconsInMenu/EditInMenu.svg";
import MoreButton from "../../../Common/AEComponents/More/MoreButton.js";
import { getMenuOptions } from "../../../Common/commonfunctions";

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

export const ToolbarData = [
  {
    label: <img src={PlaceOfEmploymentIcon} />,
    accessor: "icon",
  },
  {
    label: "Place of Employment",
    accessor: "placeOfEmployment",
  },
  {
    accessor: "tabs",
  },
  {
    label: <MoreButton />,
    accessor: "moreButton",
    operation: ["click"],
  },
];

export const ToolbarStructure = [
  {
    id: 1,
    tag: "div",
    size: 0.6,
    component: "label",
    accessor: "icon",
    styles: {
      paddingRight: "8px",
    },
  },
  {
    id: 2,
    tag: "div",
    size: 3.7,
    component: "label",
    accessor: "placeOfEmployment",
    styles: {
      alignSelf: "center",
      display: "flex",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      color: "#444444",
      paddingRight: "24px",
      width: "auto",
      whiteSpace: "nowrap",
    },
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
    tag: "div",
    size: 1,
    component: "label",
    accessor: "moreButton",
    styles: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
  },
];

export const PositionedMenuAddItems = [
  {
    label: <img src={AddIcon} />,
    accessor: "Add New Employer",
    componentToRender: "addEmployer",
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

export const PositionedMenuEditItems = {
  current: [
    {
      id: 1,
      label: getMenuOptions(EditInMenu, "Update Place of Employment"),
      parentComponent: "current",
      componentToRender: "editCurrent",
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
  ],
  historical: [
    {
      id: 1,
      label: getMenuOptions(EditInMenu, "Update Place of Employment"),
      parentComponent: "historical",
      componentToRender: "editHistorical",
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
  ],
}