import * as React from "react";
import { Box, Paper } from "@oasis/react-core";
import { ToolbarData, ToolbarStructure, PositionedMenuAddItems, PositionedMenuEditItems } from "./AlertInfo.Data.js";
import ToolbarComponent from "../../Common/AEComponents/Toolbar/ToolbarComponent.js";
import PositionedMenu from "../../Common/AEComponents/Menu/PositionedMenu.js";
import AddAlert from "./AddAlert/AddAlert";
import ViewAlert from "./ViewAlert/ViewAlert.js";
import EditAlert from "./EditAlert/EditAlert.js";

export default function AlertInformation(props) {
  const [showDialog, setDialog] = React.useState(false);
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [editAnchorEl, setEditAnchorEl] = React.useState(null);
  const [menuItemsData, setmenuItemsData] = React.useState({});
  const [postionedMenuItems, setPositionedMenuItems] = React.useState([]);
  const [tableRowData, setTableRowData] = React.useState([]);
  const [popup, setPopup] = React.useState("");
  const addOpen = Boolean(addAnchorEl);
  const editOpen = Boolean(editAnchorEl);

  const handleDialog = (value, menuItem) => {
    setmenuItemsData(menuItem);
    setDialog(value);
  };
  const handleAddDialog = (value, d) => {
    setPopup(d);
    setDialog(value);
  };

  const handlePositionedMenu = (event, data, rowData) => {
    setDialog(false);
    if (data.operation == "add") {
      setPositionedMenuItems(PositionedMenuAddItems);
      setAddAnchorEl(event.currentTarget);
    } else {
      const arr = PositionedMenuEditItems.filter((item) => {
        return item.parentComponent == data.parentComponent;
      });
      setPositionedMenuItems(arr);
      setEditAnchorEl(event.currentTarget);
      setTableRowData(rowData);
    }
  };

  const handleClose = () => {
    if (addAnchorEl) {
      setAddAnchorEl(null);
    } else {
      setEditAnchorEl(null);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }} elevation={10}>
          <ToolbarComponent
            toolbarHeight="64px"
            ToolbarData={ToolbarData}
            handleClick={() => {
              handleAddDialog(!showDialog, "addAlert");
            }}
            data={{ operation: "add" }}
            ToolbarStructure={ToolbarStructure}
          />
          <ViewAlert
            handleClick={handlePositionedMenu}
            data={{ operation: "edit", parentComponent: "alert" }}
            handleDialog={handleAddDialog}
            showDialog={showDialog}
          />
        </Paper>
      </Box>
      {popup == "addAlert" ? <AddAlert showDialog={showDialog} handleDialog={handleDialog} /> : <></>}
      {menuItemsData?.componentToRender == "editAlert" ? (
        <EditAlert showDialog={showDialog} handleDialog={handleDialog} tableRowData={tableRowData} />
      ) : (
        <></>
      )}
      <PositionedMenu
        handleClose={handleClose}
        MenuItems={postionedMenuItems}
        showDialog={showDialog}
        handleDialog={handleDialog}
        open={addOpen ? addOpen : editOpen}
        anchorEl={addAnchorEl ? addAnchorEl : editAnchorEl}
      />
    </>
  );
}
