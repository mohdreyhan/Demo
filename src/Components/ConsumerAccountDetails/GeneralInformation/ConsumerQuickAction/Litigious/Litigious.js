import * as React from 'react';
import { Box, Paper } from '@oasis/react-core';
import { ToolbarData, ToolbarStructure, PositionedMenuEditItems } from './Litigious.Data.js';
import ToolbarComponent from '../../../../Common/AEComponents/Toolbar/ToolbarComponent.js';
import PositionedMenu from '../../../../Common/AEComponents/Menu/PositionedMenu.js';
import { connect } from 'react-redux';
import ViewLitigious from './ViewLitigious/ViewLitigious.js';
import { TRIGGERPOPUP } from '../../../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions.js';
import EditLitigious from './EditLitigious/EditLitigious.js';
import { ADDLITIGIOUSINPUTS } from '../../../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions';

function Litigious(props) {
  const [showDialog, setDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuItemsData, setmenuItemsData] = React.useState({});

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (props.quickActionMenuItems && Object.keys(props.quickActionMenuItems).length > 0) {
      setDialog(true);
    }
  }, [props.quickActionMenuItems]);

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value, menuItemsdata) => {
    setmenuItemsData(menuItemsdata);
    setDialog(value);
    if (!value) {
      props.ADDLITIGIOUSINPUTS('reset');
      props.TRIGGERPOPUP({});
    }
  };

  /*--------------------- handle positioned menu function -----------------*/

  const handlePositionedMenu = (event, data, rowData) => {
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
      {props?.consumerDemographics[0]?.isLitigious && (
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
              <ViewLitigious />
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
      {menuItemsData?.componentToRender == 'editLitigious' && (
        <EditLitigious showDialog={showDialog} handleDialog={handleDialog} />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    quickActionMenuItems: state.ConsumerQuickActionsReducer.quickActionMenuItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDLITIGIOUSINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDLITIGIOUSINPUTS('', '', 'reset'));
      }
    },
    TRIGGERPOPUP: async (menuItems) => {
      await dispatch(TRIGGERPOPUP(menuItems));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Litigious);
