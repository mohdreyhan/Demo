import { MuiButton } from "@oasis/react-core";
import AddInMenu from "../../../../Icons/IconsInMenu/AddInMenu.svg";
import EditInMenu from "../../../../Icons/IconsInMenu/EditInMenu.svg";
import MoreButton from "../../Common/AEComponents/More/MoreButton";
import { ColorPallete } from "../../../theme/ColorPallete.js";

export const ToolbarData = [ 
  {
    label: "Alerts",
    accessor: "alert",
  },
  {
    label: <MoreButton />,
    show:<MuiButton variant="outlined"
    style={{
      fontFamily: 'Poppins',
      fontSize: "14px",
      lineHeight: "21px",
      height:"29px",
      textTransform: "capitalize",
      color: ColorPallete.Button.Secondary,
    }}><div>Create New Alert</div></MuiButton>,
    accessor: "moreButton",
    operation: ["click"]
  },
];

export const ToolbarStructure = [
  {
    id: 1,
    tag: "div",
    component: "label",
    accessor: "alert",
    styles: {
      alignSelf: "center",
      display: "flex",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      color: ColorPallete.Text.Primary,
      paddingRight: "24px",
      width: "auto",
      whiteSpace: "nowrap"    
    },
  },

  {
    id: 2,
    tag: "div",
    component: "show",
    accessor: "moreButton",
    styles: {
      display: "flex",
      justifyContent: "flex-end",
      alignSelf: "center",
      variant: "outlined",
      width: "100%"
    },
  },
];

export const PositionedMenuAddItems = [
  
  {
    id: 1,
    label: <img src={AddInMenu} />,
    accessor: "Add Alert",
    componentToRender: "addAlert",
    styles: {
      display: "flex",
    },
  },
];

export const PositionedMenuEditItems = [
  {
    id: 1,
    label: <img src={EditInMenu} />,
    accessor: "Edit Alert",
    parentComponent : "alert",
    componentToRender: "editAlert",
    styles: {
      display: "flex",
      text: {
        paddingLeft: "5px",
        fontWeight: 400,
      },
    },
   
  },
];
