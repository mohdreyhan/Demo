import {
  /////////////////// PHONE ADDRESS //////////////////////
  PHONETYPES, VIEWPHONEDATA,  ADDPHONEINPUTS,  PHONEDATAFORCALLWRAPUP,
  /////////////////// EMAIL ADDRESS //////////////////////
  EMAILTYPES, VIEWEMAILDATA, ADDEMAILINPUTS,
  /////////////////// CONSUMER ADDRESS //////////////////////
  ADDRESSTYPES, VIEWADDRESSDATA, ADDADDRESSINPUTS,
 
} from "./Actions";
import { ApiServices } from "@oasis/js-data";
import { handleNetworkError, validateResponse } from "@oasis/js-utils";
import { sortByPrimaryStatus } from "../../../Components/Common/commonfunctions";

////////////////////////////////// PHONE ADDRESS //////////////////////////////////////////

/* --------------------- PHONE TYPES -------------------------------*/

export const GETPHONETYPES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("static-data").get(`/phone-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.phoneTypes) {
      dispatch(PHONETYPES(validatedResponse.phoneTypes));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- ADD PHONE -------------------------------*/

export const ADDPHONE = (form, addPhoneInputs, customerId, handleDialog, showDialog,handleDisable) => async (dispatch) => {
  try {
    handleDisable(true);
    const apiResponse = await ApiServices("account","Phone Record Added").post(`/v1/customers/${customerId}/phones`, addPhoneInputs);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETPHONEDATA(customerId));
      dispatch(ADDPHONEINPUTS("", "", "reset"))
      form.current.reset();
      handleDialog(!showDialog);
    }
  } catch (error) {
    handleNetworkError(error);
    handleDisable(false);
    console.log(error);
  }
};

/* --------------------- VIEW PHONE -------------------------------*/

export const GETPHONEDATA = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("account").get(`/v1/customers/${customerId}/phones`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.phones) {
      let phoneData = sortByPrimaryStatus(validatedResponse?.phones);
      dispatch(PHONEDATAFORCALLWRAPUP(validatedResponse?.phones));
      dispatch(VIEWPHONEDATA(phoneData));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- VIEW PHONE -------------------------------*/

export const GETPHONEDATAFORCALLWRAPUP = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("account").get(`/v1/customers/${customerId}/phones`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.phones) {
      let phoneData = sortByPrimaryStatus(validatedResponse?.phones);
      dispatch(PHONEDATAFORCALLWRAPUP(phoneData));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};




/* --------------------- EDIT PHONE -------------------------------*/

export const EDITPHONE = (form, editPhoneInputs, customerId, handleDialog, showDialog,handleDisable) => async (dispatch) => {
  try {
    handleDisable(true)
    const apiResponse = await ApiServices("account","Phone Record Updated").patch(`/v1/customer-contact-phones/${editPhoneInputs.id}`, editPhoneInputs);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETPHONEDATA(customerId));
      form.current.reset();
      handleDialog(!showDialog);
    }
  } catch (error) {
    handleNetworkError(error);
    handleDisable(false)
    console.log(error);
  }
};


////////////////////////////////// EMAIL ADDRESS //////////////////////////////////////////

/* --------------------- EMAIL TYPES -------------------------------*/

export const GETEMAILTYPES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("static-data").get(`/email-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.emailTypes) {
      dispatch(EMAILTYPES(validatedResponse.emailTypes));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- ADD EMAIL -------------------------------*/

export const ADDEMAIL = (form, addEmailInputs, customerId, handleDialog, showDialog) => async (dispatch) => {
  try {
    const arr = [];
    arr.push(addEmailInputs);
    const apiResponse = await ApiServices("account","Email Record Added").post(`/v1/customers/${customerId}/emails`, arr);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETVIEWEMAILDATA(customerId));
      dispatch(ADDEMAILINPUTS("", "", "reset"))
      form.current.reset();
      handleDialog(!showDialog);

    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- EDIT EMAIL -------------------------------*/

export const EDITEMAIL = (form, editEmailInputs, customerId, handleDialog, showDialog) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("account","Email Record Updated").put(`/v1/customers/emails/${editEmailInputs.id}`, editEmailInputs);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETVIEWEMAILDATA(customerId));
      form.current.reset();
      handleDialog(!showDialog);
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- VIEW EMAIL -------------------------------*/

export const GETVIEWEMAILDATA = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("account").get(`/v1/customers/${customerId}/emails`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.emails) {
      let emailData = sortByPrimaryStatus(validatedResponse?.emails);
      dispatch(VIEWEMAILDATA(emailData));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

////////////////////////////////// CONSUMER ADDRESS //////////////////////////////////////////


/* --------------------- ADDRESS TYPES -------------------------------*/

export const GETADDRESSTYPES = () => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("account").get(`/v1/address-types`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.addressTypes) {
      validatedResponse?.addressTypes.sort((a, b) => (a.id) - (b.id));
      dispatch(ADDRESSTYPES(validatedResponse?.addressTypes));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- VIEW ADDRESS -------------------------------*/

export const GETCONSUMERADDRESS = (customerId) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("account").get(`/v1/customers/${customerId}/addresses`);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse?.addresses) {
      let addressData = sortByPrimaryStatus(validatedResponse?.addresses);
      dispatch(VIEWADDRESSDATA(addressData));
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- ADD ADDRESS -------------------------------*/

export const ADDADDRESS = (form, addAddressInputs, customerId, handleDialog, showDialog) => async (dispatch) => {
  try {
    const arr = [];
    arr.push(addAddressInputs);
    const apiResponse = await ApiServices("account","Address Record Added").post(`/v1/customers/${customerId}/addresses`, arr);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETCONSUMERADDRESS(customerId));
      dispatch(ADDADDRESSINPUTS("", "", "reset"))
      form.current.reset();
      handleDialog(!showDialog);
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

/* --------------------- EDIT ADDRESS -------------------------------*/

export const EDITADDRESS = (form, editAddressInputs, customerId, handleDialog, showDialog) => async (dispatch) => {
  try {
    const apiResponse = await ApiServices("account","Address Record Updated").put(`/v1/customers/addresses/${editAddressInputs.id}`, editAddressInputs);
    const validatedResponse = validateResponse(apiResponse);
    if (apiResponse?.status === 200 && validatedResponse) {
      dispatch(GETCONSUMERADDRESS(customerId));
      form.current.reset();
      handleDialog(!showDialog);
    }
  } catch (error) {
    handleNetworkError(error);
    console.log(error);
  }
};

