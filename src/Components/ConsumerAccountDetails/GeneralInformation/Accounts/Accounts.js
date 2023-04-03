import * as React from 'react';
import { Box, Paper } from '@oasis/react-core';
import AccountsInSet from './AccountsInSet/AccountsInSet';
import AllAccounts from './AllAccounts/AllAccounts';
import TabPanels from '../../../Common/AEComponents/Tabs/TabPanels.js';
import Panels from '../../../Common/AEComponents/Tabs/Panels.js';
import {
  TabsData,
  ToolbarData,
  ToolbarStructure,
  PositionedMenuEditItems,
} from './Accounts.Data.js';
import ToolbarComponent from '../../../Common/AEComponents/Toolbar/ToolbarComponent';
import { useNavigate } from 'react-router-dom';
import { GETDEPENDENTLIST } from '../../../../Actions/ConsumerDetails/ActionCreators';
import { connect } from 'react-redux';

function Accounts(props) {
  const navigate = useNavigate();
  const [tabValue, setTableValue] = React.useState('1');

  /*--------------------- handle tab function -----------------*/

  const handleTabChange = (event, newValue) => {
    setTableValue(newValue);
  };

  /*--------------------- handle popup function -----------------*/

  const handleRoute = (menuItemsdata, tableRowData) => {
    props.GETDEPENDENTLIST(tableRowData.accountUuid);
    localStorage.setItem('accountUuid', tableRowData.accountUuid);
    navigate(menuItemsdata.routePath);
  };

  const onRowAction = (action, row) => {
    const parentComponent = row.data.parentComponent;
    const arr = PositionedMenuEditItems[parentComponent].filter((item) => {
      return item.parentComponent == row.data.parentComponent;
    });
    handleRoute(arr[0], row);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }} elevation={10}>
          <ToolbarComponent
            tabs={<TabPanels TabsData={TabsData} value={tabValue} handleChange={handleTabChange} />}
            ToolbarData={ToolbarData}
            ToolbarStructure={ToolbarStructure}
          />
          <Panels
            TabsData={TabsData}
            value={tabValue}
            others={{ fixedTableHeight: true }}
            components={[
              {
                key: 'accountsInSet',
                value: (
                  <AccountsInSet
                    handleClick={onRowAction}
                    data={{
                      operation: 'view',
                      parentComponent: 'accountsInSet'
                    }}
                    menuItems={PositionedMenuEditItems.accountsInSet.map((item) => item.label)}
                    actions={['view']}
                  />
                )
              },
              {
                key: 'allAccounts',
                value: (
                  <AllAccounts
                    data={{ operation: 'view', parentComponent: 'allAccounts' }}
                    handleClick={onRowAction}
                    menuItems={PositionedMenuEditItems.allAccounts.map((item) => item.label)}
                    actions={['view']}
                  />
                )
              }
            ]}
          />
        </Paper>
      </Box>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    GETDEPENDENTLIST: async (accountUuid) => {
      await dispatch(GETDEPENDENTLIST(accountUuid));
    }
  };
}

export default connect(null, mapDispatchToProps)(Accounts);
