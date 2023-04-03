import { connect } from 'react-redux';
import { useEffect } from 'react';
import {
  ACCOUNTGENERALINFO,
  ACCOUNTLEFTMENUINFO,
  ACCOUNTSUMMARYINFO
} from '../../../../../../Actions/ConsumerDetails/Actions';
import { AccountBasicInfo, setAccountSummary, ListData } from '../AccountSinglePage.Data';
import ViewAccountDetails from './ViewAccountDetails/ViewAccountDetails';
import AccountHolders from './AccountHolders/AccountHolders';
import { useNavigate } from 'react-router-dom';
import ViewAccountFinancials from './ViewAccountFinancials/ViewAccountFinancials';

function AccountGeneralInformation(props) {
  const navigate = useNavigate();
  let accountUuid = localStorage.getItem('accountUuid');
  let allAccounts = props.consumerAssocAccounts;
  let accountDetails = allAccounts?.filter((tmp) => tmp.accountUuid == accountUuid);

  useEffect(() => {
    if (!accountDetails.length) {
      navigate(`/consumer`);
    }
  }, []);

  useEffect(() => {
    if (props.consumerVerification || props.consumerSkipVerification) {
      props.SETACCOUNTGENERALINFO(AccountBasicInfo(accountDetails[0]));
      props.SETACCOUNTSUMMARYDATA(setAccountSummary(accountDetails[0]));
      props.SETACCOUNTLEFTMENU(ListData);
    }
  }, [props.consumerVerification, props.consumerSkipVerification]);

  return (
    <>
      <ViewAccountDetails accountInfo={accountDetails} />
      <ViewAccountFinancials accountId={accountUuid}/>
      <AccountHolders accountInfo={accountDetails} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerverifieddetails: state.ConsumerDetailsReducer.consumerverifieddetails,
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    consumerAssocAccounts: state.ConsumerDetailsReducer.consumerAssocAccounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SETACCOUNTGENERALINFO: async (generalInfo) => {
      await dispatch(ACCOUNTGENERALINFO(generalInfo));
    },
    SETACCOUNTSUMMARYDATA: async (summaryData) => {
      await dispatch(ACCOUNTSUMMARYINFO(summaryData));
    },
    SETACCOUNTLEFTMENU: async (itemList) => {
      await dispatch(ACCOUNTLEFTMENUINFO(itemList));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountGeneralInformation);
