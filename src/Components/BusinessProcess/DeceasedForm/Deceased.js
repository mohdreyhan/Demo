import * as React from 'react';
import { Box, Paper } from '@oasis/react-core';
import { ToolbarData, ToolbarStructure, PositionedMenuEditItems } from './Deceased.Data.js';
import ToolbarComponent from '../../../Components/Common/AEComponents/Toolbar/ToolbarComponent';
import PositionedMenu from '../../../Components/Common/AEComponents/Menu/PositionedMenu.js';
import { connect } from 'react-redux';
import { TRIGGERPOPUP } from '../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions.js';
import DeceasedView from './DeceasedView/DeceasedView.js';
import EditDeceased from './EditDeceased.js';

function Deceased(props) {
  const [showDialog, setDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuItemsData, setmenuItemsData] = React.useState({});

  const [deceasedInfodata , setdeceasedInfodata] = React.useState([]);

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    if (props.quickActionMenuItems && Object.keys(props.quickActionMenuItems).length > 0) {
      setDialog(true);
    }
  }, [props.quickActionMenuItems]);

  React.useEffect(()=>{
    if(props.deceasedInfo.length > 0){
      setdeceasedInfodata(props.deceasedInfo);
    }
  },[props.deceasedInfo])

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value, menuItemsdata) => {
    setmenuItemsData(menuItemsdata);
    setDialog(value);
    if(!value) {
      props.TRIGGERPOPUP({})
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
      {props?.consumerDemographics[0]?.isDeceased && (
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
            <DeceasedView />
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
       {menuItemsData?.componentToRender == 'editDeceased' && (
        <EditDeceased
          showDialog={showDialog}
          handleDialog={handleDialog}
          tableRowData={deceasedInfodata.length > 0 ? deceasedInfodata :[]}
        />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    quickActionMenuItems: state.ConsumerQuickActionsReducer.quickActionMenuItems,
    deceasedInfo: state.ConsumerQuickActionsReducer.deceasedInformation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TRIGGERPOPUP: async (menuItems) => {
      await dispatch(TRIGGERPOPUP(menuItems));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Deceased);
