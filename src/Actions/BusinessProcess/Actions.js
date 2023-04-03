import {
  QUICK_ACTION_SURVEY_FLOWS,
  API_CALL_STATUS,
  CANCEL_BP_INSTANCE,
  FORM_GROUP_DATA,
  FORM_GROUP_ANSWERS,
  CURRENT_STEP_DATA,
  HISTORY_BP_DATA,
  SELECTED_FORM_ID,
  CANCEL_BP_DATA,
  SETTING_CANCEL_BP_DATA,
  CURRENT_RESPONSIBLE_ID,
  CURRENT_PORTFOLIO_ID,
  EXECUTE_BUSINESSPROCESS
} from './Types.js';

/*------------------------------GET HIstory survey flows -------------------------------------------*/

export const QUICKACTIONSURVEYFLOWS = (value) => {
  return {
    type: QUICK_ACTION_SURVEY_FLOWS,
    payload: { value }
  };
};

export const APICALLSTATUS = (value) => {
  return { type: API_CALL_STATUS, payload: { value } };
};

export const CANCELBPINSTANCE = (value) => {
  return { type: CANCEL_BP_INSTANCE, payload: { value } };
};

export const FORMGROUPDATA = (value) => {
  return { type: FORM_GROUP_DATA, payload: { value } };
};
export const FORMGROUPANSWERS = (value) => {
  return { type: FORM_GROUP_ANSWERS, payload: { value } };
};

export const CURRENTSTEPDATA = (value) => {
  return { type: CURRENT_STEP_DATA, payload: { value } };
};

export const HISTORYBPDATA = (value) => {
  return { type: HISTORY_BP_DATA, payload: { value } };
};

export const SELECTEDFORMID = (value) => {
  return { type: SELECTED_FORM_ID, payload: { value } };
};
export const CANCELBPDATA = (value) => {
  return { type: CANCEL_BP_DATA, payload: { value } };
};

export const SETTINGCANCELBPDATA = (value) => {
  return { type: SETTING_CANCEL_BP_DATA, payload: { value } };
};

export const CURRENTPORTFOLIOID = (value) => {
  return { type: CURRENT_PORTFOLIO_ID, payload: { value } };
};

export const CURRENTRESPONSIBLEID = (value) => {
  return { type: CURRENT_RESPONSIBLE_ID, payload: { value } };
};

export const EXECUTEBUSINESSPROCESS = (value) => {
  return { type: EXECUTE_BUSINESSPROCESS, payload: { value } };
};
