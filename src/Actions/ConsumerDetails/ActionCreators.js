import {
  ALLCONSUMERACCOUNTS,
  ALLCONSUMERACCOUNTSFORCALLWRAPUP,
  CONSUMERPERSONALINFO,
  ACCOUNTSUMMARYCONSUMERDATA,
  CONSUMERDEMOGRAPHICS,
  CONSUMEREMPLOYERS,
  SEARCHCONSUMERDATA,
  ALLNOTES,
  RELATIONSHIPTYPESDATA,
  ALERT_LIST_ALL,
  SAVEPORTFOLIOID,
  CONSUMERVERIFICATION,
  CONSUMERSKIPVERIFICATION,
  VERIFICATIONQUESTIONNAIRE,
  SPOKETOLIST,
  OLDSPOKETOLIST,
  SUBMITFORMCALLS,
  CURRENTACCOUNTSET,
  ACCOUNTBALANACE,
  ACCOUNTSUBBALANACETYPE,
  EMPLOYEMENTTYPES,
  SAVEDEPENDENTSOFACCOUNT,
  SAVERESPONSIBLES,
  ADDCALLWRAPUPNOTEINPUTS,
  DECEASEDINFO,
  ADDDECEASEDINPUTS,
  CONSUMERALIASES,
  ALIASTYPES,
  LISTACTIVECONTIGENCYFEE,
  GETFINANCIALDETAILS,
  UPDATEFINACIALDETIALS,
  KPICALLWRAP,
  GETQUEUE
} from './Actions';
import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';
import {
  GETEMAILTYPES,
  GETADDRESSTYPES,
  GETPHONETYPES,
} from './ContactInformation/ActionCreators.js';
import {
  GETALLCOUNTRIES,
  GETSTATES,
  GETPREFEREDLANGUAGES,
  GETALERTTYPES,
  GETCONSUMERDEMOGRAPHICSOURCE,
  GETDISPUTEREASON,
  GETCOMPLAINTTYPE,
  GETBANKRUPTCYTYPES
} from '../StaticData/ActionCreators.js';
import { RESET_AFTER_SPOKE_TO_CHANGE } from './Types';
import { DEPENDENTSOFRESPONSIBLE } from './ConsumerQuickActions/Actions.js';
import {VIEWPHONEDATA, PHONEDATAFORCALLWRAPUP, VIEWEMAILDATA, VIEWADDRESSDATA} from './ContactInformation/Actions';
import { sortByPrimaryStatus } from "../../Components/Common/commonfunctions";

/* --------------------- GET ALL CONSUMER ACCOUNTS -------------------------------*/

export const GETCONSUMERPERSONALINFO = () => async (dispatch) => {
  try {
    let responsibleId = localStorage.getItem('responsibleId');
    const apiResponse = await ApiServices('account').get(`/v1/responsibles/${responsibleId}`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.customer) {
      /*-------------Action----------------*/
      dispatch(CONSUMERPERSONALINFO(validatedResponse.customer));
      /*-------------APIS-------------*/
      // TYPES
      if (validatedResponse?.customer?.hasAlias) {
        dispatch(GETCONSUMERALISES(validatedResponse.customer?.customerId));
      }
      if (validatedResponse?.customer?.isDeceased) {
        dispatch(GETDECEASEDINFO(validatedResponse.customer?.customerId));
      }
      dispatch(GETALIASTYPES());
      dispatch(GETALLCOUNTRIES());
      dispatch(GETEMAILTYPES());
      dispatch(GETADDRESSTYPES());
      dispatch(GETPHONETYPES());
      dispatch(GETSTATES());
      dispatch(GETPREFEREDLANGUAGES());
      dispatch(GETACCOUNTSUBBALANACETYPE());
      dispatch(GETRESPONSIBLELEFTPANEL());
      dispatch(GETEMPLOYMENTTYPES());
      dispatch(GETALERTTYPES());
      dispatch(GETCONSUMERDEMOGRAPHICSOURCE());
      dispatch(GETDISPUTEREASON());
      dispatch(GETBANKRUPTCYTYPES());
      dispatch(GETCOMPLAINTTYPE());
      //APIS
      dispatch(GETACCOUNTSUMMARYCONSUMERDATA(validatedResponse.customer?.customerId));
      dispatch(GETCONSUMERDEMOGRAPHICS(validatedResponse.customer?.customerId));
      dispatch(GETCONSUMEREMPLOYERS(validatedResponse.customer?.customerId));
      dispatch(GETALERTNOTIFICATION(responsibleId));
      dispatch(GETALLCONSUMERACCOUNTS(validatedResponse.customer?.customerId));
      dispatch(GETACCOUNTBALANACE(localStorage.getItem('currentAccountNumber')));
      dispatch(SETALLACCOUNTSPOKELIST(validatedResponse.customer?.customerId));
      dispatch(ADDCALLWRAPUPNOTEINPUTS('', '', 'reset'));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

export const GETCONSUMERFORCALLWRAPUPNOTE = (responsibleId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(`/v1/responsibles/${responsibleId}`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.customer) {
      /*-------------APIS-------------*/
      dispatch(GETPHONEDATAFORCALLWRAPUP(validatedResponse.customer?.customerId));
      dispatch(GETALLCONSUMERACCOUNTSFORCALLWRAPUP(validatedResponse.customer?.customerId));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

export const UPDATECONSUMERVERIFICATION = (consumerFormData, isVerified) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account-activity', 'Consumer Verification').post(
      `/activities`,
      consumerFormData
    );
    if (apiResponse?.status === 201) {
      isVerified ? dispatch(CONSUMERVERIFICATION(true)) : dispatch(CONSUMERSKIPVERIFICATION(true));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- GET ALL CONSUMER ACCOUNTS -------------------------------*/
export const GETALLCONSUMERACCOUNTS = (customerId) => async (dispatch, getState) => {
  try {
    const currrentAcno = localStorage.getItem('currentAccountNumber');
    let currentRecord,currentRecordsSet;
    const apiResponse = await ApiServices('account').get(`/v1/customers/${customerId}/accounts`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.accounts) {
      let consumerAssocAccounts = validatedResponse?.accounts;
      if (currrentAcno) {
        currentRecord = consumerAssocAccounts.find(data => data.accountUuid == currrentAcno);
        currentRecordsSet =currentRecord? consumerAssocAccounts.filter(
          data => data.responsible.setId == currentRecord.responsible.setId): ''
        dispatch(CURRENTACCOUNTSET(currentRecordsSet));
      }
      dispatch(ALLCONSUMERACCOUNTS(consumerAssocAccounts));
      dispatch(ALLCONSUMERACCOUNTSFORCALLWRAPUP(validatedResponse?.accounts));
      dispatch(SAVEPORTFOLIOID(validatedResponse?.accounts[0]?.portfolioId));
      dispatch(SETOLDACCOUNTSPOKELIST(validatedResponse?.accounts));

      // Check if need Cleint contractlist arr
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- GET ALL CONSUMER ACCOUNTS -------------------------------*/

export const GETALLCONSUMERACCOUNTSFORCALLWRAPUP = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(`/v1/customers/${customerId}/accounts`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.accounts) {
      dispatch(ALLCONSUMERACCOUNTSFORCALLWRAPUP(validatedResponse.accounts));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- GET ALL ACCOUNT SUMMARY CONSUMER DATA -------------------------------*/

export const GETACCOUNTSUMMARYCONSUMERDATA = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/customers/${customerId}/accounts/summary`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.summary) {
      dispatch(ACCOUNTSUMMARYCONSUMERDATA(validatedResponse.summary));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};
/* ---------------------GET CONSUMER EMPLOYERS -------------------------------*/

export const GETCONSUMEREMPLOYERS = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(`/v1/customers/${customerId}/employment`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(CONSUMEREMPLOYERS(validatedResponse));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- ADD EMPLOYER -------------------------------*/

export const ADDEMPLOYER =
  (form, addEmployerInputs, customerId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Employer Added').post(
        `/v1/customers/${customerId}/employment`,
        addEmployerInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMEREMPLOYERS(customerId));
        form.current.reset();
        handleDialog(!showDialog);
      }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };

/* --------------------- EDIT EMPLOYER -------------------------------*/

export const EDITEMPLOYER =
  (form, editconsumerInputs, customerId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Employer Updated').patch(
        `/v1/customer-employment/${editconsumerInputs.id}`,
        editconsumerInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMEREMPLOYERS(customerId));
        form.current.reset();
        handleDialog(!showDialog);
      }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };

/* --------------------- GET CONSUMER DEMOGRAPHICS -------------------------------*/

export const GETCONSUMERDEMOGRAPHICS = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(`/v1/customers/${customerId}`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.customer) {
      dispatch(CONSUMERDEMOGRAPHICS(validatedResponse?.customer));
    }
  } catch (error) {
    console.log(error);
  }
};

/* --------------------- EDIT COSNUMER DEMOGRAPHICS -------------------------------*/

export const EDITCONSUMERDEMOGRAPHICS =
  (form, editconsumerInputs, customerId, handleDialog, showDialog, rotateExpandIcon) =>
  async (dispatch) => {
    const reBody = {
      firstName: editconsumerInputs[0].firstName,
      middleName: editconsumerInputs[0].middleName,
      lastName: editconsumerInputs[0].lastName,
      ssn: editconsumerInputs[0].ssn,
      dateOfBirth: editconsumerInputs[0].dateOfBirth,
      languageReferenceId: editconsumerInputs[0].languageReferenceId
    };
    try {
      const apiResponse = await ApiServices('account', 'Consumer Details Updated').patch(
        `/v1/customers/${customerId}`,
        reBody
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMERDEMOGRAPHICS(customerId));
        form.current.reset();
        handleDialog(!showDialog);
        rotateExpandIcon(true);
      }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };

/* --------------------- GET SEARCH CONSUMER DATA -------------------------------*/
export const GETSEARCHCONSUMERDATA = (searchKey, searchMethod) => async (dispatch) => {
  try {
    const encodedSearchKey=encodeURIComponent(searchKey)
    const apiResponse = await ApiServices('account').get(
      `v1/customers/search?searchKey=${encodedSearchKey}&searchMethod=${searchMethod}`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(SEARCHCONSUMERDATA(validatedResponse?.customers));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* --------------------- GET RELATIONSHIP TYPES DATA -------------------------------*/
export const GETRELATIONSHIPTYPESDATA = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/relationship-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(RELATIONSHIPTYPESDATA(validatedResponse));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* --------------------- ADD NOTES -------------------------------*/
export const ADDNOTES = (responsibleId, newNote) => async (dispatch) => {
  const arr = [];
  arr.push(newNote);
  let responsibleIds = localStorage.getItem('responsibleId');
  let message = arr[0].special ? 'Special Note Added' : 'Note Added';
  try {
    const apiResponse = await ApiServices('account', message).post(
      `v1/responsibles/${responsibleIds}/notes`,
      arr
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETALLNOTES(responsibleIds));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* --------------------- GET NOTES -------------------------------*/
const GETCALLWRAPUPNOTESBYQUERY = async (callwrapupids) => {
  const apiResponse = await ApiServices('account', 'Notes Loaded').post(
    `v1/call-wrap-ups/search`,
    callwrapupids
  );
  return validateResponse(apiResponse);
};

export const GETALLNOTES = (responsibleId) => async (dispatch) => {
  try {
    let localResponsibleId = localStorage.getItem('responsibleId');
    const apiResponse = await ApiServices('account').get(
      `v1/responsibles/${localResponsibleId}/notes`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      const allCallWrapUpId = validatedResponse
        .filter((v) => v.type === 'CALL_WRAP_UP')
        .map((m) => {
          return {
            notesId: m.id
          };
        });
      const callWrapUpInfo = await GETCALLWRAPUPNOTESBYQUERY(allCallWrapUpId);
      const callWrapUpInfos = callWrapUpInfo.map((m) => {
        return {
          ...m,
          type: 'CALL_WRAP_UP'
        };
      });
      const allResponse = validatedResponse.filter((v) => v.type !== 'CALL_WRAP_UP');
      dispatch(ALLNOTES([...allResponse, ...callWrapUpInfos]));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* --------------------- ADD NOTES -------------------------------*/
export const EDITNOTES = (responsibleId, newNote, noteId) => async (dispatch) => {
  let message = newNote.special ? 'Special Note Updated' : 'Note Updated';
  try {
    const apiResponse = await ApiServices('account', message).put(`v1/notes/${noteId}`, newNote);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETALLNOTES(responsibleId));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* -------------------------- GET ACCOUNT ALERTS NOTIFICATION ---------------------------------------*/
export const GETALERTNOTIFICATION = (responsibleId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/responsibles/${responsibleId}/alerts`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(ALERT_LIST_ALL(validatedResponse));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* --------------------- ADD Alert Notification -------------------------------*/
export const ADDALERTNOTIIFICATION = (responsibleId, newAlert) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account', 'Alert Added').post(
      `v1/responsibles/${responsibleId}/alerts`,
      newAlert
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETALERTNOTIFICATION(responsibleId));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};
/* --------------- DELETE ACCOUNT ALERTS NOTIFICATION ---------------------------------------*/
export const DELETEALERTNOTIFICATION = (responsibleId, id) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account', 'Alert Removed').delete(
      `/v1/responsibles/${responsibleId}/alerts/${id}`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETALERTNOTIFICATION(responsibleId));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* -------------------------- GET CUSTOMER VERIFICATION DETAILS ---------------------------------------*/
export const GETVERIFICATIONQUESTIONNAIRE = (uuid) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/customers/${uuid}?include=addresses,phones,emails`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(VERIFICATIONQUESTIONNAIRE(validatedResponse.customer));
      let phoneData = sortByPrimaryStatus(validatedResponse.customer.phones);
      dispatch(VIEWPHONEDATA(phoneData));
      dispatch(PHONEDATAFORCALLWRAPUP(phoneData));
      let emailData = sortByPrimaryStatus(validatedResponse.customer.emails);
      dispatch(VIEWEMAILDATA(emailData));
      let addressData = sortByPrimaryStatus(validatedResponse.customer.addresses);
      dispatch(VIEWADDRESSDATA(addressData));

    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* ------------------ GETDEPENDENTLIST---------------------------------------*/
export const GETDEPENDENTLIST = (accountuuid) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/accounts/${accountuuid}/responsibles`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(SAVEDEPENDENTSOFACCOUNT(validatedResponse.responsibles));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* ------------------ GETRESPONSIBLELEFTPANNEL---------------------------------------*/
export const GETRESPONSIBLELEFTPANEL = () => async (dispatch) => {
  try {
    let accountUuid = localStorage.getItem('accountUuid');
    const apiResponse = await ApiServices('account').get(
      `/v1/accounts/${accountUuid}/responsibles`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(SAVERESPONSIBLES(validatedResponse.responsibles));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};
/* ------------------ Get SPOKE To List for CallWrapUp Note---------------------------------------*/
export const GETSPOKETOLIST = async (customerId) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/customers/${customerId}/responsibles?includeRelatedResponsibles=true`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse.responsibles;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* ------------------ Get SPOKE To List for CallWrapUp Note---------------------------------------*/
export const GETOLDSPOKETOLIST = async (accountuuid) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/accounts/${accountuuid}/responsibles`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse.responsibles;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

// -------------------------- Form submit API ----------------------------------------------------
export const SUBMITFORMCALL = (responsibleId, postData) => async (dispatch) => {
  try {
    let responsibleIds = localStorage.getItem('responsibleId');
    let apiResponse = await ApiServices('account', 'Call Wrap Up Note Added').post(
      `/v1/responsibles/${responsibleIds}/call-wrap-up`,
      postData
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETALLNOTES(responsibleIds));
      dispatch(SUBMITFORMCALLS(validatedResponse));
    }
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    return {};
  }
};

export const SETALLACCOUNTSPOKELIST = (customerId) => async (dispatch) => {
  let spokeRes = await GETSPOKETOLIST(customerId);
  let customerDetails = spokeRes?.map((val) => val.customer);
  dispatch(SPOKETOLIST(customerDetails));
  dispatch(DEPENDENTSOFRESPONSIBLE(spokeRes));
};

export const SETOLDACCOUNTSPOKELIST = (accounts) => async (dispatch) => {
  let finalList = [];
  for (const element of accounts) {
    let spokeRes = await GETOLDSPOKETOLIST(element.accountUuid);
    finalList = [...finalList, ...spokeRes];
  }
  dispatch(OLDSPOKETOLIST(finalList));
};

export const RESETVALONCHANGESPOKETO = () => async (dispatch) => {
  dispatch({
    type: RESET_AFTER_SPOKE_TO_CHANGE,
    payload: null
  });
};

// --------------------------GET ACCOUNT SUB BALANCE TYPE ----------------------------------------------------

export const GETACCOUNTSUBBALANACETYPE = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('subbalances').get(`/subbalance-type`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      let sortValidatedResponse = validatedResponse?.sort(function (a, b) {
        if (a.subBalanceSort < b.subBalanceSort) {
          return -1;
        } else if (a.subBalanceSort == b.subBalanceSort) {
          if (a.code < b.code) return -1;
          return 1;
        }
        return 0;
      });
      dispatch(ACCOUNTSUBBALANACETYPE(sortValidatedResponse));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

// --------------------------GET ACCOUNT BALANCE ----------------------------------------------------
export const GETACCOUNTBALANACE = (accountUuid) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('consumer-financial').get(
      `/consumer-financial/account/${accountUuid}/balance`
    );
  const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(ACCOUNTBALANACE(apiResponse.data.result));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

export const GETEMPLOYMENTTYPES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/employment-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.employmentTypes) {
      dispatch(EMPLOYEMENTTYPES(validatedResponse?.employmentTypes));
      return validatedResponse?.employmentTypes;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

export const GETDECEASEDINFO = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/customers/${customerId}/deceased-informations`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(DECEASEDINFO(validatedResponse));
      return validatedResponse;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* --------------------- ADD DECEASED -------------------------------*/

export const ADDDECEASED =
  (form, addDeceasedInputs, customerId, handleDialog, showDialog,navigateToGenInfo) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Deceased Information Added').post(
        `/v1/customers/${customerId}/deceased-informations`,
        addDeceasedInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMERPERSONALINFO());
        dispatch(ADDDECEASEDINPUTS('', '', 'reset'));
        navigateToGenInfo();
        form.current.reset();
        handleDialog(!showDialog);
      }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };

/* --------------------- GET ALL DECEASED -------------------------------*/

export const GETCONSUMERALISES = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(`v1/customers/${customerId}/aliases`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(CONSUMERALIASES(validatedResponse));
    } else {
      dispatch(CONSUMERALIASES([]));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

export const GETALIASTYPES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(`/v1/alias-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse.aliasTypes) {
      dispatch(ALIASTYPES(validatedResponse.aliasTypes));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- EDIT DEACEASED -------------------------------*/

export const EDITDEACEASED =
  (form, deceasedInformationId, editDeaceasedInputs, handleDialog, showDialog, customerId) =>
  async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Deceased Information Updated').put(
        `/v1/deceased-informations/${deceasedInformationId}`,
        editDeaceasedInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMERPERSONALINFO());
        form.current.reset();
        handleDialog();
      }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };

/* ---------------------- DELETE DEACEASED -------------------------------*/
export const DELETEDEACEASED = (form, handleDialog, showDialog, customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account', 'Deaceased Removed').delete(
      `/v1/customers/${customerId}/deceased-informations`
    );
    //NO SONAR
    // const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 || apiResponse?.status === 204) {
      dispatch(GETCONSUMERPERSONALINFO());
      form.current.reset();
      handleDialog();
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* ---------------------- CREATE ALIASES -------------------------------*/

export const CREATEALIAS =
  (form, addAliasInputs, customerId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account').post(
        `/v1/customers/${customerId}/aliases`,
        addAliasInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMERALISES(customerId));
        handleDialog();
      }
    } catch (error) {
      handleNetworkError(error);
    }
  };
/* --------------------- Get Contingency Fee----*/

export const GETACTIVECONTIGENCYFEE = () => async (dispatch) => {
  const apiResponse = await ApiServices('contingency-fee').get('contingency-fee-schedules');
  const validatedResponse = validateResponse(apiResponse);
  if (apiResponse?.status === 200 && validatedResponse) {
    const payloadResponse = apiResponse?.data.result;

    const convertedRespone = payloadResponse.map((data) => {
      return {
        contingencyfeeId: data.uuid,
        name: `${data.code}-${data.description}`,
        uuid: data.uuid,
        status: data.status,
        code: data.code
      };
    });

    const sortAccordingToCode = (data) => {
      return data.sort((a, b) => {
        const returnValue = b.code > a.code ? -1 : 0;
        return a.code > b.code ? 1 : returnValue;
      });
    };

    dispatch(LISTACTIVECONTIGENCYFEE(sortAccordingToCode(convertedRespone)));
  }
};

/* --------------------- Get Account Financial Details----*/
export const GETACCOUNTFINANCIALDETAILS = (accountId) => async (dispatch) => {
  const apiResponse = await ApiServices('consumer-financial').get(
    `/consumer-financial/account/${accountId}`
  );
  const validatedResponse = validateResponse(apiResponse);
  if (apiResponse?.status === 200 && validatedResponse) {
    const payloadResponse = apiResponse?.data.result;
    dispatch(GETFINANCIALDETAILS(payloadResponse));
  }
};

/* --------------------- Post Account Financial Details----*/
export const POSTACCOUNTFINANCIALDETAILS = (payload, accountId) => async (dispatch) => {
  const apiResponse = await ApiServices('consumer-financial').put(
    `/consumer-financial/account/${accountId}`,
    payload
  );
  const validatedResponse = validateResponse(apiResponse);
  if (apiResponse?.status === 200 && validatedResponse) {
    const payloadResponse = apiResponse?.data.result;
    dispatch(UPDATEFINACIALDETIALS(payloadResponse));
  }
};

/*----------------------------GET KPI - CALL WRAP DATA------------------------------------*/
export const GETKPICALLWRAPDATA = (startDate , endDate ) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(`/v1/call-wrap-ups/stats?startDate=${startDate}&endDate=${endDate}`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(KPICALLWRAP(validatedResponse));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/*----------------------------GET QUEUE DATA------------------------------------*/
export const GETQUEUEDATA = (portfolioId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(`/v1/portfolio/${portfolioId}/queues`);
    const validatedResponse = validateResponse(apiResponse);
    //Modifing data as static data is coming 
    validatedResponse.queues.forEach((data)=>{
      data.workedAccountHolders = 0;
      data.unworkedAccountHolders = 100;
    })
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETQUEUE(validatedResponse));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};