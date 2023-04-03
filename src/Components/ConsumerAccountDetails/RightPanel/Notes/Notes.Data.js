import AddInMenu from "../../../../../Icons/IconsInMenu/AddInMenu.svg";

import PhoneInMenu from "../../../../../Icons/IconsInMenu/PhoneInMenu.svg";

export const addItemsMenu = [
  {
    id: 1,
    label: <img src={PhoneInMenu} />,
    accessor: "Call Wrap Up",
    type: 'add',
    componentToRender: "addCallWrapUp",
    divider: "Yes",
    styles: {
      divider: {},
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
    accessor: "New Note",
    type: 'add',
    componentToRender: "addNewNote",
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
    accessor: "Special Note",
    type: 'add',
    componentToRender: "addSpecialNote",
    styles: {
      icon: {
        display: "flex",
      },
      text: {
        paddingLeft: "5px",
        fontWeight: 400,
      },
      disabled: true,
    },
  },
];

export const filterMenuItems = [
  {
    id: 1,
    label: <></>,
    accessor: "All Notes",
    type: 'filter',
    componentToRender: "All Notes",
    styles: {
      menuItem: {
        flexDirection: "row-reverse",
        display: "flex",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "rgb(95 156 205 / 42% ) !important",
        },
      },
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
    label: <></>,
    accessor: "Agent Notes",
    type: 'filter',
    componentToRender: "Agent Notes",
    styles: {
      menuItem: {
        flexDirection: "row-reverse",
        display: "flex",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "rgb(95 156 205 / 42% ) !important",
        },
      },
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
    label: <></>,
    accessor: "System Notes",
    type: 'filter',
    componentToRender: "System Notes",
    styles: {
      menuItem: {
        flexDirection: "row-reverse",
        display: "flex",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "rgb(95 156 205 / 42% ) !important",
        },
      },
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
    id: 4,
    label: <></>,
    accessor: "Call Wrap Up Notes",
    type: 'filter',
    componentToRender: "Call Wrap Up Notes",
    styles: {
      menuItem: {
        flexDirection: "row-reverse",
        display: "flex",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "rgb(95 156 205 / 42% ) !important",
        },
      },
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
