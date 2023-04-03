import MoreButton from "../../Common/AEComponents/More/MoreButton";
import { ColorPallete } from "../../../theme/ColorPallete";
import { extractImagePath } from "../../Common/commonfunctions";

export const ToolbarData = [
  {
    label: <img src={extractImagePath("queue.png")} style={{ width: "19px" }} />,
    accessor: "icon",
  },
  {
    label: "Queue",
    accessor: "queue",
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
    accessor: "queue",
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

