import * as React from 'react';
import { connect } from 'react-redux';
import AddLitigious from './Litigious/AddLitigious/AddLitigious';
import AddIncarceration from './Incarceration/AddIncarceration/AddIncarceration';
import AddComplaints from './Complaints/AddComplaints/AddComplaints';
import AddDispute from './Dispute/AddDispute/AddDispute';
import AddBankruptcy from './Bankruptcy/AddBankruptcy/AddBankruptcy';
import {
  ADDLITIGIOUSINPUTS,
  ADDBANKRUPTCYINPUTS,
  ADDTRUSTEEINPUTS,
  ADDCOURTINPUTS,
  TRIGGERPOPUP
} from '../../../../Actions/ConsumerDetails/ConsumerQuickActions/Actions.js';
import { useNavigate } from 'react-router-dom';

function ConsumerQuickActionAddFunctionality(props) {
  const [showDialog, setDialog] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.quickActionMenuItems && Object.keys(props.quickActionMenuItems).length > 0) {
      setDialog(true);
    }
  }, [props.quickActionMenuItems]);

  /*--------------------- handle popup function -----------------*/

  const handleDialog = (value) => {
    setDialog(value);
    if (!value) {
      props.TRIGGERPOPUP({});
      props.ADDBANKRUPTCYINPUTS('reset');
      props.ADDCOURTINPUTS('reset');
      props.ADDTRUSTEEINPUTS('reset');
      props.ADDLITIGIOUSINPUTS('reset');
    }
  };

  const navigateToGenInfo = () => {
    navigate(`/consumer`);
  };
  return (
    <>
      {props.quickActionMenuItems?.componentToRender == 'incarcerated' && (
        <AddIncarceration
          showDialog={showDialog}
          handleDialog={handleDialog}
          navigateToGenInfo={navigateToGenInfo}
        />
      )}
      {props.quickActionMenuItems?.componentToRender == 'bankruptcy' && (
        <AddBankruptcy
          showDialog={showDialog}
          handleDialog={handleDialog}
          navigateToGenInfo={navigateToGenInfo}
        />
      )}
      {props.quickActionMenuItems?.componentToRender == 'complaint' && (
        <AddComplaints
          showDialog={showDialog}
          handleDialog={handleDialog}
          navigateToGenInfo={navigateToGenInfo}
        />
      )}
      {props.quickActionMenuItems?.componentToRender == 'ligitious' && (
        <AddLitigious
          showDialog={showDialog}
          handleDialog={handleDialog}
          navigateToGenInfo={navigateToGenInfo}
        />
      )}
      {props.quickActionMenuItems?.componentToRender == 'dispute' && (
        <AddDispute
          showDialog={showDialog}
          handleDialog={handleDialog}
          navigateToGenInfo={navigateToGenInfo}
        />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    quickActionMenuItems: state.ConsumerQuickActionsReducer.quickActionMenuItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDLITIGIOUSINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDLITIGIOUSINPUTS('', '', 'reset'));
      }
    },
    TRIGGERPOPUP: async (menuItems) => {
      await dispatch(TRIGGERPOPUP(menuItems));
    },
    ADDBANKRUPTCYINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDBANKRUPTCYINPUTS('', '', 'reset'));
      }
    },
    ADDCOURTINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDCOURTINPUTS('', '', 'reset'));
      }
    },
    ADDTRUSTEEINPUTS: async (event) => {
      if (event == 'reset') {
        await dispatch(ADDTRUSTEEINPUTS('', '', 'reset'));
      }
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ConsumerQuickActionAddFunctionality);
