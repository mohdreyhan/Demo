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
  CURRENT_PORTFOLIO_ID,
  CURRENT_RESPONSIBLE_ID,
  EXECUTE_BUSINESSPROCESS
} from '../../Actions/BusinessProcess/Types.js';

const initialState = {
  quickActionSurveyFlows: [],
  apiCallStatus: false,
  cancelBPInstance: [],
  businessformData: [],
  formAnswerData: [],
  currentStepData: [],
  historyBPData: [],
  selectedFormId: '',
  cancelBPData: false,
  currentPortfolioId: '',
  currentResponsibleId: '',
  activeContigencyFee: [],
  externalBusinessData: {}
};

const BusinessProcessReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case QUICK_ACTION_SURVEY_FLOWS:
      return Object.assign({}, state, { quickActionSurveyFlows: action.payload.value });
    case API_CALL_STATUS:
      return Object.assign({}, state, { apiCallStatus: action.payload.value });
    case CANCEL_BP_INSTANCE:
      return Object.assign({}, state, { cancelBPInstance: action.payload.value });
    case FORM_GROUP_DATA:
      return Object.assign({}, state, { businessformData: action.payload.value });
    case FORM_GROUP_ANSWERS:
      return Object.assign({}, state, { formAnswerData: action.payload.value });
    case CURRENT_STEP_DATA:
      return Object.assign({}, state, { currentStepData: action.payload.value });
    case HISTORY_BP_DATA:
      return Object.assign({}, state, { historyBPData: action.payload.value });
    case SELECTED_FORM_ID:
      return Object.assign({}, state, { selectedFormId: action.payload.value });
    case CANCEL_BP_DATA:
      return Object.assign({}, state, { cancelBPData: action.payload.value });
    case SETTING_CANCEL_BP_DATA:
      return Object.assign({}, state, { cancelBPData: action.payload.value });
    case CURRENT_PORTFOLIO_ID:
      return Object.assign({}, state, { currentPortfolioId: action.payload.value });
    case CURRENT_RESPONSIBLE_ID:
      return Object.assign({}, state, { currentResponsibleId: action.payload.value });
    case EXECUTE_BUSINESSPROCESS:
      return Object.assign({}, state, { externalBusinessData: action.payload.value });
    default:
      return state;
  }
};

export default BusinessProcessReducer;
