import { Button } from "@mui/material";
import AddInMenu from "../../../../Icons/IconsInMenu/AddInMenu.svg";
import EditInMenu from "../../../../Icons/IconsInMenu/EditInMenu.svg";
import CheckCircleOutlineIcon from "../../../../Icons/CallWrapIcon/TickmarkIcon.svg";
import CrossIcon from "../../../../Icons/CallWrapIcon/CrossIcon.svg";
import { ColorPallete } from "../../../theme/ColorPallete";

export const ToolbarData = [
  {
    label: "Call Wrap Up",
    accessor: "heading",
  },
  {
    label: (
      <Button
        variant="outlined"
        style={{
          fontFamily: "Poppins",
          fontSize: "14px",
          lineHeight: "21px",
          height: "29px",
          textTransform: "capitalize",
          color: ColorPallete.Button.Secondary,
          border: `1px solid ${ColorPallete.Button.Primary}`
        }}
      >
        <div>Add New Call OutCome</div>
      </Button>
    ),
    accessor: "moreButton",
    operation: ["click"],
  },
];

export const ToolbarStructure = [
  {
    id: 1,
    tag: "div",
    size: 3,
    component: "label",
    accessor: "heading",
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
    id: 2,
    tag: "div",
    size: 10,
    component: "label",
    accessor: "moreButton",
    styles: {
      display: "flex",
      justifyContent: "flex-end",
      alignSelf: "center",
      variant: "outlined",
    },
  },
];

export const PositionedMenuAddItems = [
  {
    label: <img src={AddInMenu} />,
    accessor: "Add New Call Outcome",
    componentToRender: "addCallOutCome",
    styles: {
      display: "flex",
    },
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

export const PositionedMenuEditItemsActivate = [
  {
    id: 1,
    label: getMenuOptions(EditInMenu, "Edit Outcome Description"),
    parentComponent: "CallWrapUp",
    componentToRender: "EditCallWrapUp",
    operation: ["edit"],
    name: "Edit Outcome Description"
  },
  {
    id: 2,
    label: getMenuOptions(CrossIcon, "Deactivate Outcome"),
    parentComponent: "CallWrapUp",
    componentToRender: "callApi",
    operation: ["callApi"],
    name: "Deactivate Outcome",
  },
];

export const PositionedMenuEditItemsDeactivate = [
  {
    id: 1,
    label: getMenuOptions(EditInMenu, "Edit Outcome Description"),
    parentComponent: "CallWrapUp",
    componentToRender: "EditCallWrapUp",
    operation: ["edit"],
    name: "Edit Outcome Description"
  },
  {
    id: 2,
    label: getMenuOptions(CheckCircleOutlineIcon, "Activate Outcome"),
    parentComponent: "CallWrapUp",
    componentToRender: "callApi",
    operation: ["callApi"],
    name: "Activate Outcome",
  },
];