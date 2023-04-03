import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  ACCOUNTGENERALINFO,
  ACCOUNTLEFTMENUINFO,
  ACCOUNTSUMMARYINFO
} from '../../../../../../Actions/ConsumerDetails/Actions';
import {
  AccountBasicInfo,
  setAccountSummary,
  ListData,
  singlePaymentStatus
} from '../AccountSinglePage.Data';
import AccountHistory from '../../../../History/AccountHistory';
import {
  ActionHistoryDropdown,
  FilterIgnoreKeys,
  CardFromSingleAccount,
  dialogStructureFooter,
  dialogPaymentHeader,
  dialogStructureHeader,
  dialogPaymentFooter
} from '../../../../History/AccountHistory.Data';
import { useNavigate } from 'react-router-dom';
import {
  convertTimestamptoUSATimeNotes,
  formatCurrency
} from '../../../../../Common/commonfunctions';
import SinglePayment from './SinglePayment/SinglePayment';
import PopUp from '../../../../../Common/AEComponents/DialogBox/PopUp';
import { getAgentDetailsByIds, getSinglePagePaymentApi } from '../../../../ApiAction';

const returnValueOrDefault = (value, defaultVal) => {
  if (value) {
    return value;
  }
  return defaultVal;
};

function AccountSinglePageHistory(props) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [popupDetails, setPopupDetails] = useState({});
  const [loading, setLoading] = useState(true);
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
      getSinglePaymentInf(accountUuid);
    }
  }, [props.consumerVerification, props.consumerSkipVerification]);

  const getSinglePaymentInf = async (accountUuidValue) => {
    let response = await getSinglePagePaymentApi(accountUuidValue);
    let agentIds = response
      ?.map((res1) => {
        if (res1.modifiedBy) {
          return res1.modifiedBy;
        }
      })
      ?.filter((value, index, arrayset) => {
        return arrayset.indexOf(value) == index && value;
      });
    let agentDetails = agentIds && agentIds?.length > 0 ? await getAgentDetailsByIds(agentIds) : {};
    if (response.length) {
      let temp = response
        ?.map((single) => {
          let agent = 'System';
          if (
            single.modifiedBy &&
            agentDetails?.users?.length > 0 &&
            agentDetails?.users?.find((u) => u.uid == single.modifiedBy)
          ) {
            let agentValues = agentDetails?.users?.find((u) => u.uid == single.modifiedBy);
            agent = `${agentValues?.firstName ?? ''} ${agentValues?.lastName ?? ''}` ?? 'System';
          }
          let newStatus = singlePaymentStatus[single.status];
          let consumerNameValue = `${returnValueOrDefault(
            props.consumerDemographics[0]?.firstName,
            ''
          )} ${returnValueOrDefault(props.consumerDemographics[0]?.lastName, '')}`;

          if (single?.consumerId) {
            let spokeToList = props.spokeToList;
            let checkCustomer = spokeToList?.value?.filter(
              (e) => e.customerId == single?.consumerId
            );
            if (checkCustomer?.length > 0) {
              consumerNameValue = `${returnValueOrDefault(
                checkCustomer[0].firstName,
                ''
              )} ${returnValueOrDefault(checkCustomer[0].middleName, '')} ${returnValueOrDefault(
                checkCustomer[0].lastName,
                ''
              )}`;
            }
          }

          return {
            id: single?.uuid,
            category: 'payment',
            paymentID: single?.paymentId,
            action: 'Single Payment',
            date: convertTimestamptoUSATimeNotes(single?.effectiveDate, 'something'),
            payment: `${formatCurrency(single?.paymentAmount)}`,
            agentName: agent,
            consumerName: consumerNameValue,
            status: `${newStatus?.status}: ${single?.paymentId} - ${convertTimestamptoUSATimeNotes(
              single?.postedDate,
              'something'
            )}`,
            statusCode: newStatus?.statusCode
          };
        })
        ?.sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
        ?.filter((f) => f.paymentID?.indexOf('INITIAL') === -1)
        ?.reverse();
      setData(temp);
    }
    setLoading(false);
  };

  const handleDialog = () => {
    setPopupDetails({ ...popupDetails, showDialog: false });
  };

  const onClickedOnCard = (clickedData) => {
    setPopupDetails({
      showDialog: true,
      handleDialog: handleDialog,
      dialogDataHeader: dialogPaymentHeader,
      dialogStructureHeader: dialogStructureHeader,
      dialogDataFooter: dialogPaymentFooter,
      dialogStructureFooter: dialogStructureFooter,
      formName: 'singlePayment',
      data: clickedData
    });
  };

  return (
    <>
      <AccountHistory
        CardFrom={CardFromSingleAccount}
        typeList={ActionHistoryDropdown}
        historyRecords={data}
        filterIgnore={FilterIgnoreKeys}
        onClickedOnCard={onClickedOnCard}
        loading={loading}
      />

      <PopUp
        showDialog={returnValueOrDefault(popupDetails?.showDialog, false)}
        handleDialog={popupDetails?.handleDialog}
        dialogDataHeader={popupDetails?.dialogDataHeader}
        dialogStructureHeader={popupDetails?.dialogStructureHeader}
        dialogDataFooter={popupDetails?.dialogDataFooter}
        dialogStructureFooter={popupDetails?.dialogStructureFooter}
        formName={popupDetails?.formName}
        popupWidth={'md'}>
        <SinglePayment data={popupDetails?.data} accountDetails={accountDetails[0]} />
      </PopUp>
    </>
  );
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
function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    accountSummaryConsumerData: state.ConsumerDetailsReducer.accountSummaryConsumerData,
    consumerverifieddetails: state.ConsumerDetailsReducer.consumerverifieddetails,
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    consumerAssocAccounts: state.ConsumerDetailsReducer.consumerAssocAccounts,
    spokeToList: state.ConsumerDetailsReducer.spokeToList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSinglePageHistory);
