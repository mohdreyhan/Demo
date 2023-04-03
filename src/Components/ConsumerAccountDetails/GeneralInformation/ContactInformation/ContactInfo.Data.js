import ContactInformationIcon from "../../../../../Icons/ContactInformation.svg";
import AddInMenu from "../../../../../Icons/IconsInMenu/AddInMenu.svg";
import EditInMenu from "../../../../../Icons/IconsInMenu/EditInMenu.svg";
import MoreButton from "../../../Common/AEComponents/More/MoreButton";
import { ColorPallete } from "../../../../theme/ColorPallete";
import { getMenuOptions } from "../../../Common/commonfunctions";

export const TabsData = [
  {
      label: "Phone",
      component: "phone",
      value: "1"
  },
  {
      label: "Address",
      component: "address",
      value: "2"
  },
  {
      label: "Email",
      component: "email",
      value: "3"
  },
];

export const ToolbarData = [
  {
    label: <img src={ContactInformationIcon} style={{ width: "22px" }} />,
    accessor: "icon",
  },
  {
    label: "Contact Information",
    accessor: "contactInformation",
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
    size: 0.55,
    component: "label",
    accessor: "icon",
    styles: {
      alignSelf: "center",
      display: "flex",
      paddingRight: "8px",
    },
  },
  {
    id: 2,
    tag: "div",
    size: 3,
    component: "label",
    accessor: "contactInformation",
    styles: {
      alignSelf: "center",
      display: "flex",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      color: ColorPallete.Text.Primary,
      paddingRight: "24px",
      width: "auto",
      whiteSpace: "nowrap",
    },
  },
  {
    id: 3,
    tag: "div",
    size: 8.5,
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
      alignSelf: "center",
      width: "100%",
    },
  },
];

export const PositionedMenuAddItems = [
  {
    id: 1,
    label: <img src={AddInMenu} />,
    accessor: "Add Phone Number",
    componentToRender: "addPhone",
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
    label: <img src={AddInMenu} />,
    accessor: "Add Address",
    componentToRender: "addAddress",
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
    id: 3,
    label: <img src={AddInMenu} />,
    accessor: "Add Email",
    componentToRender: "addEmail",
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
  phone: [
    {
      id: 1,
      label: getMenuOptions(EditInMenu, "Edit Phone Number"),
      parentComponent: "phone",
      componentToRender: "editPhone",
    },
  ],
  address: [
    {
      id: 1,
      label: getMenuOptions(EditInMenu, "Edit Address"),
      parentComponent: "address",
      componentToRender: "editAddress",
    },
  ],
  email: [
    {
      id: 1,
      label: getMenuOptions(EditInMenu, "Edit Email"),
      parentComponent: "email",
      componentToRender: "editEmail",
    },
  ],
};

//NOSONAR
// export const PositionedMenuEditItems = [
//   {
//     id: 1,
//     label: <img src={EditInMenu} />,
//     accessor: "Edit Phone Number",
//     parentComponent: "phone",
//     componentToRender: "editPhone",
//     styles: {
//       icon: {
//         display: "flex",
//       },
//       text: {
//         paddingLeft: "5px",
//         fontWeight: 400,
//       },
//     },
//   },
//   {
//     id: 2,
//     label: <img src={EditInMenu} />,
//     accessor: "Edit Address",
//     parentComponent: "address",
//     componentToRender: "editAddress",
//     styles: {
//       icon: {
//         display: "flex",
//       },
//       text: {
//         paddingLeft: "5px",
//         fontWeight: 400,
//       },
//     },
//   },
//   {
//     id: 3,
//     label: <img src={EditInMenu} />,
//     accessor: "Edit Email",
//     parentComponent: "email",
//     componentToRender: "editEmail",
//     styles: {
//       icon: {
//         display: "flex",
//       },
//       text: {
//         paddingLeft: "5px",
//         fontWeight: 400,
//       },
//     },
//   },
// ];
