import * as React from 'react';
import { Box, Paper } from '@oasis/react-core';
import {
  ToolbarData,
  ToolbarStructure,
  PositionedMenuAddItems,
  PositionedMenuEditItems
} from './Complaints.Data.js';
import ToolbarComponent from '../../../../Common/AEComponents/Toolbar/ToolbarComponent.js';
import PositionedMenu from '../../../../Common/AEComponents/Menu/PositionedMenu.js';
import { connect } from 'react-redux';
//NOSONAR
// import EditComplaints from './EditComplaints/EditComplaints.js';
import { TRIGGERPOPUP } from '../../../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions.js';
import ViewComplaints from './ViewComplaints/ViewComplaints.js';

function Complaints(props) {
  const [showDialog, setDialog] = React.useState(false);
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [editAnchorEl, setEditAnchorEl] = React.useState(null);
  const [postionedMenuItems, setPositionedMenuItems] = React.useState([]);
  //NOSONAR
  // const [menuItemsData, setmenuItemsData] = React.useState({});
  const [showComplain, setShowComplain] = React.useState(false);
  //NOSONAR
  // const [tableRowData, setTableRowData] = React.useState([]);

  const addOpen = Boolean(addAnchorEl);
  const editOpen = Boolean(editAnchorEl);

  React.useEffect(() => {
    if (props.quickActionMenuItems && Object.keys(props.quickActionMenuItems).length > 0) {
      setDialog(true);
    }
  }, [props.quickActionMenuItems]);

  React.useEffect(() => {
    if (props.dependentsOfResponsible?.length > 0) {
      const consumer = props.dependentsOfResponsible.find(
        (dependent) => dependent.id === localStorage.getItem('responsibleId')
      );
      if (consumer?.hasComplaint) {
        setShowComplain(true);
      } else {
        setShowComplain(false);
      }
    }
  }, [props.dependentsOfResponsible]);

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value, menuItemsdata) => {

    setmenuItemsData(menuItemsdata);
    if (!value) {
      props.TRIGGERPOPUP({});
    } else {
      props.TRIGGERPOPUP(menuItemsdata.componentToRender);
      setDialog(value);
    }
  };

  /*--------------------- handle positioned menu function -----------------*/

  const handlePositionedMenu = (event, data, rowData) => {
    setDialog(false);
    if (data.operation == 'add') {
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
      return true;
    }
    setEditAnchorEl(null);
  };

  return (
    <>
      {showComplain && (
        <>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <ToolbarComponent
                ToolbarData={ToolbarData}
                handleClick={handlePositionedMenu}
                data={{ operation: 'add' }}
                ToolbarStructure={ToolbarStructure}
                toolbarHeight="48px"
              />
              <ViewComplaints
                handleClick={handlePositionedMenu}
                methodname={'Complaints'}
                data={{ operation: 'edit', parentComponent: 'complaints' }}
              />
            </Paper>
          </Box>
          <PositionedMenu
            handleClose={handleClose}
            MenuItems={postionedMenuItems}
            showDialog={showDialog}
            handleDialog={handleDialog}
            open={addOpen ? addOpen : editOpen}
            anchorEl={addAnchorEl ? addAnchorEl : editAnchorEl}
          />
        </>
      )}
      {/* //NOSONAR */}
      {/* {menuItemsData?.componentToRender == 'editComplaints' && (
        <EditComplaints
          showDialog={showDialog}
          handleDialog={handleDialog}
          tableRowData={tableRowData}
        />
      )} */}
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    quickActionMenuItems: state.ConsumerQuickActionsReducer.quickActionMenuItems,
    dependentsOfResponsible: state.ConsumerQuickActionsReducer.dependentsOfResponsible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TRIGGERPOPUP: async (menuItems) => {
      await dispatch(TRIGGERPOPUP(menuItems));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Complaints);
