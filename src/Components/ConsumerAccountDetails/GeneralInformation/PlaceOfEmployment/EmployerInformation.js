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
} from './EmployerInformation.Data';
import ToolbarComponent from '../../../Common/AEComponents/Toolbar/ToolbarComponent.js';
import AddEmployer from './AddEmployer/AddEmployer.js';
import PositionedMenu from '../../../Common/AEComponents/Menu/PositionedMenu.js';
import ViewHistoricalEmployer from './Historical/ViewHistoricalEmployer.js';
import { connect } from 'react-redux';
import { ADDEMPLOYERINPUTS } from '../../../../Actions/ConsumerDetails/Actions.js';
import EditEmployer from './EditEmployer/EditEmployer.js';
import ViewCurrentEmployer from './Current/ViewCurrentEmployer.js';

function EmployerInformation(props) {
  const [tabValue, setTableValue] = React.useState('1');
  const [showDialog, setDialog] = React.useState(false);
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [menuItemsData, setmenuItemsData] = React.useState({});
  const [postionedMenuItems, setPositionedMenuItems] = React.useState([]);
  const [tableRowData, setTableRowData] = React.useState([]);

  const addOpen = Boolean(addAnchorEl);

  /*--------------------- handle tab function -----------------*/

  const handleTabChange = (event, newValue) => {
    setTableValue(newValue);
  };

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value, menuItemsdata) => {
    setmenuItemsData(menuItemsdata);
    setDialog(value);
    if (!value) {
      props.ADDEMPLOYERINPUTS('reset');
    }
  };

  /*--------------------- handle positioned menu function -----------------*/

  const handlePositionedMenu = (event, data) => {
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

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }} elevation={10}>
          <ToolbarComponent
            tabs={<TabPanels TabsData={TabsData} value={tabValue} handleChange={handleTabChange} />}
            ToolbarData={ToolbarData}
            ToolbarStructure={ToolbarStructure}
            handleClick={handlePositionedMenu}
            data={{ operation: 'add' }}
          />
          <Panels
            TabsData={TabsData}
            value={tabValue}
            others={{ fixedTableHeight: true }}
            components={[
              {
                key: 'current',
                value: (
                  <ViewCurrentEmployer
                    handleClick={onRowAction}
                    data={{ operation: 'edit', parentComponent: 'current' }}
                    menuItems={PositionedMenuEditItems.current.map((item) => item.label)}
                    actions={['edit']}
                  />
                )
              },
              {
                key: 'historical',
                value: (
                  <ViewHistoricalEmployer
                    handleClick={onRowAction}
                    data={{ operation: 'edit', parentComponent: 'historical' }}
                    menuItems={PositionedMenuEditItems.historical.map((item) => item.label)}
                    actions={['edit']}
                  />
                )
              }
            ]}
          />
        </Paper>
      </Box>

      {/******************* RENDER ADD COMPONENTS ***********************************/}

      {menuItemsData?.componentToRender == 'addEmployer' && (
        <AddEmployer showDialog={showDialog} handleDialog={handleDialog} />
      )}

      {/******************* RENDER EDIT COMPONENTS ***********************************/}

      {menuItemsData?.componentToRender == 'editCurrent' && (
        <EditEmployer
          showDialog={showDialog}
          handleDialog={handleDialog}
          tableRowData={tableRowData}
          formType="current"
        />
      )}
      {menuItemsData?.componentToRender == 'editHistorical' && (
        <EditEmployer
          showDialog={showDialog}
          handleDialog={handleDialog}
          tableRowData={tableRowData}
          formType="historical"
        />
      )}

      <PositionedMenu
        handleClose={handleClose}
        MenuItems={postionedMenuItems}
        showDialog={showDialog}
        handleDialog={handleDialog}
        open={addOpen}
        anchorEl={addAnchorEl}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    ADDEMPLOYERINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDEMPLOYERINPUTS('', '', 'reset'));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerInformation);
