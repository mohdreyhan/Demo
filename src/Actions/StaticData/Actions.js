import {
  SAVE_COUNTRIES, SAVE_STATES,SAVE_STATES_ON_LOAD, ADD_ALERT_INPUTS,VIEW_CALL_WRAPUP_DATA,
  VIEW_CALL_METHODS, ADD_CALL_WRAPUP_INPUTS, GET_STATES, PREFERED_LANGUAGES, ALERT_TYPES,CONSUMER_DEMOGRAPHIC_SOURCE,DISPUTE_REASONS,BANKRUPTCY_TYPE,COMPLAINTS_TYPES,
  CUSTOMFIELD_LOCATIONS, CUSTOMFIELD_DATATYPE
} from "./Types.js";

/*----------------------------- SAVE COUNTRIES------------------------------------------*/

export const ALLCOUNTRIES = (value) => {
  return    {
    type: SAVE_COUNTRIES,
    payload: { value },
  };
};

/*----------------------------- SAVE STATES------------------------------------------*/

export const ALLSTATES = (value) => {
  return {
    type: SAVE_STATES,
    payload: { value },
  };
};

/*----------------------------- SAVE STATES ON PAGE LOAD------------------------------------------*/

export const ALLSTATESONLOAD = (value) => {
  return {
    type: SAVE_STATES_ON_LOAD,
    payload: { value },
  };
};

/*------------------------------ SAVE ALERT INPUTS -------------------------------------------*/

export const ADDALERTINPUTS = (name, value) => {
  return {
    type: ADD_ALERT_INPUTS,
    payload: { name, value },
  };
};

/*------------------------------ VIEW ALERT -------------------------------------------*/

export const ALERTTYPES = (value) => {
  return {
    type: ALERT_TYPES,
    payload: { value },
  };
};

export const VIEWCALLWRAPUPDATA = (value) => {
  return {
    type: VIEW_CALL_WRAPUP_DATA,
    payload: { value },
  };

}

export const VIEWCALLMETHODS = (value) => {
  return {
    type: VIEW_CALL_METHODS,
    payload: { value },
  }; 
}

/*------------------------------ SAVE CALL WRAP-UP INPUTS -------------------------------------------*/

export const CALLWRAPUPINPUTS = (name, value) => {
  return {
    type: ADD_CALL_WRAPUP_INPUTS,
    payload: { name, value },
  };
};


export const STATES = (value) => {
  return {
    type: GET_STATES,
    payload: { value },
  };
};

/*------------------------------ PREFERED LANGUAGES -------------------------------------------*/

export const PREFEREDLANGUAGES = (value) => {
  return {
    type: PREFERED_LANGUAGES,
    payload: { value },
  };
};

/*------------------------------CONSUMER DEMOGRAPHIC SOURCE-------------------------------------------*/

export const CONSUMERDEMOGRAPHICSOURCE = (value) => {
  return {
    type: CONSUMER_DEMOGRAPHIC_SOURCE,
    payload: { value },
  };
};

/*------------------------------DISPUTE REASONS-------------------------------------------*/

export const DISPUTEREASONS = (value) => {
  return {
    type: DISPUTE_REASONS,
    payload: { value },
  };
};

/*------------------------------BANKRUPTCY TYPE--------------------------------------------*/

export const BANKRUPTCYTYPE = (value) => {
  return {
    type: BANKRUPTCY_TYPE,
    payload: { value },
  };
};

export const COMPLAINTSTYPES = (value) => {
  return {
    type: COMPLAINTS_TYPES,
    payload: { value },
  };
};
export const CUSTOMFIELDLOCATIONS = (value) => {
  return {
    type: CUSTOMFIELD_LOCATIONS,
    payload: { value },
  };
};
export const CUSTOMFIELDDATATYPE = (value) => {
  return {
    type: CUSTOMFIELD_DATATYPE,
    payload: { value },
  };
};
