import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarData, ToolbarStructure, PositionedMenuEditItems } from './Bankruptcy.Data.js';
import { ADDBANKRUPTCYINPUTS, ADDTRUSTEEINPUTS, ADDCOURTINPUTS, TRIGGERPOPUP } from '../../../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions.js';
import ToolbarComponent from '../../../../Common/AEComponents/Toolbar/ToolbarComponent.js';
import PositionedMenu from '../../../../Common/AEComponents/Menu/PositionedMenu.js';
import { Box, Paper } from '@oasis/react-core';
import EditBankruptcy from './EditBankruptcy/EditBankruptcy.js';
import ViewBankruptcy from './ViewBankruptcy/ViewBankruptcy.js';

const Bankruptcy = (props) => {
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
      if ('isBankrupted' in responsible && responsible.isBankrupted) {
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
      props.ADDBANKRUPTCYINPUTS('reset');
      props.ADDCOURTINPUTS('reset');
      props.ADDTRUSTEEINPUTS('reset');    }
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
              <ViewBankruptcy />
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
     {menuItemsData?.componentToRender == 'editBankruptcy' && (
        <EditBankruptcy showDialog={showDialog} handleDialog={handleDialog} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dependentsOfResponsible: state.ConsumerQuickActionsReducer.dependentsOfResponsible,
    quickActionMenuItems: state.ConsumerQuickActionsReducer.quickActionMenuItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    TRIGGERPOPUP: async (menuItems) => {
      await dispatch(TRIGGERPOPUP(menuItems));
    },
    ADDBANKRUPTCYINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDBANKRUPTCYINPUTS('', '', 'reset'));
      }
    },
    ADDCOURTINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDCOURTINPUTS('', '', 'reset'));
      }
    },
    ADDTRUSTEEINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDTRUSTEEINPUTS('', '', 'reset'));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bankruptcy);
