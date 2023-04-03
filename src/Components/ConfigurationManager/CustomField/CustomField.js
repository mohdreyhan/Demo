import * as React from 'react';
import { Box, Paper } from '@mui/material';
import { useDispatch } from "react-redux";
import { ToolbarDataArray, ToolbarStructureArray } from './CustomField.data';
import ToolbarComponent from '../../Common/AEComponents/Toolbar/ToolbarComponent';
import ViewCustomField from './ViewCustomField/ViewCustomField';
import { Loader } from '@oasis/react-core';
import { getCustomFields } from '../ApiAction';
import AddCustomField from './AddCustomField/AddCustomField';
import { GETCUSTOMFIELDLOCATION, GETCUSTOMFIELDDATATYPE } from '../../../Actions/StaticData/ActionCreators';

function CustomField(props) {
  const [loading, setLoading] = React.useState([]);
  const [showAddModal, setShowModal] = React.useState(false);
  const [customFieldsData, setCustomFieldsData] = React.useState([]);
  const dispatch = useDispatch();

  const handleDialog = () => setShowModal(prev => !prev);
  const getCustomFieldsData= async () => {
    setLoading(true);
    let customFields = await getCustomFields();
    setCustomFieldsData(customFields);
    setLoading(false);
  };

  React.useEffect(() => {
    getCustomFieldsData();
    dispatch(GETCUSTOMFIELDLOCATION());
    dispatch(GETCUSTOMFIELDDATATYPE());
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
            ToolbarData={ToolbarDataArray}
            ToolbarStructure={ToolbarStructureArray}
            justifyContent={'space-between'}
            handleClick={handleDialog}
          />
          <ViewCustomField customFieldsData={customFieldsData} />
        </Paper>
      </Box>
      <AddCustomField showDialog={showAddModal} handleDialog={handleDialog} fetchCustomFields={getCustomFieldsData} />
    </>
  );
}

export default CustomField;
