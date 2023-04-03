import { SAVE_COUNTRIES, SAVE_STATES, SAVE_STATES_ON_LOAD, ALERT_TYPES, ADD_ALERT_INPUTS,
  VIEW_CALL_WRAPUP_DATA,VIEW_CALL_METHODS, ADD_CALL_WRAPUP_INPUTS ,GET_STATES, PREFERED_LANGUAGES, 
  CONSUMER_DEMOGRAPHIC_SOURCE,DISPUTE_REASONS,COMPLAINTS_TYPES,BANKRUPTCY_TYPE, 
  CUSTOMFIELD_LOCATIONS, CUSTOMFIELD_DATATYPE} from "../../Actions/StaticData/Types.js";

const initialState = {
  countriesData: [],
  statesData: [],
  statesDataOnLoad: [],
  alertData: [],
  addAlertInputs: {},
  callWrapUpData : [],
  callMethodsData : [],
  addCallWrapUpInputs: {
    description: "",
    radio: true
  },
  getstates : [],
  preferedLanguages: [],
  disputeReasons:[],
  bankruptcyTypes:[],
  complaintTypes:[],
  customFieldLocations:[],
  customFieldDataTypes:[]
};

const StaticDataReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_COUNTRIES:
      return Object.assign({}, state, {
        countriesData: action.payload.value,
      });
    case SAVE_STATES:
      return Object.assign({}, state, {
        statesData: action.payload.value,
      });
    case SAVE_STATES_ON_LOAD:
      return {
        ...state,
        statesDataOnLoad: [
          ...state.statesDataOnLoad, action.payload.value
        ]
      }
    case ALERT_TYPES:
      return Object.assign({}, state, {
        alertData: action.payload.value,
      });

    case VIEW_CALL_WRAPUP_DATA :
      return Object.assign({}, state, {
        callWrapUpData: action.payload.value,
      });

    case VIEW_CALL_METHODS :
      return Object.assign({}, state, {
        callMethodsData: action.payload.value,
      });

    case ADD_ALERT_INPUTS:
      if (action.payload.operation !== "reset") {
        const alertname = action.payload.name;
        const alertValue = action.payload.value;
        return {
          ...state,
          addAlertInputs: {
            ...state.addAlertInputs,
            [alertname]: alertValue,
          },
        };
      } else {
        return Object.assign({}, state, {
          addAlertInputs: {},
        });
      }
    case ADD_CALL_WRAPUP_INPUTS:
      if (action.payload.operation !== "reset") {
        const alertname = action.payload.name;
        const alertValue = action.payload.value;
        return {
          ...state,
          addCallWrapUpInputs: {
            ...state.addCallWrapUpInputs,
            [alertname]: alertValue,
          },
        };
      } else {
        return Object.assign({}, state, {
          addCallWrapUpInputs: {
            description: "",
            radio: true
          },
        });
      }
      case GET_STATES:
      return Object.assign({}, state, {
        getstates: action.payload.value,
      });

      case PREFERED_LANGUAGES:
        return Object.assign({}, state, {
          preferedLanguages: action.payload.value,
        });
      
      case CONSUMER_DEMOGRAPHIC_SOURCE:
        return Object.assign({}, state, {
          consumerDemographicSource: action.payload.value,
        });
      case DISPUTE_REASONS:
          return Object.assign({}, state, {
            disputeReasons: action.payload.value,
      });
      case BANKRUPTCY_TYPE:
        return Object.assign({}, state, {
          bankruptcyTypes: action.payload.value,
    });

      case COMPLAINTS_TYPES:
          return Object.assign({}, state, {
            complaintTypes: action.payload.value,
      });
      case CUSTOMFIELD_LOCATIONS:
          return Object.assign({}, state, {
            customFieldLocations: action.payload.value,
      });
      case CUSTOMFIELD_DATATYPE:
          return Object.assign({}, state, {
            customFieldDataTypes: action.payload.value,
      });

    default:
      return state;
  }
};

export default StaticDataReducer;
