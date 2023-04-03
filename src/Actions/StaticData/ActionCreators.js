import {
  ALLCOUNTRIES,
  ALLSTATES,
  STATES,
  ALLSTATESONLOAD,
  ALERTTYPES,
  ADDALERTINPUTS,
  VIEWCALLWRAPUPDATA,
  VIEWCALLMETHODS,
  CALLWRAPUPINPUTS,
  PREFEREDLANGUAGES,
  CONSUMERDEMOGRAPHICSOURCE,
  DISPUTEREASONS,
  BANKRUPTCYTYPE,
  COMPLAINTSTYPES,
  CUSTOMFIELDLOCATIONS,
  CUSTOMFIELDDATATYPE
} from './Actions';
import { ApiServices } from '@oasis/js-data';
import { handleNetworkError, validateResponse } from '@oasis/js-utils';
import { GETALERTNOTIFICATION } from '../ConsumerDetails/ActionCreators';

/* --------------------- GET ALL COUNTRIES -------------------------------*/

export const GETALLCOUNTRIES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/countries`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.countries) {
      dispatch(ALLCOUNTRIES(validatedResponse?.countries));
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* --------------------- GET ALL STATES -------------------------------*/

export const GETALLSTATES = (countryId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/countries/${countryId}/states`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.country?.states) {
      dispatch(ALLSTATES(validatedResponse?.country?.states));
      dispatch(ALLSTATESONLOAD(validatedResponse?.country));
      return validatedResponse?.country?.states;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/*-------------------ALERT----------------------*/

export const ADDALERT = (form, addAlertInputs, handleDialog, showDialog) => async (dispatch) => {
  try {
    const arr = [];
    arr.push(addAlertInputs);
    const apiResponse = await ApiServices('static-data').post(`/alerts`, arr);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(ADDALERTINPUTS('', '', 'reset'));
      dispatch(GETALERTTYPES());
      form.current.reset();
      handleDialog(!showDialog);
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- EDIT ALERT -------------------------------*/

export const EDITALERT =
  (form, editAlertInputs, handleDialog, showDialog, responsibleId) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('static-data').put(
        `/alerts/${editAlertInputs.id}`,
        editAlertInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETALERTTYPES());
        dispatch(GETALERTNOTIFICATION(responsibleId));
        form.current.reset();
        handleDialog(!showDialog);
      }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };

/* --------------------- VIEW Alert -------------------------------*/
// Get all alert
export const GETALERTTYPES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/alerts`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.alerts) {
      dispatch(ALERTTYPES(validatedResponse.alerts));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

export const GETCALLWRAPUPDATA = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/call-wrap-ups`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.callWrapUps) {
      dispatch(VIEWCALLWRAPUPDATA(validatedResponse.callWrapUps));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

export const GETCALLMETHODS = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/call-methods`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.callMethods) {
      dispatch(VIEWCALLMETHODS(validatedResponse.callMethods));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

export const ADDCALLWRAPUPDATA =
  (form, dataToSave, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('static-data').post(`/call-wrap-ups`, dataToSave);
      if (apiResponse?.status === 200) {
        dispatch(CALLWRAPUPINPUTS('', '', 'reset'));
        dispatch(GETCALLWRAPUPDATA());
        form.current.reset();
        handleDialog(!showDialog);
      }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };
/* --------------------- EDIT CALL WRAP UP -------------------------------*/

export const EDITCALLWRAPUP =
  (form, editCallWrapInputs, handleDialog, showDialog) => async (dispatch) => {
    try {
      const apiResponse = await ApiServices('static-data').put(
        `call-wrap-ups/${editCallWrapInputs.id}/callWrapUp`,
        editCallWrapInputs
      );
      const validatedResponse = validateResponse(apiResponse);
      if (apiResponse?.status === 200 && validatedResponse) {
        dispatch(GETCALLWRAPUPDATA());
        handleDialog(!showDialog);
       }
    } catch (error) {
      handleNetworkError(error);
      console.log(error);
    }
  };

export const GETSTATES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/states`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.states) {
      dispatch(STATES(validatedResponse?.states));
      return validatedResponse?.states;
    }
  } catch (error) {
    handleNetworkError(error);
  }
};

/* --------------------- GET PREFERED LANGUAGES -------------------------------*/

export const GETPREFEREDLANGUAGES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/consumer-preferred-languages`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.languages) {
      dispatch(PREFEREDLANGUAGES(validatedResponse.languages));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/*-------------------Consumer demographic sources------------------------------------*/
export const GETCONSUMERDEMOGRAPHICSOURCE = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/consumer-demographic-sources`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.sources) {
      dispatch(CONSUMERDEMOGRAPHICSOURCE(validatedResponse.sources));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/*-------------------DISPUTE REASONS------------------------------------*/
export const GETDISPUTEREASON = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/dispute-reasons`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.disputeReasons) {
      dispatch(DISPUTEREASONS(validatedResponse.disputeReasons));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/*-------------------BANKRUPTCY TYPES------------------------------------*/

export const GETBANKRUPTCYTYPES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/bankruptcy-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.bankruptcyTypes) {
      dispatch(BANKRUPTCYTYPE(validatedResponse.bankruptcyTypes));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};
/*-------------------COMPLAINTS TYPES------------------------------------*/

export const GETCOMPLAINTTYPE = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/complaint-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.complaintTypes) {
      dispatch(COMPLAINTSTYPES(validatedResponse.complaintTypes));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};
/*-------------------CUSTOM FIELD LOCATION------------------------------------*/

export const GETCUSTOMFIELDLOCATION = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/custom-field-locations`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.locations) {
      dispatch(CUSTOMFIELDLOCATIONS(validatedResponse.locations));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};
/*-------------------CUSTOM FIELD DATATYPE------------------------------------*/

export const GETCUSTOMFIELDDATATYPE = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices('static-data').get(`/custom-field-data-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.dataTypes) {
      dispatch(CUSTOMFIELDDATATYPE(validatedResponse.dataTypes));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};
