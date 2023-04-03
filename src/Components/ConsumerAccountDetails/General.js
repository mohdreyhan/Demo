import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  GETCONSUMERPERSONALINFO,
  GETRELATIONSHIPTYPESDATA
} from '../../Actions/ConsumerDetails/ActionCreators';
import {
  ACCOUNTGENERALINFO,
  ACCOUNTLEFTMENUINFO,
  ACCOUNTSUMMARYINFO
} from '../../Actions/ConsumerDetails/Actions';
import Accounts from './GeneralInformation/Accounts/Accounts';
import ContactInformation from './GeneralInformation/ContactInformation/ContactInformation';
import EmployerInformation from './GeneralInformation/PlaceOfEmployment/EmployerInformation';
import Main from './GeneralInformation/PersonalDetails/Main';
import ConsumerQuickActions from './GeneralInformation/ConsumerQuickAction/ConsumerQuickActions';

function General(props) {
  useEffect(() => {
    localStorage.removeItem('historyFilter');
    props.SETACCOUNTGENERALINFO({});
    props.SETACCOUNTSUMMARYDATA([]);
    props.SETACCOUNTLEFTMENU([]);
    if (props.consumerAssocAccounts.length <= 0) {
      props.GETCONSUMERPERSONALINFO();
    }
    props.GETRELATIONSHIPTYPESDATA();
  }, []);

  return (
    <>
      <Main />
      <ConsumerQuickActions />
      <ContactInformation />
      <Accounts />
      {/* <CustomDetails /> */}
      <EmployerInformation />
      {/* CONSUMER QUICK ACTIONS */}

    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    consumerAssocAccounts: state.ConsumerDetailsReducer.consumerAssocAccounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETCONSUMERPERSONALINFO: async (responsibleId) => {
      await dispatch(GETCONSUMERPERSONALINFO(responsibleId));
    },
    SETACCOUNTGENERALINFO: async (generalInfo) => {
      await dispatch(ACCOUNTGENERALINFO(generalInfo));
    },
    SETACCOUNTSUMMARYDATA: async (summaryData) => {
      await dispatch(ACCOUNTSUMMARYINFO(summaryData));
    },
    SETACCOUNTLEFTMENU: async (itemList) => {
      await dispatch(ACCOUNTLEFTMENUINFO(itemList));
    },
    GETRELATIONSHIPTYPESDATA: async () => {
      await dispatch(GETRELATIONSHIPTYPESDATA());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);
