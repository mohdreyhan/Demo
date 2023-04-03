import * as React from 'react';
import { Box, Paper } from '@oasis/react-core';
import TabPanels from '../../../Common/AEComponents/Tabs/TabPanels.js';
import Panels from '../../../Common/AEComponents/Tabs/Panels.js';
import {
  TabsData,
  ToolbarData,
  ToolbarStructure,
  PositionedMenuAddItems,
  PositionedMenuEditItems
} from './ContactInfo.Data.js';
import ToolbarComponent from '../../../Common/AEComponents/Toolbar/ToolbarComponent.js';
import PositionedMenu from '../../../Common/AEComponents/Menu/PositionedMenu.js';
import ViewPhone from './Phone/ViewPhone/ViewPhone.js';
import AddPhone from './Phone/AddPhone/AddPhone.js';
import ViewAddress from './Address/ViewAddress/ViewAddress';
import ViewEmail from './Email/ViewEmail/ViewEmail.js';
import AddEmail from './Email/AddEmail/AddEmail';
import EditEmail from './Email/EditEmail/EditEmail.js';
import AddAddress from './Address/AddAddress/AddAddress.js';
import EditPhone from './Phone/EditPhone/EditPhone';
import { connect } from 'react-redux';
import {
  ADDADDRESSINPUTS,
  ADDEMAILINPUTS,
  ADDPHONEINPUTS
} from '../../../../Actions/ConsumerDetails/ContactInformation/Actions';
import { ALLSTATES } from '../../../../Actions/StaticData/Actions';
import EditAddress from './Address/EditAddress/EditAddress.js';
import MoreButton from '../../../Common/AEComponents/More/MoreButton.js';

function ContactInformation(props) {
  const [tabValue, setTableValue] = React.useState('1');
  const [showDialog, setDialog] = React.useState(false);
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [editAnchorEl, setEditAnchorEl] = React.useState(null);
  const [menuItemsData, setmenuItemsData] = React.useState({});
  const [postionedMenuItems, setPositionedMenuItems] = React.useState([]);
  const [tableRowData, setTableRowData] = React.useState([]);
  const [toolbarData, setToolbatData] = React.useState([ToolbarData]);

  const addOpen = Boolean(addAnchorEl);
  const editOpen = Boolean(editAnchorEl);

  /*--------------------- handle tab function -----------------*/

  const handleTabChange = (event, newValue) => {
    setTableValue(newValue);
  };

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value, menuItemsdata) => {
    setmenuItemsData(menuItemsdata);
    setDialog(value);
    if (!value) {
      props.ADDADDRESSINPUTS('reset');
      props.ADDEMAILINPUTS('reset');
      props.ADDPHONEINPUTS('reset');
      props.ALLSTATES();
    }
  };

  /*--------------------- handle positioned menu function -----------------*/

  const handlePositionedMenu = (event, data) => {
    setDialog(false);
    if (data.operation == 'add') {
      setPositionedMenuItems(PositionedMenuAddItems);
      setAddAnchorEl(event.currentTarget);
    }
  };

  const onRowAction = (action, row) => {
    const parentComponent = row.data.parentComponent;
    const arr = PositionedMenuEditItems[parentComponent].filter((item) => {
      return item.parentComponent == row.data.parentComponent;
    });
    setTableRowData(row);
    handleDialog(!showDialog, arr[0]);
  };

  const handleClose = () => {
    if (addAnchorEl) {
      setAddAnchorEl(null);
      return true;
    }
    setEditAnchorEl(null);
  };

  React.useState(() => {
    const arr = ToolbarData.map((toolbar) => {
      if (toolbar.accessor === 'moreButton') {
        if (!(props.consumerSkipVerification || props.consumerVerification)) {
          toolbar.label = <></>;
          toolbar.disabled = true;
          return toolbar;
        } else {
          toolbar.label = <MoreButton />;
          toolbar.disabled = false;
          return toolbar;
        }
      } else {
        return toolbar;
      }
    });
    if (arr.length > 0) {
      setToolbatData(arr);
    }
  }, [props.consumerSkipVerification, props.consumerVerification]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <ToolbarComponent
            tabs={<TabPanels TabsData={TabsData} value={tabValue} handleChange={handleTabChange} />}
            ToolbarData={toolbarData}
            handleClick={handlePositionedMenu}
            data={{ operation: 'add' }}
            ToolbarStructure={ToolbarStructure}
          />
          <Panels
            TabsData={TabsData}
            value={tabValue}
            others={{ fixedTableHeight: true }}
            components={[
              {
                key: 'phone',
                value: (
                  <ViewPhone
                    handleClick={onRowAction}
                    methodname={'Phone'}
                    data={{ operation: 'edit', parentComponent: 'phone' }}
                    menuItems={PositionedMenuEditItems.phone.map((item) => item.label)}
                    actions={['edit']}
                  />
                )
              },
              {
                key: 'address',
                value: (
                  <ViewAddress
                    handleClick={onRowAction}
                    methodname={'Address'}
                    data={{ operation: 'edit', parentComponent: 'address' }}
                    menuItems={PositionedMenuEditItems.address.map((item) => item.label)}
                    actions={['edit']}
                  />
                )
              },
              {
                key: 'email',
                value: (
                  <ViewEmail
                    handleClick={onRowAction}
                    methodname={'Email'}
                    data={{ operation: 'edit', parentComponent: 'email' }}
                    menuItems={PositionedMenuEditItems.email.map((item) => item.label)}
                    actions={['edit']}
                  />
                )
              }
            ]}
          />
        </Paper>
      </Box>

      {/******************* RENDER ADD COMPONENTS ***********************************/}

      {menuItemsData?.componentToRender == 'addPhone' && (
        <AddPhone showDialog={showDialog} handleDialog={handleDialog} />
      )}
      {menuItemsData?.componentToRender == 'addAddress' && (
        <AddAddress showDialog={showDialog} handleDialog={handleDialog} />
      )}
      {menuItemsData?.componentToRender == 'addEmail' && (
        <AddEmail showDialog={showDialog} handleDialog={handleDialog} />
      )}

      {/******************* RENDER EDIT COMPONENTS ***********************************/}

      {menuItemsData?.componentToRender == 'editPhone' && (
        <EditPhone
          showDialog={showDialog}
          handleDialog={handleDialog}
          tableRowData={tableRowData}
        />
      )}
      {menuItemsData?.componentToRender == 'editEmail' && (
        <EditEmail
          showDialog={showDialog}
          handleDialog={handleDialog}
          tableRowData={tableRowData}
        />
      )}

      {menuItemsData?.componentToRender == 'editAddress' && (
        <EditAddress
          showDialog={showDialog}
          handleDialog={handleDialog}
          tableRowData={tableRowData}
        />
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

function mapStateToProps(state) {
  return {
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDADDRESSINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDADDRESSINPUTS('', '', 'reset'));
      }
    },
    ADDEMAILINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDEMAILINPUTS('', '', 'reset'));
      }
    },
    ADDPHONEINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDPHONEINPUTS('', '', 'reset'));
      }
    },
    ALLSTATES: async () => {
      await dispatch(ALLSTATES({}));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactInformation);
