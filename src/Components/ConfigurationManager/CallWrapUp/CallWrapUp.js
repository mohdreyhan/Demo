import * as React from 'react';
import { Box, Paper } from '@mui/material';
import {
  ToolbarData,
  ToolbarStructure,
  PositionedMenuEditItemsActivate,
  PositionedMenuEditItemsDeactivate
} from './CallWrapUp.Data.js';
import ToolbarComponent from '../../Common/AEComponents/Toolbar/ToolbarComponent.js';
import ViewAlert from './CallWrapUpView/CallWrapUpView.js';
import AddCallWrapUp from './AddCallWrapUp/CallWrapAdd';
import EditCallWrapUp from '../CallWrapUp/CallWrapEdit/CallWrapEdit';
import { connect } from 'react-redux';
import { EDITCALLWRAPUP } from '../../../Actions/StaticData/ActionCreators';
import { scrollTop } from '../../Common/commonfunctions'


function CallWrapUp(props) {
  const [showDialog, setDialog] = React.useState(false);
  const formRef = React.useRef();
  const [menuItemsData, setmenuItemsData] = React.useState({});
  const [tableRowData, setTableRowData] = React.useState([]);
  const [popup, setPopup] = React.useState('');

  const handleApiCall = (rowData) => {
    const form = formRef;
    const obj = {
      ...rowData,
      active: !rowData.active
    };
    props.EDITCALLWRAPUP(form, obj, handleDialog, showDialog);
  };

  const handleAddDialog = (value, d) => {
    setPopup(d);
    setDialog(value);
  };

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value, menuItem) => {
    setDialog(value);
    setmenuItemsData(menuItem);
  };

  const onRowAction = (action, row) => {
    if (row.active) {
      const arr = PositionedMenuEditItemsActivate.filter((item) => {
        return item.name == action.props.children[1].props.children;
      });

      if (arr[0].operation?.includes('callApi')) {
        handleApiCall(row);
        setmenuItemsData(arr[0]);
      } else {
        handleDialog(!showDialog, arr[0]);
      }
    } else if (!row.active) {
      const arr = PositionedMenuEditItemsDeactivate.filter((item) => {
        return item.name == action.props.children[1].props.children;
      });
      if (arr[0].operation?.includes('callApi')) {
        handleApiCall(row);
        setmenuItemsData(arr[1]);
      } else {
        handleDialog(!showDialog, arr[0]);
      }
    }
    setTableRowData(row);
  };

  //NOSONAR
  // React.useEffect(()=>{
  //   scrollTop('configuremanager');
  // },[])

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }} elevation={10}>
          <ToolbarComponent
            toolbarHeight="64px"
            toolbarLeftMargin="5px"
            ToolbarData={ToolbarData}
            handleClick={() => {
              handleAddDialog(!showDialog, 'addCallOutCome');
            }}
            data={{ operation: 'add' }}
            ToolbarStructure={ToolbarStructure}
            justifyContent={'space-between'}
          />
          {popup == 'addCallOutCome' ? (
            <AddCallWrapUp showDialog={showDialog} handleDialog={handleAddDialog} />
          ) : (
            <></>
          )}
          <ViewAlert
            handleClick={onRowAction}
            data={{ operation: 'edit', parentComponent: 'CallWrapUp' }}
            handleDialog={handleAddDialog}
            showDialog={showDialog}
            actions={['edit', 'callApi']}
          />
        </Paper>
      </Box>
      {menuItemsData?.componentToRender == 'EditCallWrapUp' && (
        <EditCallWrapUp
          showDialog={showDialog}
          handleDialog={handleDialog}
          tableRowData={tableRowData}
        />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    callMethodsData: state.StaticDataReducer.callMethodsData,
    callWrapUpData: state.StaticDataReducer.callWrapUpData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    EDITCALLWRAPUP: async (form, editAlertInputs, handleDialog, showDialog) => {
      await dispatch(EDITCALLWRAPUP(form, editAlertInputs, handleDialog, showDialog));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CallWrapUp);
