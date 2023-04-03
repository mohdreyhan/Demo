import {
  ALL_CONSUMER_ACCOUNTS,
  ALL_CONSUMER_ACCOUNTS_FOR_CALLWRAPUP,
  CONSUMER_PERSONAL_INFO,
  ACCOUNT_SUMMARY_CONSUMER_DATA,
  CONSUMER_DEMOGRAPHICS,
  SEARCH_CONSUMER_DATA,
  ADD_EMPLOYER_INPUTS,
  CONSUMER_EMPLOYERS,
  EDIT_CONSUMER,
  EDIT_CONSUMER_INPUTS,
  RELATIONSHIP_TYPES_DATA,
  ALL_NOTES,
  ALERT_LIST,
  SAVE_PORTFOLIO_ID,
  CONSUMER_VERIFICATION,
  CONSUMER_SKIP_VERIFICATION,
  VERIFICATION_QUESTIONNAIRE,
  SPOKETO_LIST,
  OLD_SPOKETO_LIST,
  ADD_CALLWRAPUPNOTE_INPUTS,
  SUBMIT_FORM_CALL,
  ACCOUNT_GENERAL_INFO,
  ACCOUNT_SUMMARY_INFO,
  ACCOUNT_LEFT_MENU_INFO,
  CURRENT_ACCOUNT_NUMBER,
  SINGLE_PAYMENT_INFO,
  CURRENT_ACCOUNT_SET,
  ACCOUNT_BALANACE,
  ACCOUNT_SUB_BALANACE_TYPE,
  GET_EMPLOYMENT_TYPES,
  SAVE_DEPENDENTS_OF_ACCOUNT,
  SAVE_RESPONSIBLES,
  RESET_ALL,
  ADD_DECEASED_INPUTS,
  DECEASED_INFO,
  CONSUMER_ALIASES,
  ALIAS_TYPES,
  ADD_EXECUTOR_INPUTS,
  ADD_COURT_INPUTS,
  EDIT_DECEASED,
  DELETE_DECEASED,
  LIST_ACTIVE_CONTIGENCYFEE,
  GET_ACCOUNT_FINANCIAL_DETAILS,
  UPDATE_ACCOUNT_FINANCIAL_DETAILS,
  KPI_DETAILS,
  QUEUE_DETAILS
} from './Types.js';

/*------------------------------CONSUMER VERIFICATION -------------------------------------------*/

export const CONSUMERVERIFICATION = (value) => {
  return {
    type: CONSUMER_VERIFICATION,
    payload: { value }
  };
};

/*------------------------------CONSUMER_SKIP_VERIFICATION-------------------------------------------*/

export const CONSUMERSKIPVERIFICATION = (value) => {
  return {
    type: CONSUMER_SKIP_VERIFICATION,
    payload: { value }
  };
};

/*------------------------------GET ALL CONSUMER PERSONAL INFO -------------------------------------------*/

export const CONSUMERPERSONALINFO = (value) => {
  return {
    type: CONSUMER_PERSONAL_INFO,
    payload: { value }
  };
};

/*------------------------------ SAVE PORTFOLIO ID -------------------------------------------*/

export const SAVEPORTFOLIOID = (value) => {
  return {
    type: SAVE_PORTFOLIO_ID,
    payload: { value }
  };
};

/*------------------------- GET ALL ACCOUNTS ASSOCIATED TO THE CONSUMER ---------------------------------*/

export const ALLCONSUMERACCOUNTS = (value) => {
  return {
    type: ALL_CONSUMER_ACCOUNTS,
    payload: { value }
  };
};

/*------------------------- GET ALL ACCOUNTS ASSOCIATED TO THE CONSUMER  FORCALLWRAPUP ---------------------------------*/

export const ALLCONSUMERACCOUNTSFORCALLWRAPUP = (value) => {
  return {
    type: ALL_CONSUMER_ACCOUNTS_FOR_CALLWRAPUP,
    payload: { value }
  };
};

/*------------------------- GET ALL ACCOUNT SUMMARY CONSUMER DATA ---------------------------------*/
export const ACCOUNTSUMMARYCONSUMERDATA = (value) => {
  return {
    type: ACCOUNT_SUMMARY_CONSUMER_DATA,
    payload: { value }
  };
};

/*------------------------- UPDATE RESPONSIBLE ID---------------------------------*/
export const CONSUMERDEMOGRAPHICS = (value) => {
  return {
    type: CONSUMER_DEMOGRAPHICS,
    payload: { value }
  };
};
/*------------------------- GET SEARCH CONSUMER DATA ---------------------------------*/
export const SEARCHCONSUMERDATA = (value) => {
  return {
    type: SEARCH_CONSUMER_DATA,
    payload: { value }
  };
};

/*------------------------- EDIT CONSUMER DEMOGRAPHICS ---------------------------------*/
export const EDITCONSUMER = (value) => {
  return {
    type: EDIT_CONSUMER,
    payload: { value }
  };
};

/*------------------------- EDIT CONSUMER DEMOGRAPHICS INPUTS---------------------------------*/
export const EDITCONSUMERINPUTS = (name, value) => {
  return {
    type: EDIT_CONSUMER_INPUTS,
    payload: { name, value }
  };
};

/*------------------------- SAVE CONSUMER EMPLOYERS ---------------------------------*/
export const CONSUMEREMPLOYERS = (value) => {
  return {
    type: CONSUMER_EMPLOYERS,
    payload: { value }
  };
};

/*------------------------- SAVE EMPLOYER INPUTS ---------------------------------*/
export const ADDEMPLOYERINPUTS = (name, value, operation) => {
  return {
    type: ADD_EMPLOYER_INPUTS,
    payload: { name, value, operation }
  };
};

/*------------------------- EDIT_EMPLOYER---------------------------------*/
export const EDITEMPLOYERINPUTS = (value) => {
  return {
    type: EDIT_CONSUMER_INPUTS,
    payload: { value }
  };
};

/*------------------------- GET RELATIONSHIPTYPES DATA ---------------------------------*/
export const RELATIONSHIPTYPESDATA = (value) => {
  return {
    type: RELATIONSHIP_TYPES_DATA,
    payload: { value }
  };
};

/*------------------------- ALL_NOTES---------------------------------*/
export const ALLNOTES = (value) => {
  return {
    type: ALL_NOTES,
    payload: { value }
  };
};

/*------------------------- ALERT LISTS RIGHT SIDE BAR---------------------------------*/
export const ALERT_LIST_ALL = (value) => {
  return {
    type: ALERT_LIST,
    payload: {
      value: value.alerts || []
    }
  };
};

export const VERIFICATIONQUESTIONNAIRE = (value) => {
  return {
    type: VERIFICATION_QUESTIONNAIRE,
    payload: { value }
  };
};
/*------------------------- SPOKE TO LISTS CALL WRAP UP NOTE --------------------------------*/
export const SPOKETOLIST = (value) => {
  return {
    type: SPOKETO_LIST,
    payload: {
      value: { value }
    }
  };
};

/*------------------------- SPOKE TO LISTS CALL WRAP UP NOTE --------------------------------*/
export const OLDSPOKETOLIST = (value) => {
  return {
    type: OLD_SPOKETO_LIST,
    payload: {
      value: { value }
    }
  };
};

/*------------------------------ SAVE CALL WRAP UP NOTE INPUTS -------------------------------------------*/

export const ADDCALLWRAPUPNOTEINPUTS = (name, value, operation) => {
  return {
    type: ADD_CALLWRAPUPNOTE_INPUTS,
    payload: { name, value, operation }
  };
};

// -------------------- Submit API----------------------------------------------------
export const SUBMITFORMCALLS = (value) => {
  return {
    type: SUBMIT_FORM_CALL,
    payload: {
      value: { value }
    }
  };
};

// -------------------- account left menu account info ---------------------------------------------
export const ACCOUNTGENERALINFO = (value) => {
  return {
    type: ACCOUNT_GENERAL_INFO,
    payload: {
      value
    }
  };
};

// -------------------- account left menu summary info ---------------------------------------------
export const ACCOUNTSUMMARYINFO = (value) => {
  return {
    type: ACCOUNT_SUMMARY_INFO,
    payload: {
      value
    }
  };
};

// -------------------- account left menu info ---------------------------------------------
export const ACCOUNTLEFTMENUINFO = (value) => {
  return {
    type: ACCOUNT_LEFT_MENU_INFO,
    payload: {
      value
    }
  };
};
/*------------------------------CONSUMER VERIFICATION -------------------------------------------*/

export const CURRENTACCOUNTNUMBER = (value) => {
  return {
    type: CURRENT_ACCOUNT_NUMBER,
    payload: { value }
  };
};

/*------------------------- Extended Variable for Current A/c --------------------------------*/
export const CURRENTACCOUNTSET = (value) => {
  return {
    type: CURRENT_ACCOUNT_SET,
    payload: { value }
  };
};
/*------------------------------SINGLE PAYMENT -------------------------------------------*/

export const SINGLEPAYMENTINFO = (value) => {
  return {
    type: SINGLE_PAYMENT_INFO,
    payload: { value }
  };
};

/*------------------------------EMPLOYMENT TYPES-------------------------------------------*/

export const EMPLOYEMENTTYPES = (value) => {
  return {
    type: GET_EMPLOYMENT_TYPES,
    payload: { value }
  };
};

/*------------------------------ ACCOUNT  BALANACE -------------------------------------------*/

export const ACCOUNTBALANACE = (value) => {
  return {
    type: ACCOUNT_BALANACE,
    payload: { value }
  };
};

/*------------------------------ ACCOUNT  BALANACE -------------------------------------------*/

export const ACCOUNTSUBBALANACETYPE = (value) => {
  return {
    type: ACCOUNT_SUB_BALANACE_TYPE,
    payload: { value }
  };
};

/*------------------------------ SAVE DEPENDENTS OF AN ACCOUNT -------------------------------------------*/

export const SAVEDEPENDENTSOFACCOUNT = (value) => {
  return {
    type: SAVE_DEPENDENTS_OF_ACCOUNT,
    payload: { value }
  };
};
/*------------------------------ SAVE Responsible for left pannel acc summary AN ACCOUNT -------------------------------------------*/

export const SAVERESPONSIBLES = (value) => {
  return {
    type: SAVE_RESPONSIBLES,
    payload: { value }
  };
};

/*------------------------------ RESET TO INITIAL STATE -------------------------------------------*/

export const RESETALL = () => {
  return {
    type: RESET_ALL,
    payload: {}
  };
};

/*------------------------------ CONSUMER DECEASED INFO -------------------------------------------*/

export const DECEASEDINFO = (value) => {
  return {
    type: DECEASED_INFO,
    payload: { value }
  };
};

/*----------------------- Deceased  ---------------------------------*/
export const ADDDECEASEDINPUTS = (name, value, operation) => {
  return {
    type: ADD_DECEASED_INPUTS,
    payload: { name, value, operation }
  };
};

/*----------------------- CONSUMER ALIASES  ---------------------------------*/
export const CONSUMERALIASES = (value) => {
  return {
    type: CONSUMER_ALIASES,
    payload: { value }
  };
};

/*-----------------------  ALIASE TYPES  ---------------------------------*/

export const ALIASTYPES = (value) => {
  return {
    type: ALIAS_TYPES,
    payload: { value }
  };
};

/*----------------------- Deceased  ---------------------------------*/
export const ADDCOURTINPUTS = (name, value, operation) => {
  return {
    type: ADD_COURT_INPUTS,
    payload: { name, value, operation }
  };
};

/*----------------------- Deceased  ---------------------------------*/
export const ADDEXECUTORINPUTS = (name, value, operation) => {
  return {
    type: ADD_EXECUTOR_INPUTS,
    payload: { name, value, operation }
  };
};

/*------------------------- EDIT_DECEASED---------------------------------*/
export const EDITDECEASEDINPUTS = (value) => {
  return {
    type: EDIT_DECEASED,
    payload: { value }
  };
};

/*-------------------------DELETE_DECEASED---------------------------------*/
export const DELETEDECEASED = (value) => {
  return {
    type: DELETE_DECEASED,
    payload: { value }
  };
};

export const LISTACTIVECONTIGENCYFEE = (value) => {
  return { type: LIST_ACTIVE_CONTIGENCYFEE, payload: { value } };
};

export const GETFINANCIALDETAILS = (value) => {
  return { type: GET_ACCOUNT_FINANCIAL_DETAILS, payload: { value } };
};

export const UPDATEFINACIALDETIALS = (value) => {
  return { type: UPDATE_ACCOUNT_FINANCIAL_DETAILS, payload: { value } };
};

/*---------------------------- KPI Call Details INFO -------------------------------------------*/

export const KPICALLWRAP = (value) => {
  return {
    type: KPI_DETAILS,
    payload: { value }
  };
};
/*---------------------------- GET QUEUE -------------------------------------------*/
export const GETQUEUE = (value) => {  
  return {
    type: QUEUE_DETAILS,
    payload: { value }
  };
};