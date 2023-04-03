import React from 'react';
import { Box, Paper } from '@mui/material';
import { ToolbarData, ToolbarStructure, PositionedMenuEditItems } from './Restrictions.Data';
import { Loader } from '@oasis/react-core';
import ToolbarComponent from '../../Common/AEComponents/Toolbar/ToolbarComponent';
import ViewRestrictions from './ViewRestrictions/ViewRestrictions.js';
import { getRestrictionsAPIcall } from '../ApiAction';
import EditRestrictions from './EditRestrictions/EditRestrictions';

const Restrictions = () => {
  const [loading, setLoading] = React.useState(true);
  const [restrictionsData, setRestrictionsData] = React.useState([]);
  const [tableRowData, setTableRowData] = React.useState([]);
  const [showDialog, setDialog] = React.useState(false);
  const [menuItemsData, setmenuItemsData] = React.useState({});

  const handleDialog = (value, menuItem) => {
    setDialog(value);
    setmenuItemsData(menuItem);
  };

  const onRowAction = (action, row) => {
    const arr = PositionedMenuEditItems.find((item) => {
      return item.name == action.props.children[1].props.children;
    });
    setTableRowData({ ...row, validationPeriodWaitDays: row.editValidationPeriodWaitDays, deliveryDays: row.editDeliveryDays });
    handleDialog(!showDialog, arr);
  };

  const getRestrictionsData = async () => {
    setLoading(true);
    const restrictions = await getRestrictionsAPIcall();
    const changedRestrictions = restrictions.map((item) => {
      return {
        ...item,
        editValidationPeriodWaitDays: item.validationPeriodWaitDays,
        editDeliveryDays: item.deliveryDays
      }
    })
    setRestrictionsData(changedRestrictions);
    setLoading(false);
  };

  React.useEffect(() => {
    getRestrictionsData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Box sx={{
        width: '100%',
        '& .MuiTableContainer-root': {
          height: 'calc(100vh - 170px)'
        }
      }}
      >
        <Paper sx={{ width: '100%', mb: 2 }} elevation={10}>
          <ToolbarComponent
            toolbarHeight="64px"
            toolbarLeftMargin="5px"
            ToolbarData={ToolbarData}
            ToolbarStructure={ToolbarStructure}
            justifyContent="space-between"
          />
          <ViewRestrictions
            restrictionsData={restrictionsData}
            handleClick={onRowAction}
            data={{ operation: "edit", parentComponent: "Restrictions" }}
            //handleDialog={handleAddDialog}
            showDialog={showDialog}
            actions={["edit"]}
          />
        </Paper>
      </Box>
      {menuItemsData?.componentToRender == "EditRestrictions" && (
        <EditRestrictions showDialog={showDialog} handleDialog={handleDialog} tableRowData={tableRowData} />
      )}
    </>
  );
};

export default Restrictions;
