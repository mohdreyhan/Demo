import * as React from 'react';
import { Box, Paper } from '@mui/material';
import { ToolbarData, ToolbarStructure } from './StatusPrioritization.Data';
import ToolbarComponent from '../../Common/AEComponents/Toolbar/ToolbarComponent';
import ViewStatusPrioritization from './ViewStatusPrioritization/ViewStatusPrioritization';
import { Loader } from '@oasis/react-core';
import { getStatusCodePriority, getStatusCode } from '../ApiAction';
import AddStatusPrioritization from './AddStatusPrioritization/AddStatusPrioritization';
import { nestedIfCaseHandle } from '../../Common/commonfunctions';

function StatusPrioritization(props) {
  const [loading, setLoading] = React.useState([]);
  const [statusCodeData, setStatusCodeData] = React.useState([]);
  const [popup, setPopup] = React.useState('');
  const [showDialog, setDialog] = React.useState(false);
  const [tableData, setTableData] = React.useState({});
  const [statusCodesRes, setStatusCodesRes] = React.useState([]);

  const handleAddDialog = (showDialog, value) => {
    setDialog(showDialog);
    setPopup(value);
  };
  const getStatusCodeData = async () => {
    setLoading(true);
    let statusCodePriority = await getStatusCodePriority();
    const status = await getStatusCode();
    setStatusCodesRes(status);
    statusCodePriority?.sort((a, b) => {
      return nestedIfCaseHandle(a.priority < b.priority, -1, 1);
    });
    let priorityArray = nestedIfCaseHandle(
      statusCodePriority.length,
      statusCodePriority[statusCodePriority.length - 1],
      []
    );
    setTableData({
      numberOfPriority: nestedIfCaseHandle(
        statusCodePriority?.length,
        priorityArray?.priority + 1,
        1
      ),
      statusCodes: status
    });
    const statusCode = statusCodePriority.map((item) => {
      const statudDes = status.filter((data) => {
        if (item.statusCodeUUID == data.uuid) {
          return data;
        }
      });
      return {
        ...item,
        description: statudDes?.[0]?.description,
        accounHolderPhaseName: statudDes?.[0]?.accounHolderPhaseName || 'N/A'
      };
    });

    setStatusCodeData(statusCode);
    setLoading(false);
  };

  React.useEffect(() => {
    getStatusCodeData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Box
        sx={{
          width: '100%',
          '& .MuiTableContainer-root': {
            height: 'calc(100vh - 170px)'
          }
        }}>
        <Paper sx={{ width: '100%' }} elevation={10}>
          <ToolbarComponent
            toolbarHeight="64px"
            toolbarLeftMargin="5px"
            ToolbarData={ToolbarData}
            ToolbarStructure={ToolbarStructure}
            justifyContent={'space-between'}
            handleClick={() => {
              handleAddDialog(!showDialog, 'addStatusPrioritization');
            }}
          />
          {popup == 'addStatusPrioritization' ? (
            <AddStatusPrioritization
              showDialog={showDialog}
              handleDialog={handleAddDialog}
              tableData={tableData}
              statusCodesRes={statusCodesRes}
              getStatusCodeData={getStatusCodeData}
            />
          ) : (
            <></>
          )}
          <ViewStatusPrioritization statusCodeData={statusCodeData} />
        </Paper>
      </Box>
    </>
  );
}

export default StatusPrioritization;
