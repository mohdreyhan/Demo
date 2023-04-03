import * as React from 'react';
import { Box, Paper } from '@oasis/react-core';
import {
  TabsData,
  ToolbarData,
  ToolbarStructure,
  PositionedMenuAddItemsNoRecord,
  PositionedMenuAddItems,
  PositionedMenuEditItems,
  getAssignedLabel
} from './Attorney.Data';
import ToolbarComponent from '../../../Common/AEComponents/Toolbar/ToolbarComponent.js';
import TabPanels from '../../../Common/AEComponents/Tabs/TabPanels.js';
import Panels from '../../../Common/AEComponents/Tabs/Panels.js';
import AddAttorney from './AddAttorney/AddAttorney';
import EditAttorney from './EditAttorney/EditAttorney';
import { connect } from 'react-redux';
import PositionedMenu from '../../../Common/AEComponents/Menu/PositionedMenu.js';
import ViewCurrentAttorney from './ViewAttorney/Current/ViewCurrentAttorney';
import ViewHistoricalAttorney from './ViewAttorney/Historical/ViewHistoricalAttorney';
import MoreButton from '../../../Common/AEComponents/More/MoreButton';
import VerifiedIcon from '../../../../../Icons/verified.png';
import { ADDATTORNEYINPUTS } from '../../../../Actions/ConsumerDetails/Legal/Actions';
import { ATTORNEYTOHISTORY } from '../../../../Actions/ConsumerDetails/Legal/ActionCreators';

import CancelAttorneyForm from '../Attorney/CancelAttorney/CancelFormattorney';
import RemoveAttorney from '../Attorney/RemoveAttorney/RemoveAttorney';

const modifyToolbarData = (newValue, assignedAttorneyFlag, assignedAttorneys) => {
  return ToolbarData.map((toolbar) => {
    if (toolbar.accessor === 'moreButton') {
      if (newValue == '2') {
        toolbar.label = <MoreButton disabled={true} />;
        toolbar.disabled = true;
        return toolbar;
      } else {
        toolbar.label = <MoreButton />;
        toolbar.disabled = false;
        return toolbar;
      }
    }
    if (toolbar.accessor == 'attorneyAssigned') {
      if (
        (assignedAttorneys &&
          assignedAttorneys.filter((attorney) => !attorney.historical).length > 0) ||
        (assignedAttorneyFlag && assignedAttorneyFlag[0]?.toBeAssigned)
      ) {
        toolbar.label = getAssignedLabel(VerifiedIcon, 'Attorney Assigned');
        return toolbar;
      } else {
        toolbar.label = '';
        return toolbar;
      }
    } else {
      return toolbar;
    }
  });
};

const Legal = (props) => {
  const [tabValue, setTableValue] = React.useState('1');
  const [showDialog, setDialog] = React.useState(false);
  const [addAnchorEl, setAddAnchorEl] = React.useState(null);
  const [editAnchorEl, setEditAnchorEl] = React.useState(null);
  const [menuItemsData, setmenuItemsData] = React.useState({});
  const [postionedMenuItems, setPositionedMenuItems] = React.useState([]);
  const [toolbarData, setToolbatData] = React.useState(ToolbarData);
  const [tableRowData, setTableRowData] = React.useState([]);
  const [showCancel, setshowCancel] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [showRemoveAttorney, setshowRemoveAttorney] = React.useState(true);

  const addOpen = Boolean(addAnchorEl);
  const editOpen = Boolean(editAnchorEl);
  let attorneyAssigned = props.assignedAttorneyFlag.length > 0 ? true : false;

  React.useEffect(() => {
    const arr = modifyToolbarData('', props.assignedAttorneyFlag, props.assignedAttorneys);
    if (arr.length > 0) {
      setToolbatData(arr);
    }
  }, [props.assignedAttorneyFlag]);

  /*--------------------- handle tab function -----------------*/

  const handleTabChange = (event, newValue) => {
    setTableValue(newValue);
    const arr = modifyToolbarData(newValue, props.assignedAttorneyFlag, props.assignedAttorneys);
    if (arr.length > 0) {
      setToolbatData(arr);
    }
  };
  /*----------------------------- Remove Attorney -------------------------------------*/
  const handleDialogRemove = (value, buttonType) => {
    if (buttonType === 'goback' && !value) {
      setshowRemoveAttorney(false);
    } else if (buttonType === undefined && !value) {
      setshowRemoveAttorney(false);
    } else {
      let attorneyid = tableRowData.id;
      props.ATTORNEYTOHISTORY(attorneyid, setshowRemoveAttorney);
    }
  };

  /* ----------------------------------------------------------------*/

  const handleDialogCancel = (value, buttonType) => {
    if (buttonType === 'goback') {
      setshowCancel(false);
      setDialog(true);
    } else {
      setDialog(false);
      setshowCancel(false);
      setShowForm(false);
      props.ADDATTORNEYINPUTS('reset');
    }
  };
  /*----------------------- handle pop up close  -------------------------------*/
  const handleCloseDialog = (value) => {
    setshowCancel(false);
    setDialog(value);
    setShowForm(false);
    props.ADDATTORNEYINPUTS('reset');
  };

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value, param2) => {
    setshowRemoveAttorney(true);
    if (typeof param2 == 'object') {
      setDialog(value);
      setmenuItemsData(param2);
    } else if (param2 == 'showCancel' && showForm) {
      setshowCancel(true);
    } else if (param2 == undefined && !showForm) {
      setDialog(value);
      setshowCancel(false);
      props.ADDATTORNEYINPUTS('', '', 'reset');
    } else if (param2 == undefined && showForm) {
      setshowCancel(true);
      setDialog(value);
    } else {
      setshowCancel(false);
      setDialog(value);
      props.ADDATTORNEYINPUTS('reset');
    }
  };

  const handleEditDialog = (value, param2) => {
    if (typeof param2 == 'object') {
      setDialog(value);
      setmenuItemsData(param2);
    } else {
      setshowCancel(false);
      setDialog(value);
      props.ADDATTORNEYINPUTS('reset');
    }
  };

  /*--------------------- handle positioned menu function -----------------*/

  const handlePositionedMenu = (event, data, rowData) => {
    setDialog(false);
    if (data.operation == 'add') {
      setPositionedMenuItems(PositionedMenuAddItems);
      setAddAnchorEl(event.currentTarget);
    } else if (data.operation == 'assign') {
      setPositionedMenuItems(PositionedMenuAddItemsNoRecord);
      setAddAnchorEl(event.currentTarget);
    } else if (data.operation == 'remove') {
      setshowRemoveAttorney(true);
    } else {
      const arr = PositionedMenuEditItems.filter((item) => {
        return item.parentComponent == data.parentComponent;
      });
      setPositionedMenuItems(arr);
      setEditAnchorEl(event.currentTarget);
      setTableRowData(rowData);
    }
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
        <Paper sx={{ width: '100%', mb: 2 }}>
          <ToolbarComponent
            tabs={<TabPanels TabsData={TabsData} value={tabValue} handleChange={handleTabChange} />}
            ToolbarData={toolbarData}
            data={{ operation: attorneyAssigned ? 'add' : 'assign' }}
            ToolbarStructure={ToolbarStructure}
            handleClick={handlePositionedMenu}
            toolbarHeight="49px !important"
          />

          <Panels
            TabsData={TabsData}
            value={tabValue}
            components={[
              {
                key: 'current',
                value: (
                  <ViewCurrentAttorney
                    handleClick={handlePositionedMenu}
                    data={{ operation: 'edit', parentComponent: 'current' }}
                  />
                )
              },
              {
                key: 'historical',
                value: (
                  <ViewHistoricalAttorney
                    handleClick={handlePositionedMenu}
                    data={{ operation: 'edit', parentComponent: 'historical' }}
                  />
                )
              }
            ]}
          />
        </Paper>
      </Box>

      {(menuItemsData?.componentToRender == 'assignAttorney' ||
        menuItemsData?.componentToRender == 'updateAttorney') &&
        !showCancel && (
          <AddAttorney
            showDialog={showDialog}
            handleDialog={handleDialog}
            handleCloseDialog={handleCloseDialog}
            formOperation={menuItemsData?.componentToRender}
            attorneyAssigned={attorneyAssigned}
            setShowForm={setShowForm}
            showForm={showForm}
          />
        )}

      {showCancel && (
        <CancelAttorneyForm showDialog={showCancel} handleDialog={handleDialogCancel} />
      )}

      {menuItemsData?.componentToRender == 'editAttorney' && !showCancel && (
        <EditAttorney
          showDialog={showDialog}
          handleDialog={handleEditDialog}
          formOperation={menuItemsData?.componentToRender}
          attorneyAssigned={attorneyAssigned}
          setShowForm={setShowForm}
          showForm={showForm}
          tableRowData={tableRowData}
        />
      )}

      {menuItemsData?.componentToRender == 'removeAttorney' &&
        menuItemsData?.parentComponent == 'current' &&
        !showCancel && (
          <RemoveAttorney showDialog={showRemoveAttorney} handleDialog={handleDialogRemove} />
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
};

function mapStateToProps(state) {
  return {
    assignedAttorneys: state.LegalReducer.assignedAttorneys,
    assignedAttorneyFlag: state.LegalReducer.assignedAttorneyFlag,
    attorneyList: state.LegalReducer.assignedAttorneyFlag,
    attorneyCancelpage: state.LegalReducer.attorneyCancelpage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDATTORNEYINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDATTORNEYINPUTS('', '', 'reset'));
      }
    },
    ATTORNEYCANCELPAGE: async (value) => {
      await dispatch(ATTORNEYCANCELPAGE(value));
    },
    ATTORNEYTOHISTORY: async (attorneyId, handleClose) => {
      await dispatch(ATTORNEYTOHISTORY(attorneyId, handleClose));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Legal);
