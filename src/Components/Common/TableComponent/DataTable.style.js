import { makeStyles } from "@oasis/react-core";
import {ColorPallete} from '../../../theme/ColorPallete';

export default makeStyles(
  {
    tableContainer: {
      height: "100%",
      overflow: "auto",

      "& td": {
        cursor: "pointer",
      },
      "& .selected td": {
        background: ColorPallete.Table.Background,
        color:  ColorPallete.Table.Text,
      },
    },
    tableHeadSection: {
      padding: "10px",
      textAlign: "right",
      color:  ColorPallete.Table.Primary,
      fontSize: "14px",
      fontWeight: "600",
    },
    paginationSection: {
      textAlign: "right",
      fontSize: "14px",
      fontWeight: "400",
    },
    imageIcon: {
      display: "block",
      margin: "auto",
    },
    boxShadowCell: {
      boxShadow: "-2px 0px 2px rgba(68, 68, 68, 0.4)",
    },
    tableHeadStyle: {
      "& tr": {
        "& th": {
          fontSize: "12px !important",
          fontWeight: "700 !important",
          color: ColorPallete.Table.Secondary,
        },
      },
    },
    tableBodyStyle: {
      "& tr": {
        "& td": {
          fontSize: "14px !important",
        },
      },
    },
    tableActionButtons: {
      padding: "10px 15px",
      cursor: "pointer",
    },
  },
  { name: "DataTableStyle" }
);
