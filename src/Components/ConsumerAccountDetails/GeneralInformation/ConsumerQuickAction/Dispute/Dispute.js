import * as React from 'react';
import { Box, Paper } from '@oasis/react-core';
import { ToolbarData, ToolbarStructure, PositionedMenuEditItems } from './Dispute.Data.js';
import ToolbarComponent from '../../../../Common/AEComponents/Toolbar/ToolbarComponent.js';
import PositionedMenu from '../../../../Common/AEComponents/Menu/PositionedMenu.js';
import { connect } from 'react-redux';
import EditDispute from './EditDispute/EditDispute.js';
import { TRIGGERPOPUP } from '../../../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions.js';
import ViewDispute from './ViewDispute/ViewDispute.js';

function Dispute(props) {
  const [showDialog, setDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuItemsData, setmenuItemsData] = React.useState({});
  const [flag, setFlag] = React.useState(false);

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (props.quickActionMenuItems && Object.keys(props.quickActionMenuItems).length > 0) {
      setDialog(true);
    }
  }, [props.quickActionMenuItems]);

  React.useEffect(() => {
    if (props.dependentsOfResponsible?.length > 0) {
      const responsible = props.dependentsOfResponsible.find(
        (dependent) => dependent.id == localStorage.getItem('responsibleId')
      );
      if ('isDisputed' in responsible && responsible.isDisputed) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    }
  }, [props.dependentsOfResponsible]);

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value, menuItemsdata) => {
    setmenuItemsData(menuItemsdata);
    setDialog(value);
    if (!value) {
      props.TRIGGERPOPUP({});
    }
  };

  /*--------------------- handle positioned menu function -----------------*/

  const handlePositionedMenu = (event, data) => {
    setDialog(false);
    if (data.operation == 'update') {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    if (anchorEl) {
      setAnchorEl(null);
      return true;
    }
  };

  return (
    <>
      {flag && (
        <>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <ToolbarComponent
                ToolbarData={ToolbarData}
                handleClick={handlePositionedMenu}
                data={{ operation: 'update' }}
                ToolbarStructure={ToolbarStructure}
                toolbarHeight="48px"
              />
              <ViewDispute />
            </Paper>
          </Box>
          <PositionedMenu
            handleClose={handleClose}
            MenuItems={PositionedMenuEditItems}
            showDialog={showDialog}
            handleDialog={handleDialog}
            open={open}
            anchorEl={anchorEl}
          />
        </>
      )}
      {menuItemsData?.componentToRender == 'editDispute' && (
        <EditDispute showDialog={showDialog} handleDialog={handleDialog} />
      )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Dispute);
