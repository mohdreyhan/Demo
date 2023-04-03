import AccountHistory from './History/AccountHistory';
import {
  ActionHistoryDropdown,
  FilterIgnoreKeys,
  categoryToContextCodes,
  CardFromHomeDefault,
  matchAddressSet,
  setEmploymentStartDate,
  dialogBPHeader
} from './History/AccountHistory.Data';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { bpConsumerHistorySet, getActivitySearchRecords } from './ApiAction';
import { GETCONSUMERPERSONALINFO } from '../../Actions/ConsumerDetails/ActionCreators.js';
import { CONSUMERSKIPVERIFICATION } from '../../Actions/ConsumerDetails/Actions';
import {
  dialogMatchHeader,
  dialogTieHeader,
  dialogUnTieHeader,
  dialogStructureHeader,
  dialogTieStructureHeader,
  dialogUntieStructureHeader,
  dialogMatchFooter,
  dialogStructureFooter
} from '../../Components/ConsumerAccountDetails/History/AccountHistory.Data';
import MatchingDetails from './ConsumerHistory/HistoryDetails/MatchingDetails';
import TieUntieDetails from './ConsumerHistory/HistoryDetails/TieUntieDetails';
import UntieDetails from './ConsumerHistory/HistoryDetails/UntieDetails';

import { phoneNumberFormat, returnValueOrDefault, zipCodeFormat } from '../Common/commonfunctions';
import PopUp from '../Common/AEComponents/DialogBox/PopUp';
import { nestedIfCaseHandle } from '../BusinessProcess/Business.Data';
import { getMatchRecordWithId } from './ConsumerHistory/ConsumerHistory.Data';
import ViewSummary from '../BusinessProcess/ViewSummary';
import { EXECUTEBUSINESSPROCESS } from '../../Actions/BusinessProcess/Actions';

const ConsumerHistory = (props) => {
  const [searchData, setSearchData] = useState();
  const [lastFilterRec, setLastFilterRecords] = useState({});
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  let size = 10;
  const [CardFromHome, setCardFromHome] = useState();
  const [popupDetails, setPopupDetails] = useState({});
  const [selectedRowData, setSelectedRowData] = useState();
  const [ completedBPIDs,setCompletedBPIDs] = useState([]);
  useEffect(() => {
    if (props.oldSpokeToList?.value?.length) {
      let localValue = localStorage.getItem('historyFilter');
      let historyFilter = ActionHistoryDropdown.options;
      if (localValue && Object.keys(localValue).length > 0) {
        historyFilter = JSON.parse(localValue).filter;
        setCardFromHome({
          componentIsFrom: 'Home',
          cards: historyFilter
        });
        updateHandleFilterUpdate(historyFilter);
      } else {
        setCardFromHome(CardFromHomeDefault);
        updateHandleFilterUpdate(CardFromHomeDefault.cards);
      }
    } else {
      if (localStorage.getItem('customerId')) {
        props.GETCONSUMERPERSONALINFO();
        props.CONSUMERSKIPVERIFICATION(true);
      }
    }
  }, [props?.oldSpokeToList]);

  useEffect(() => {
    if (isFetching) {
      updateNewRecords();
    }
  }, [isFetching]);

  const handleLoadMore = () => {
    handleCardClick(selectedRowData);
  };

  const updateNewRecords = async () => {
    setLoading(true);
    let requestData = await handleFilterUpdate(lastFilterRec, page + 1);
    let apiResponse = await getActivitySearchRecords(
      requestData,
      props.states,
      props.countriesData,
      props.oldSpokeToList,
      props.phoneTypes,
      props.emailTypes,
      props.addressTypes,
      completedBPIDs
    );
    setCompletedBPIDs(apiResponse?.completedBPIDs)
    let tmpList = [...searchData, ...apiResponse?.activities];
    setSearchData(tmpList);
    setIsFetching(false);
    setLoading(false);
  };

  const handleFilterUpdate = async (filterVal, pageValue) => {
    if (filterVal.length) {
      localStorage.setItem('historyFilter', JSON.stringify({ filter: filterVal }));
      let consumerUuids = props?.oldSpokeToList?.value
        ?.map((e) => e?.customerId)
        ?.filter((v, i, a) => a.indexOf(v) == i);
      let allSpokeResponsibleIds = props?.oldSpokeToList?.value
        ?.map((e) => e?.id)
        ?.filter((v, i, a) => a.indexOf(v) == i);
      let entityIds = [],
        contexts = [],
        categories = [];
      let filterOptions = filterVal;
      if (filterOptions.some(({ value: id3 }) => id3 == 'all')) {
        filterOptions = ActionHistoryDropdown.options.filter((ex) => ex.value != 'all');
      }
      filterOptions.map((a) => {
        let contextVal = categoryToContextCodes[a.value];
        if (contextVal == 'CONSUMER') {
          entityIds = entityIds.concat(consumerUuids);
        } else {
          entityIds = entityIds.concat(allSpokeResponsibleIds);
        }
        contexts.push(contextVal);
        categories.push(a.value);
      });
      setPage(pageValue);
      setLastFilterRecords(filterVal);
      return {
        page: pageValue,
        size: size,
        entityIds: entityIds,
        contexts: contexts,
        categories: categories
      };
    }
  };
  const updateHandleFilterUpdate = async (filterValues) => {
    let requestData = await handleFilterUpdate(filterValues, 1);
    if (Object.keys(requestData).length) {
      getDefaultApiRequest(requestData);
    }
  };
  const getDefaultApiRequest = async (requestData) => {
    setLoading(true);
    let apiResponse = await getActivitySearchRecords(
      requestData,
      props.states,
      props.countriesData,
      props.oldSpokeToList,
      props.phoneTypes,
      props.emailTypes,
      props.addressTypes,
      []
    );
    setCompletedBPIDs(apiResponse?.completedBPIDs)
    setSearchData(apiResponse?.activities);
    setLoading(false);
  };

  const handleDialog = () => {
    setPopupDetails({ ...popupDetails, showDialog: false });
  };

  const handleCardClick = async (data) => {
    setSelectedRowData(data);
    switch (data.category) {
      case 'CONSUMER_MATCHING':
        setPopupDetails({
          showDialog: true,
          handleDialog: handleDialog,
          dialogDataHeader: dialogMatchHeader,
          dialogStructureHeader: dialogStructureHeader,
          dialogDataFooter: dialogMatchFooter,
          dialogStructureFooter: dialogStructureFooter,
          formName: 'match',
          data: await setMatchingDetails(data),
          category: data.category
        });
        break;
      case 'TIE_UNTIE':
        setPopupDetails({
          showDialog: true,
          handleDialog: handleDialog,
          dialogDataHeader: nestedIfCaseHandle(data.action == 'Account Tied', dialogTieHeader, dialogUnTieHeader),
          dialogStructureHeader:
            nestedIfCaseHandle(data.action == 'Account Tied', dialogTieStructureHeader, dialogUntieStructureHeader),
          formName: nestedIfCaseHandle(data.action == 'Account Tied', 'tie', 'untie'),
          data: nestedIfCaseHandle(data.action == 'Account Tied', setTieDetails(data), setUntieDetails(data)),
          category: data.category
        });
        break;
      case 'BUSINESS_PROCESS':
        if (data.formStatusCode == 'pending') {
          props.EXTERNALBUSINESSPROCESS(data);
        } else {
          let headerTmp = dialogBPHeader?.map((header) => {
            if (header.accessor == 'title') {
              return { ...header, label: data.businessName };
            }
            return header;
          });
          setPopupDetails({ 
            showDialog: true,
            handleDialog: handleDialog,
            dialogDataHeader: headerTmp,
            dialogStructureHeader: dialogStructureHeader,
            dialogDataFooter: dialogMatchFooter,
            dialogStructureFooter: dialogStructureFooter,
            data: await bpConsumerHistorySet(data?.stepId, localStorage.getItem('responsibleId'),data),
            category: data.category
          });
        }

        break;
    }
  };

  const setMatchingDetails = async (matchData) => {
    let addressCheck = matchData.apiResponse?.data?.addresses?.filter(
      (addressVal) => addressVal?.isDefault
    );
    let address = matchData.apiResponse?.data?.addresses;
    if (addressCheck?.length > 0 || matchData.apiResponse?.data?.addresses?.length > 0) {
      addressCheck = nestedIfCaseHandle(
        addressCheck?.length > 0,
        addressCheck,
        matchData.apiResponse?.data?.addresses?.[0]
      );
      if (address?.[0]?.postalCode) {
        let tmp = {
          ...address?.[0],
          postalCode: zipCodeFormat(address?.[0]?.postalCode)
        };
        address = [tmp];
      }
      let filterCounty = getMatchRecordWithId(addressCheck?.[0]?.country, props.countriesData);
      if (filterCounty.length > 0) {
        let tmp = {
          ...address[0],
          country: filterCounty?.[0]?.name
        };
        address = [tmp];
      }

      let filterState = getMatchRecordWithId(addressCheck?.[0]?.province, props.states);
      if (filterState.length > 0) {
        let tmp = {
          ...address[0],
          province: filterState?.[0]?.name
        };
        address = [tmp];
      }
    }

    let homePhoneArr = matchData.apiResponse?.data?.phones?.filter((ph1) =>
      ['HomePhone', 'Home'].includes(ph1?.type)
    );
    let homePhone = nestedIfCaseHandle(
      homePhoneArr && homePhoneArr.length,
      phoneNumberFormat(homePhoneArr?.[0]?.phoneNum),
      'N/A'
    );
    let mobilePhoneArr = matchData.apiResponse?.data?.phones?.filter((ph2) =>
      ['MobilePhone', 'Mobile'].includes(ph2?.type)
    );
    let mobilePhone = nestedIfCaseHandle(
      mobilePhoneArr && mobilePhoneArr.length,
      phoneNumberFormat(mobilePhoneArr?.[0]?.phoneNum),
      'N/A'
    );
    let emailArr = matchData.apiResponse?.data?.emails?.filter((e1) => e1?.isDefault);
    let emailVal = nestedIfCaseHandle(
      emailArr && emailArr.length,
      emailArr?.[0]?.emailAddress,
      'N/A'
    );

    let employmentData = 'N/A';
    if (
      matchData?.apiResponse?.data?.employments &&
      matchData?.apiResponse?.data?.employments.length > 0
    ) {
      let states = getMatchRecordWithId(
        matchData?.apiResponse?.data?.employments?.[0]?.stateId,
        props.states
      );
      let exCountry = getMatchRecordWithId(
        matchData?.apiResponse?.data?.employments?.[0]?.countryId,
        props.countriesData
      );
      let tmpEmpState = {
        ...matchData?.apiResponse?.data?.employments?.[0],
        state: returnValueOrDefault(states?.[0]?.name, ''),
        country: returnValueOrDefault(exCountry?.[0]?.name, ''),
        zipCode: zipCodeFormat(
          returnValueOrDefault(matchData?.apiResponse?.data?.employments?.[0]?.zipCode, '')
        )
      };
      employmentData = matchAddressSet(tmpEmpState, ',');
    }
    let placeEmpPhone = nestedIfCaseHandle(
      matchData?.apiResponse?.data?.employments?.[0]?.phoneNumberOne,
      phoneNumberFormat(matchData?.apiResponse?.data?.employments?.[0]?.phoneNumberOne),
      'N/A'
    );
    return [
      {
        key: 1,
        label: 'Creation Date',
        value: setEmploymentStartDate(matchData.apiResponse?.createdOn)
      },
      {
        key: 2,
        label: 'Account No',
        value: matchData.apiResponse?.data?.accounts?.[0]?.accountNum
      },
      {
        key: 3,
        label: 'Name',
        value: `${matchData.apiResponse?.data?.firstName} ${matchData.apiResponse?.data?.middleName} ${matchData.apiResponse?.data?.lastName}`
      },
      {
        key: 4,
        label: 'Address',
        value: nestedIfCaseHandle(
          address && address?.length,
          matchAddressSet(address?.[0], ','),
          'N/A'
        )
      },
      {
        key: 5,
        label: 'Home Phone',
        value: homePhone
      },
      {
        key: 6,
        label: 'Mobile Phone',
        value: mobilePhone
      },
      {
        key: 7,
        label: 'Email Address',
        value: emailVal
      },
      {
        key: 8,
        label: 'Driver’s License Number',
        value: returnValueOrDefault(matchData?.apiResponse?.data?.driverLicenseNumber, 'N/A')
      },
      {
        key: 9,
        label: 'SSN',
        value: `*** *** ${matchData?.apiResponse?.data?.maskedSSN}`
      },
      {
        key: 10,
        label: 'EIN',
        value: nestedIfCaseHandle(
          matchData?.apiResponse?.data?.maskedEIN,
          `*********${matchData?.apiResponse?.data?.maskedEIN}`,
          'N/A'
        )
      },
      {
        key: 11,
        label: 'Place of Employment',
        value: returnValueOrDefault(
          matchData?.apiResponse?.data?.employments?.[0]?.employerName,
          'N/A'
        )
      },
      {
        key: 12,
        label: 'Place of Employment Address',
        value: employmentData
      },
      {
        key: 13,
        label: 'Place of Employment Phone',
        value: placeEmpPhone
      },
      {
        key: 14,
        label: 'Hire Date',
        value: setEmploymentStartDate(matchData?.apiResponse?.data?.employments?.[0]?.startDate)
      }
    ];
  };

  const setTieDetails = (tieData) => {
    let sortedData;
    if (searchData?.length > 0) {
      sortedData = searchData?.find((data) => data.id == tieData.id);
    }
    return [
      {
        key: 3,
        label: 'Activity Date and Time',
        value: sortedData.creationDateValue,
        xs: 4,
        accessor: 'creationDateValue'
      },
      {
        key: 4,
        label: 'Completed By',
        value: sortedData.completedByNameValue,
        xs: 4,
        accessor: 'completedByNameValue'
      },
      {
        key: 2,
        label: 'Name',
        value: sortedData.responsiblePartyName,
        xs: 4,
        accessor: 'responsiblePartyName'
      },
      {
        key: 5,
        label: 'Tied From',
        value: sortedData.tieFrom,
        xs: 12,
        accessor: 'tieFrom'
      },
      {
        key: 6,
        label: 'Tied To',
        value: sortedData.tieTo,
        xs: 12,
        accessor: 'tieTo'
      }
    ];
  };

  const setUntieDetails = (untieData) => {
    let sortedData;
    if (searchData?.length > 0) {
      sortedData = searchData?.find((data) => data.id == untieData.id);
    }
    return [
      {
        key: 1,
        label: 'Activity Date and Time',
        value: sortedData.creationDateValue,
        xs: 4,
        accessor: 'creationDateValue'
      },
      {
        key: 2,
        label: 'Completed By',
        value: sortedData.completedByNameValue,
        xs: 4,
        accessor: 'completedByNameValue'
      },
      {
        key: 3,
        label: 'Name',
        value: sortedData.responsiblePartyName,
        xs: 4,
        accessor: 'responsiblePartyName'
      },
      {
        key: 5,
        label: 'Untied Account',
        value: sortedData.untiedAccount,
        xs: 12,
        accessor: 'untiedAccount'
      },
      {
        key: 4,
        label: 'Untied From',
        value: sortedData.untiedFrom,
        xs: 12,
        accessor: 'untiedFrom'
      }
    ];
  };
  return (
    <>
      <AccountHistory
        CardFrom={CardFromHome}
        typeList={ActionHistoryDropdown}
        historyRecords={searchData}
        filterIgnore={FilterIgnoreKeys}
        filterUpdated={updateHandleFilterUpdate}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        loading={loading}
        onClickedOnCard={handleCardClick}
      />
      <PopUp
        showDialog={returnValueOrDefault(popupDetails?.showDialog, false)}
        handleDialog={popupDetails?.handleDialog}
        dialogDataHeader={popupDetails?.dialogDataHeader}
        dialogStructureHeader={popupDetails?.dialogStructureHeader}
        dialogDataFooter={popupDetails?.dialogDataFooter}
        dialogStructureFooter={popupDetails?.dialogStructureFooter}
        formName={popupDetails?.formName}
        centerBtn={popupDetails?.centerBtn}
        popupWidth={'md'}>
        {popupDetails.category === 'TIE_UNTIE' && popupDetails.formName == 'tie' && (
          <TieUntieDetails data={popupDetails?.data} handleLoadMore={handleLoadMore} />
        )}
        {popupDetails.category === 'TIE_UNTIE' && popupDetails.formName == 'untie' && (
          <UntieDetails data={popupDetails?.data} handleLoadMore={handleLoadMore} />
        )}
        {popupDetails.category === 'CONSUMER_MATCHING' && (
          <MatchingDetails data={popupDetails?.data} />
        )}
        {popupDetails.category === 'BUSINESS_PROCESS' && (
          <ViewSummary viewSummaryData={popupDetails?.data} />
        )}
      </PopUp>
    </>
  );
};

function mapStateToProps(state) {
  return {
    oldSpokeToList: state.ConsumerDetailsReducer.oldSpokeToList,
    states: state.StaticDataReducer.getstates,
    countriesData: state.StaticDataReducer.countriesData,
    phoneTypes: state.ContactInfoReducer.phoneTypes,
    emailTypes: state.ContactInfoReducer.emailTypes,
    addressTypes: state.ContactInfoReducer.addressTypes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETCONSUMERPERSONALINFO: async () => {
      await dispatch(GETCONSUMERPERSONALINFO());
    },
    CONSUMERSKIPVERIFICATION: async (value) => {
      await dispatch(CONSUMERSKIPVERIFICATION(value));
    },
    EXTERNALBUSINESSPROCESS: async (value) => {
      await dispatch(EXECUTEBUSINESSPROCESS(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerHistory);
