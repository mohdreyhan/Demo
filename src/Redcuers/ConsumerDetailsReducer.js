import {
  ALL_CONSUMER_ACCOUNTS,
  CONSUMER_PERSONAL_INFO,
  ACCOUNT_SUMMARY_CONSUMER_DATA,
  EDIT_CONSUMER_INPUTS,
  CONSUMER_DEMOGRAPHICS,
  CONSUMER_EMPLOYERS,
  ADD_EMPLOYER_INPUTS,
  SEARCH_CONSUMER_DATA,
  RELATIONSHIP_TYPES_DATA,
  ALL_NOTES,
  ALERT_LIST,
  SAVE_PORTFOLIO_ID,
  CONSUMER_VERIFICATION,
  CONSUMER_SKIP_VERIFICATION,
  VERIFICATION_QUESTIONNAIRE,
  ADD_CALLWRAPUPNOTE_INPUTS,
  RESET_AFTER_SPOKE_TO_CHANGE,
  SPOKETO_LIST,
  OLD_SPOKETO_LIST,
  SUBMIT_FORM_CALL,
  ALL_CONSUMER_ACCOUNTS_FOR_CALLWRAPUP,
  ACCOUNT_GENERAL_INFO,
  ACCOUNT_SUMMARY_INFO,
  ACCOUNT_LEFT_MENU_INFO,
  CURRENT_ACCOUNT_NUMBER,
  CURRENT_ACCOUNT_SET,
  SINGLE_PAYMENT_INFO,
  ACCOUNT_BALANACE,
  ACCOUNT_SUB_BALANACE_TYPE,
  GET_EMPLOYMENT_TYPES,
  SAVE_DEPENDENTS_OF_ACCOUNT,
  SAVE_RESPONSIBLES,
  RESET_ALL,
  DECEASED_INFO,
  CONSUMER_ALIASES,
  ALIAS_TYPES,
  ADD_DECEASED_INPUTS,
  ADD_COURT_INPUTS,
  ADD_EXECUTOR_INPUTS,
  LIST_ACTIVE_CONTIGENCYFEE,
  GET_ACCOUNT_FINANCIAL_DETAILS,
  UPDATE_ACCOUNT_FINANCIAL_DETAILS,
  KPI_DETAILS,
  QUEUE_DETAILS
} from '../Actions/ConsumerDetails/Types';

const initialState = {
  consumerAssocAccounts: [],
  consumerPersonalInfo: [],
  accountSummaryConsumerData: [],
  currentRecordsForCallWrap: [],
  responsibleId: localStorage.getItem('responsibleId'),
  portfolioId: '',
  consumerDemographics: [],
  editconsumerInputs: [],
  consumerEmployers: [],
  addEmployerInputs: {},
  searchConsumer: [],
  relationshipTypesData: [],
  accountNotes: [],
  alertoptions: [],
  alertlists: [],
  consumerverifieddetails: [],
  //consumerVerification:true,
  consumerVerification: false,
  consumerSkipVerification: false,
  // consumerSkipVerification: true,
  //CustomerIdentification_Revert_Temp
  addCallwrapupInputs: {},
  spokeToList: [],
  accountGeneralInfo: {},
  accountSummaryInfo: [],
  accountLeftMenuInfo: [],
  currentAccountNumber: localStorage.getItem('currentAccountNumber'),
  accountbalance: [],
  subbalanceType: [],
  currentaccountset: [],
  employmentTypes: [],
  dependentsList: [],
  responsiblesList: [],
  deceasedInfo: [],
  aliasData: [],
  aliasTypes: [],
  addDeceasedInputs: {},
  addCourtInputs: {},
  addExecutorInputs: {},
  financialDetails: [],
  updateFinancialDetails: '',
  kpiCallWrapdata: [],
  queueListdata: [],
};

const ConsumerDetailsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CONSUMER_VERIFICATION:
      return Object.assign({}, state, {
        consumerVerification: action.payload.value
      });

    case CONSUMER_SKIP_VERIFICATION:
      return Object.assign({}, state, {
        consumerSkipVerification: action.payload.value
      });

    case ALL_CONSUMER_ACCOUNTS:
      return Object.assign({}, state, {
        consumerAssocAccounts: action.payload.value
      });

    case CURRENT_ACCOUNT_NUMBER:
      return Object.assign({}, state, {
        currentAccountNumber: action.payload.value
      });
    case CURRENT_ACCOUNT_SET:
      return Object.assign({}, state, {
        currentaccountset: action.payload.value
      });

    case CONSUMER_PERSONAL_INFO:
      const consumerPersonalInfoArr = [];
      consumerPersonalInfoArr.push(action.payload.value);
      return Object.assign({}, state, {
        consumerPersonalInfo: consumerPersonalInfoArr
      });

    case SAVE_PORTFOLIO_ID:
      return Object.assign({}, state, {
        portfolioId: action.payload.value
      });

    case ACCOUNT_SUMMARY_CONSUMER_DATA:
      const accountSummaryConsumerDataArr = [];
      accountSummaryConsumerDataArr.push(action.payload.value);
      return Object.assign({}, state, {
        accountSummaryConsumerData: accountSummaryConsumerDataArr
      });

    case CONSUMER_DEMOGRAPHICS:
      const consumerDemographicsArr = [];
      consumerDemographicsArr.push(action.payload.value);
      return Object.assign({}, state, {
        consumerDemographics: consumerDemographicsArr
      });

    case EDIT_CONSUMER_INPUTS:
      return Object.assign({}, state, {
        editconsumerInputs: action.payload.value
      });

    case ADD_EMPLOYER_INPUTS:
      if (action.payload.operation !== 'reset') {
        const employerName = action.payload.name;
        const employerValue = action.payload.value;
        return {
          ...state,
          addEmployerInputs: {
            ...state.addEmployerInputs,
            [employerName]: employerValue
          }
        };
      } else {
        return Object.assign({}, state, {
          addEmployerInputs: {}
        });
      }

    case CONSUMER_EMPLOYERS:
      return Object.assign({}, state, {
        consumerEmployers: action.payload.value
      });

    case SEARCH_CONSUMER_DATA:
      return Object.assign({}, state, {
        searchConsumer: action.payload.value
      });

    case ALL_CONSUMER_ACCOUNTS_FOR_CALLWRAPUP:
      return Object.assign({}, state, {
        currentRecordsForCallWrap: action.payload.value
      });

    case RELATIONSHIP_TYPES_DATA:
      return Object.assign({}, state, {
        relationshipTypesData: action.payload.value
      });

    case ALL_NOTES:
      return Object.assign({}, state, {
        accountNotes: action.payload.value
      });

    case ALERT_LIST:
      return Object.assign({}, state, {
        alertlists: action.payload.value
      });
    case VERIFICATION_QUESTIONNAIRE:
      return Object.assign({}, state, {
        consumerverifieddetails: action.payload.value
      });

    case RESET_AFTER_SPOKE_TO_CHANGE:
      return Object.assign({}, state, {
        ...state,
        addCallwrapupInputs: {
          ...state.addCallwrapupInputs,
          phoneNumber: '',
          accounts: []
        }
      });

    case ADD_CALLWRAPUPNOTE_INPUTS:
      if (action.payload.operation !== 'reset') {
        const callWrapUpName = action.payload.name;
        const callWrapUpValue = action.payload.value;
        return {
          ...state,
          addCallwrapupInputs: {
            ...state.addCallwrapupInputs,
            [callWrapUpName]: callWrapUpValue
          }
        };
      } else {
        return Object.assign({}, state, {
          addCallwrapupInputs: {}
        });
      }
    case SPOKETO_LIST:
      return Object.assign({}, state, {
        spokeToList: action.payload.value
      });
    case OLD_SPOKETO_LIST:
      return Object.assign({}, state, {
        oldSpokeToList: action.payload.value
      });
    case SUBMIT_FORM_CALL:
      return Object.assign({}, state, {
        submitFormCall: action.payload.value
      });
    case ACCOUNT_GENERAL_INFO:
      return Object.assign({}, state, {
        accountGeneralInfo: action.payload.value
      });
    case ACCOUNT_SUMMARY_INFO:
      return Object.assign({}, state, {
        accountSummaryInfo: action.payload.value
      });
    case ACCOUNT_LEFT_MENU_INFO:
      return Object.assign({}, state, {
        accountLeftMenuInfo: action.payload.value
      });
    case SINGLE_PAYMENT_INFO:
      return Object.assign({}, state, {
        singlePaymentInfo: action.payload.value
      });
    case ACCOUNT_BALANACE:
      return Object.assign({}, state, {
        accountBalance: action.payload.value
      });
    case ACCOUNT_SUB_BALANACE_TYPE:
      return Object.assign({}, state, {
        subbalanceType: action.payload.value
      });
    case GET_EMPLOYMENT_TYPES:
      return Object.assign({}, state, {
        employmentTypes: action.payload.value
      });
    case SAVE_DEPENDENTS_OF_ACCOUNT:
      return Object.assign({}, state, {
        dependentsList: action.payload.value
      });
    case SAVE_RESPONSIBLES:
      return Object.assign({}, state, {
        responsiblesList: action.payload.value
      });
    case DECEASED_INFO:
      return Object.assign({}, state, {
        deceasedInfo: [action.payload.value]
      });
    case ADD_DECEASED_INPUTS:
      if (action.payload.operation !== 'reset') {
        const deceasedName = action.payload.name;
        const deceasedValue = action.payload.value;
        return {
          ...state,
          addDeceasedInputs: {
            ...state.addDeceasedInputs,
            [deceasedName]: deceasedValue
          }
        };
      } else {
        return Object.assign({}, state, {
          addDeceasedInputs: {}
        });
      }
    case CONSUMER_ALIASES:
      return Object.assign({}, state, {
        aliasData: action.payload.value
      });
    case ALIAS_TYPES:
      return Object.assign({}, state, {
        aliasTypes: action.payload.value
      });
    case ADD_COURT_INPUTS:
      if (action.payload.operation !== 'reset') {
        const courtName = action.payload.name;
        const courtValue = action.payload.value;
        return {
          ...state,
          addCourtInputs: {
            ...state.addCourtInputs,
            [courtName]: courtValue
          }
        };
      } else {
        return Object.assign({}, state, {
          addCourtInputs: {}
        });
      }
    case ADD_EXECUTOR_INPUTS:
      if (action.payload.operation !== 'reset') {
        const executorName = action.payload.name;
        const executorValue = action.payload.value;
        return {
          ...state,
          addExecutorInputs: {
            ...state.addExecutorInputs,
            [executorName]: executorValue
          }
        };
      } else {
        return Object.assign({}, state, {
          addExecutorInputs: {}
        });
      }
    case LIST_ACTIVE_CONTIGENCYFEE:
      return Object.assign({}, state, { activeContigencyFee: action.payload.value });
    case GET_ACCOUNT_FINANCIAL_DETAILS:
      return Object.assign({}, state, { financialDetails: action.payload.value });
    case UPDATE_ACCOUNT_FINANCIAL_DETAILS:
      return Object.assign({}, state, { updateFinancialDetails: action.payload.value });
    case KPI_DETAILS:
        return Object.assign({}, state, {
          kpiCallWrapdata: [action.payload.value]
        });
    case QUEUE_DETAILS:
          return Object.assign({}, state, {
            queueListdata: [action.payload.value]
          });
    case RESET_ALL:
      return initialState;
    default:
      return state;
  }
};

export default ConsumerDetailsReducer;
