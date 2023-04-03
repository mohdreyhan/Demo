import {
  TRIGGER_POPUP,
  ////////////////////////////////LITIGIOUS////////////////////
  ADD_LITIGIOUS_INPUTS,
  LITIGIOUS_INFORMATION,
  //////////////////// DECEASED ///////////////////////////
  DECEASED_INFO,
  //////////////////// INCARCERATION ///////////////////////////
  INCARCERATION_INFORMATION,
  //////////////////// DIPSUTE ///////////////////////////
  DEPENDENTS_OF_RESPONSIBLE,
  DISPUTE_INFO,
  //////////////////// COMPLAINTS ///////////////////////
  COMPLAINT_INFO,
  ADD_BANKRUPTCY_INPUTS,
  ADD_COURT_INPUTS,
  ADD_TRUSTEE_INPUTS,
  BANKRUPTCY_INFO
} from './Types.js';

/*------------------------------ TRIGGER POPUP -------------------------------------------*/

export const TRIGGERPOPUP = (value) => {
  return {
    type: TRIGGER_POPUP,
    payload: { value }
  };
};

////////////////////////////////LITIGIOUS///////////////////////

/*------------------------------ LITIGIOUS INFORMATION -------------------------------------------*/

export const LITIGIOUSINFORMATION = (value) => {
  return {
    type: LITIGIOUS_INFORMATION,
    payload: { value }
  };
};

/*------------------------------ ADD LITIGIOUS INPUTS -------------------------------------------*/

export const ADDLITIGIOUSINPUTS = (name, value, operation) => {
  return {
    type: ADD_LITIGIOUS_INPUTS,
    payload: { name, value, operation }
  };
};

////////////////////////////////INCARCERATION///////////////////////////////////

export const INCARCERATIONINFORMATION = (value) => {
  return {
    type: INCARCERATION_INFORMATION,
    payload: { value }
  };
};

////////////////////////////////DECEASED///////////////////////////////////

export const DECEASEDINFORMATION = (value) => {
  return {
    type: DECEASED_INFO,
    payload: { value }
  };
};

//////////////////// DIPSUTE ///////////////////////////

export const DEPENDENTSOFRESPONSIBLE = (value) => {
  return {
    type: DEPENDENTS_OF_RESPONSIBLE,
    payload: { value }
  };
};

export const DISPUTEINFORMATION = (value) => {
  return {
    type: DISPUTE_INFO,
    payload: { value }
  };
};

/*------------------------------ ADD BANKRUPTCY INPUTS -------------------------------------------*/

export const ADDBANKRUPTCYINPUTS = (name, value, operation) => {
  return {
    type: ADD_BANKRUPTCY_INPUTS,
    payload: { name, value, operation }
  };
};

/*------------------------------ ADD COURT INPUTS -------------------------------------------*/

export const ADDCOURTINPUTS = (name, value, operation) => {
  return {
    type: ADD_COURT_INPUTS,
    payload: { name, value, operation }
  };
};

/*------------------------------ ADD TRUSTEE INPUTS -------------------------------------------*/

export const ADDTRUSTEEINPUTS = (name, value, operation) => {
  return {
    type: ADD_TRUSTEE_INPUTS,
    payload: { name, value, operation }
  };
};


export const COMPLAINTINFORMATION = (value) => {
  return {
    type: COMPLAINT_INFO,
    payload: { value }
  };
}

export const BANKRUPTCYINFORMATION = (value) => {
  return {
    type: BANKRUPTCY_INFO,
    payload: { value }
  };
}