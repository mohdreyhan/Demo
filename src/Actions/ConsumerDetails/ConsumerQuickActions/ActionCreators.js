import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';
import { GETCONSUMERDEMOGRAPHICS, SETALLACCOUNTSPOKELIST } from '../ActionCreators.js';
import {
  /////////////////////////////// LITIGIOUS  ////////////////////////////////
  LITIGIOUSINFORMATION,
  /////////////////////////////// INCARCERATION ////////////////////////////////
  INCARCERATIONINFORMATION,
  /////////////////////////////// DECEASED ////////////////////////////////
  DECEASEDINFORMATION,
  //////////////////// DIPSUTE ///////////////////////////
  DISPUTEINFORMATION,
  //////////////////// COMPLAINTS ////////////////////////
  COMPLAINTINFORMATION,
  //////////////////// BANKRUPTCY ///////////////////////////
  ADDBANKRUPTCYINPUTS,
  BANKRUPTCYINFORMATION
} from './Actions.js';

/* --------------------- GET LITIGIOUS -------------------------------*/

export const GETINCARCERATIONINFORMATION = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/customers/${customerId}/incarcerated-informations`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      validatedResponse.isIncarcerated = true;
      dispatch(INCARCERATIONINFORMATION(validatedResponse));
    }
  } catch (error) {
    throw handleNetworkError(error);
  }
};

/* --------------------- EDIT INCARCERATION-------------------------------*/

export const EDITINCARCERATION =
  (tableRowData, customerId, incarceratedId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Updated Incarcerated Information').put(
        `/v1/incarcerated-informations/${incarceratedId}`,
        tableRowData
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMERDEMOGRAPHICS(customerId));
        handleDialog(!showDialog);
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/* --------------------- ADD INCARCERATION-------------------------------*/

export const ADDINCARCERATION =
  (form, inputData, customerId, handleDialog, showDialog, navigateToGenInfo) =>
  async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Added Incarcerated Information').post(
        `/v1/customers/${customerId}/incarcerated-informations`,
        inputData
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMERDEMOGRAPHICS(customerId));
        handleDialog(!showDialog);
        navigateToGenInfo();
        form.current.reset();
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/* --------------------- DELETE INCARCERATION-------------------------------*/

export const DELETEINCARCERATION =
  (customerId, incarceratedId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Deleted Incarcerated Information').delete(
        `/v1/incarcerated-informations/${incarceratedId}`
      );
      if (apiResponse?.status === 204) {
        dispatch(GETCONSUMERDEMOGRAPHICS(customerId));
        dispatch(INCARCERATIONINFORMATION([]));
        handleDialog(!showDialog);
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/////////////////////////////// LITIGIOUS  ////////////////////////////////

/* --------------------- ADD LITIGIOUS -------------------------------*/

export const ADDLITIGIOUS =
  (form, addLitigiousInputs, customerId, handleDialog, showDialog, navigateToGenInfo) =>
  async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Added Litigious Information').post(
        `/v1/customers/${customerId}/litigious-informations`,
        addLitigiousInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMERDEMOGRAPHICS(customerId));
        handleDialog(!showDialog);
        navigateToGenInfo();
        form.current.reset();
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/* --------------------- GET LITIGIOUS -------------------------------*/

export const GETLITIGIOUS = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/customers/${customerId}/litigious-informations`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      validatedResponse.isLitigious = true;
      dispatch(LITIGIOUSINFORMATION(validatedResponse));
    }
  } catch (error) {
    throw handleNetworkError(error);
  }
};

/* --------------------- EDIT LITIGIOUS-------------------------------*/

export const EDITLITIGIOUS =
  (tableRowData, customerId, litigiousId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Updated Litigious Information').put(
        `/v1/litigious-informations/${litigiousId}`,
        tableRowData
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCONSUMERDEMOGRAPHICS(customerId));
        handleDialog(!showDialog);
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/* --------------------- DELETE LITIGIOUS-------------------------------*/

export const DELETELITIGIOUS =
  (customerId, litigiousId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Deleted Litigious Information').delete(
        `/v1/litigious-informations/${litigiousId}`
      );
      if (apiResponse?.status === 204) {
        dispatch(GETCONSUMERDEMOGRAPHICS(customerId));
        dispatch(LITIGIOUSINFORMATION([]));
        handleDialog(!showDialog);
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

///////////////////////////////  DECEASEDINFO  ////////////////////////////////

export const GETDECEASEDINFORMATION = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/customers/${customerId}/deceased-informations`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(DECEASEDINFORMATION(validatedResponse));
    }
  } catch (error) {
    throw handleNetworkError(error);
  }
};

//////////////////// GET DIPSUTE ///////////////////////////

export const GETDISPUTEINFORMATION = (responsibleId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/responsibles/${responsibleId}/dispute-informations`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.dispute) {
      validatedResponse.dispute.isDisputed = true;
      dispatch(DISPUTEINFORMATION(validatedResponse?.dispute));
    }
  } catch (error) {
    throw handleNetworkError(error);
  }
};

/* --------------------- ADD DISPUTE -------------------------------*/

export const ADDDISPUTE =
  (addDisputeInputs, customerId, responsibleId, handleDialog, showDialog, navigateToGenInfo) =>
  async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Added Dispute Information').post(
        `/v1/responsibles/${responsibleId}/dispute-informations`,
        addDisputeInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(SETALLACCOUNTSPOKELIST(customerId));
        handleDialog(!showDialog);
        navigateToGenInfo();
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/* --------------------- EDIT DISPUTE-------------------------------*/

export const EDITDISPUTE =
  (tableRowData, customerId, disputeId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Updated Dispute Information').put(
        `/v1/dispute-informations/${disputeId}`,
        tableRowData
      );
      if (apiResponse?.status === 200) {
        dispatch(SETALLACCOUNTSPOKELIST(customerId));
        handleDialog(!showDialog);
        form.current.reset();
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/* --------------------- DELETE DISPUTE-------------------------------*/

export const DELETEDISPUTE =
  (customerId, disputeId, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Deleted Dispute Information').delete(
        `/v1/dispute-informations/${disputeId}`
      );
      if (apiResponse?.status === 204) {
        dispatch(SETALLACCOUNTSPOKELIST(customerId));
        dispatch(DISPUTEINFORMATION([]));
        handleDialog(!showDialog);
        form.current.reset();
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/* --------------------- ADD BANKRUPTCY -------------------------------*/

export const ADDBANKRUPTCY =
  (
    form,
    addBankruptcyInputs,
    responsibleId,
    customerId,
    handleDialog,
    showDialog,
    navigateToGenInfo
  ) =>
  async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Added Bankruptcy Information').post(
        `/v1/responsibles/${responsibleId}/bankruptcy-informations`,
        addBankruptcyInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(SETALLACCOUNTSPOKELIST(customerId));
        dispatch(ADDBANKRUPTCYINPUTS('', '', 'reset'));
        handleDialog(!showDialog);
        navigateToGenInfo();
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

////////////////////////EDIT BANKRUPTCY ///////////////////////////

export const EDITBANKRUPTCY =
  (bankruptcyInformationId, editBankruptcyInputs, handleDialog, showDialog, customerId) =>
  async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Bankruptcy Information Updated').put(
        `/v1/bankruptcy-informations/${bankruptcyInformationId}`,
        editBankruptcyInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(SETALLACCOUNTSPOKELIST(customerId));
        handleDialog(!showDialog);
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };
////////////////////////DELETE BANKRUPTCY /////////////////////
export const DELETEBANKRUPTCY =
  (bankruptcyInformationId, handleDialog, showDialog, customerId) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Deleted Bankruptcy Information').delete(
        `/v1/bankruptcy-informations/${bankruptcyInformationId}`
      );
      if (apiResponse?.status === 204) {
        dispatch(SETALLACCOUNTSPOKELIST(customerId));
        dispatch(BANKRUPTCYINFORMATION(null));
        handleDialog(!showDialog);
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };

/* --------------------- GET BANKRUPTCY -------------------------------*/
export const GETBANKRUPTCYINFORMATION = (responsibleId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/responsibles/${responsibleId}/bankruptcy-informations`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      validatedResponse.bankruptcy.isBankrupt = true;
      dispatch(BANKRUPTCYINFORMATION(validatedResponse.bankruptcy));
    }
  } catch (error) {
    throw handleNetworkError(error);
  }
};
//////////////////// GET COMPLAINTS ///////////////////////////

export const GETCOMPLAINTINFORMATION = (responsibleId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `v1/responsibles/${responsibleId}/complaint-informations`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.complaints) {
      dispatch(COMPLAINTINFORMATION(validatedResponse?.complaints));
    }
  } catch (error) {
    throw handleNetworkError(error);
  }
};

/* --------------------- ADD COMPLAINT -------------------------------*/

export const ADDCOMPLAINTS =
  (addComplaintInputs, customerId, responsibleId, handleDialog, showDialog, navigateToGenInfo) =>
  async (dispatch) => {
    try {
      const apiResponse = await ApiServices('account', 'Added Complaint Information').post(
        `/v1/responsibles/${responsibleId}/complaint-informations`,
        addComplaintInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(SETALLACCOUNTSPOKELIST(customerId));
        handleDialog(!showDialog);
        navigateToGenInfo();
      }
    } catch (error) {
      throw handleNetworkError(error);
    }
  };
