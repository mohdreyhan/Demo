import * as React from 'react';
import { Box, Paper } from '@oasis/react-core';
import { ToolbarData, ToolbarStructure} from './QueueViewComponent.data';
import ToolbarComponent from '../../../Components/Common/AEComponents/Toolbar/ToolbarComponent';
import { connect } from 'react-redux';
import QueueView from './QueueView/QueueView';
import {
  GETQUEUEDATA
} from '../../../Actions/ConsumerDetails/ActionCreators';

function QueueViewComponent(props) {
  //NOSONAR
  //const [anchorEl, setAnchorEl] = React.useState(null);
  // const [tableRowData, setTableRowData] = React.useState([]);
  // const [menuItemsData, setmenuItemsData] = React.useState({});

  const [queueListval , setqueueListval] = React.useState([]);

  //NOSONAR
  //const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (props.quickActionMenuItems && Object.keys(props.quickActionMenuItems).length > 0) {
      setDialog(true);
    }
  }, [props.quickActionMenuItems]);

  React.useEffect(()=>{
    if(props.queueListdata.length > 0){
      setqueueListval(props?.queueListdata[0]?.queues ?? []);
    }
  },[props.queueListdata])

  React.useEffect(()=>{
      props.GETQUEUEDATA(90901);
  },[])
 
 
  /*--------------------- handle popup function -----------------*/

  //NOSONAR
  // const handleDialog = (value, menuItemsdata) => {
  //   setmenuItemsData(menuItemsdata);
  //   setDialog(value);
  // };

  /*--------------------- handle positioned menu function -----------------*/

  const handlePositionedMenu = (event, data, rowData) => {
    setDialog(false);
    //NOSONAR
    // if (data.operation == 'update') {
    //   setAnchorEl(event.currentTarget);
    // }
  };

  //NOSONAR
  // const handleClose = () => {
  //   if (anchorEl) {
  //     setAnchorEl(null);
  //     return true;
  //   }
  // };

  return (
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
            <QueueView queueListval={queueListval} />
            </Paper>
          </Box>

        {/* NOSONAR */}
          {/* <PositionedMenu
            handleClose={handleClose}
            MenuItems={PositionedMenuEditItems}
            showDialog={showDialog}
            handleDialog={handleDialog}
            open={open}
            anchorEl={anchorEl}
          /> */}
        </>
  );
}
function mapStateToProps(state) {
  return {
    queueListdata: state.ConsumerDetailsReducer.queueListdata,
    portfolioId: state.ConsumerDetailsReducer.portfolioId

  };
}

//NOSONAR
function mapDispatchToProps(dispatch) {
  return {
    GETQUEUEDATA: async (portfolioId) => {
      await dispatch(GETQUEUEDATA(portfolioId));
    }
  };
}
export default connect(mapStateToProps , mapDispatchToProps)(QueueViewComponent);
