import { ADD_PHONE_INPUTS,PHONE_TYPES,VIEW_PHONE_DATA,ADD_EMAIL_INPUTS, EMAIL_TYPES, VIEW_EMAIL_DATA, ADDRESS_TYPES, ADD_ADDRESS_INPUTS,
  VIEW_ADDRESS_DATA,PHONE_DATA_FOR_CALLWRAPUP, } from "./Types.js";

/*------------------------------ PHONE TYPES -------------------------------------------*/

export const PHONETYPES = (value) => {
  return {
    type: PHONE_TYPES,
    payload: { value },
  };
};

/*------------------------------ SAVE PHONE INPUTS -------------------------------------------*/

export const ADDPHONEINPUTS = (name, value, operation) => {
  return {
    type: ADD_PHONE_INPUTS,
    payload: { name, value, operation },
  };
};

export const VIEWPHONEDATA = (value) => {
  return {
    type: VIEW_PHONE_DATA,
    payload: { value },
  };
};

export const PHONEDATAFORCALLWRAPUP = (value) => {
  return {
    type: PHONE_DATA_FOR_CALLWRAPUP,
    payload: { value },
  };
};
////////////////////////////////// EMAIL ADDRESS //////////////////////////////////////////

/*------------------------------ EMAIL TYPES -------------------------------------------*/

export const EMAILTYPES = (value) => {
  return {
    type: EMAIL_TYPES,
    payload: { value },
  };
};

/*------------------------------ SAVE EMAIL INPUTS -------------------------------------------*/

export const ADDEMAILINPUTS = (name, value, operation) => {
  return {
    type: ADD_EMAIL_INPUTS,
    payload: { name, value, operation },
  };
};

/*------------------------------ VIEW EMAIL -------------------------------------------*/

export const VIEWEMAILDATA = (value) => {
  return {
    type: VIEW_EMAIL_DATA,
    payload: { value },
  };
};

////////////////////////////////// CONSUMER ADDRESS //////////////////////////////////////////

/*------------------------------ ADDRESS TYPES -------------------------------------------*/

export const ADDRESSTYPES = (value) => {
  return {
    type: ADDRESS_TYPES,
    payload: { value },
  };
};

/*------------------------------ VIEW ADDRESS -------------------------------------------*/

export const VIEWADDRESSDATA = (value) => {
  return {
    type: VIEW_ADDRESS_DATA,
    payload: { value },
  };
};


/*------------------------------ SAVE ADDRESS INPUTS -------------------------------------------*/

export const ADDADDRESSINPUTS = (name, value, operation) => {
  return {
    type: ADD_ADDRESS_INPUTS,
    payload: { name, value, operation },
  };
};