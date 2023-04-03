import { ASSIGNEDATTORNEYS, ATTORNEYASSIGNEDFLAG } from './Actions';
import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';

export const GETASSIGNEDATTORNEYS = (responsibleId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('account').get(
      `/v1/responsibles/${responsibleId}/attorneys`
    );
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      const attorneyWithDetails = validatedResponse.filter((response) => !response.toBeAssigned);
      const attorneyWithoutDetails = validatedResponse.filter((response) => response.toBeAssigned);
      dispatch(ASSIGNEDATTORNEYS(attorneyWithDetails)); ///responsible for showing data in table
      dispatch(ATTORNEYASSIGNEDFLAG(attorneyWithoutDetails)); ///responsible for show/hide assigned attorney flag
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

// -------------------------- ADD ATTORNEY API ----------------------------------------------------
export const ADDATTORNEY =
  (responsibleId, postData, handleDialog, showDialog, form) => async (dispatch) => {
    try {
      let apiResponse = await ApiServices('account', 'Attorney Added').post(
        `/v1/responsibles/${responsibleId}/attorneys`,
        postData
      );

      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETASSIGNEDATTORNEYS(responsibleId));
        handleDialog(false);
        form.current.reset();
      }
    } catch (error) {
      handleNetworkError(error);
    }
  };

// -------------------------- UPDATE ASSIGNED ATTORNEY ----------------------------------------------------
export const UPDATEASSIGNEDATTORNEY =
  (attorneyId, addAttorneyInputs, handleDialog, showDialog, form) => async (dispatch) => {
    try {
      let apiResponse = await ApiServices('account', 'Updated Assigned Attorney').patch(
        `/v1/attorneys/${attorneyId}`,
        addAttorneyInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        let responsibleId = localStorage.getItem('responsibleId');
        dispatch(GETASSIGNEDATTORNEYS(responsibleId));
        handleDialog(false);
        }
    } catch (error) {
      handleNetworkError(error);
    }
  };
//-------------------------- HISTORICAL ASSIGNED ----------------------------------//
export const ATTORNEYTOHISTORY = (attorneyId, handleDialogClose) => async (dispatch) => {
  try {
    let responsibleId = localStorage.getItem('responsibleId');
    let apiResponseHistory = await ApiServices('account', 'Assigned Attorney Moved To History').put(
      `/v1/responsibles/${responsibleId}/attorneys/${attorneyId}/`
    );
    const validatedResponseHistory = validateResponse(apiResponseHistory);
    const status = apiResponseHistory?.status === 200 && validatedResponseHistory;
    if (status) {
      dispatch(GETASSIGNEDATTORNEYS(responsibleId));
      handleDialogClose(false);
    }
  } catch (error) {
    handleNetworkError(error);
  }
};


// -------------------------- UPDATE ASSIGNED ATTORNEY TO HISTORY----------------------------------------------------
export const UPDATEASSIGNEDATTORNEYTOHISTORY =
  (attorneyId, addAttorneyInputs, handleDialog, showDialog, form) => async (dispatch) => {
    try {
      let responsibleId = localStorage.getItem('responsibleId');
      let apiResponse = await ApiServices(
        'account',
        'Assigned Attorney Moved To History'
      ).put(`/v1/responsibles/${responsibleId}/attorneys/${attorneyId}/`);
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        let responsibleId = localStorage.getItem('responsibleId');
        dispatch(GETASSIGNEDATTORNEYS(responsibleId));
        handleDialog(false);
      }
    } catch (error) {
      handleNetworkError(error);
    }
  };

// -------------------------- DELETE ASSIGNED ATTORNEY ----------------------------------------------------
export const DELETEASSIGNEDATTORNEY =
  (attorneyId, handleDialog, showDialog) => async (dispatch) => {
    try {
      let apiResponse = await ApiServices('account', 'Deleted Assigned Attorney').delete(
        `/v1/attorneys/${attorneyId}`
      );
      if (apiResponse?.status === 204) {
        let responsibleId = localStorage.getItem('responsibleId');
        dispatch(GETASSIGNEDATTORNEYS(responsibleId));
        handleDialog(!showDialog);
      }
    } catch (error) {
      handleNetworkError(error);
    }
  };

// -------------------------- SEARCH ATTORNEY ----------------------------------------------------
export const SEARCHATTORNEY = (text) => async (dispatch) => {
  try {
    let apiResponse = await ApiServices('account').get(`/v1/attorneys/search?searchKey=${text}`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      return validatedResponse.attorneys;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

// -------------------------- ASSIGN EXISTING ATTORNEY ----------------------------------------------------

export const ASSIGNEXISTINGATTORNEY =
  (responsibleId, attorneyId, handleDialog, showDialog) => async (dispatch) => {
    const assigned = {};
    assigned.responsibleId = responsibleId;
    try {
      let apiResponse = await ApiServices('account', ' Assigned Attorney').post(
        `/v1/attorneys/${attorneyId}/responsibles`,
        assigned
      );

      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETASSIGNEDATTORNEYS(responsibleId));
        handleDialog(!showDialog);
      }
    } catch (error) {
      handleNetworkError(error);
    }
  };
