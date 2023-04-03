import {
  TRIGGER_POPUP,
  ADD_LITIGIOUS_INPUTS,
  LITIGIOUS_INFORMATION,
  /////////////////////////////// INCARCERATION ////////////////////////////////
  INCARCERATION_INFORMATION,
  /////////////////////////////// DECEASED ////////////////////////////////
  DECEASED_INFO,
  //////////////////// DIPSUTE ///////////////////////////
  DEPENDENTS_OF_RESPONSIBLE,
  DISPUTE_INFO,
  //////////////////// BANKRUPTCY ///////////////////////////
  ADD_BANKRUPTCY_INPUTS,
  ADD_COURT_INPUTS,
  ADD_TRUSTEE_INPUTS,
  COMPLAINT_INFO,
  BANKRUPTCY_INFO
} from '../../Actions/ConsumerDetails/ConsumerQuickActions/Types.js';
import { RESET_ALL } from '../../Actions/ConsumerDetails/Types.js';

const initialState = {
  quickActionMenuItems: {},
  /////////////////////////////// LITIGIOUS ////////////////////////////////
  addLitigiousInputs: {},
  litigiousInfo: [],
  /////////////////////////////// INCARCERATION ////////////////////////////////
  incarceratedInformation: [],
  editIncarceratedInputs: {},
  //////////////////// DECEASED ///////////////////////////
  deceasedInformation: [],
  //////////////////// DISPUTE ///////////////////////////
  dependentsOfResponsible: {},
  disputeInformation: [],
  //////////////////// BANKRUPTCY ///////////////////////////
  addBankruptcyInputs: {},
  addCourtInputs: {},
  addTrusteeInputs: {},
  complaintInformation: [],
  bankruptcyInformation: [],
};

const ConsumerQuickActionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TRIGGER_POPUP:
      return Object.assign({}, state, {
        quickActionMenuItems: action.payload.value
      });
    /////////////////////////////// LITIGIOUS ////////////////////////////////
    case ADD_LITIGIOUS_INPUTS:
      if (action.payload.operation !== 'reset') {
        const litigiousName = action.payload.name;
        const litigiousValue = action.payload.value;
        return {
          ...state,
          addLitigiousInputs: {
            ...state.addLitigiousInputs,
            [litigiousName]: litigiousValue
          }
        };
      } else {
        return Object.assign({}, state, {
          addLitigiousInputs: {}
        });
      }
    case LITIGIOUS_INFORMATION:
      return Object.assign({}, state, {
        litigiousInfo: [action.payload.value]
      });

    /////////////////////////////// INCARCERATION ////////////////////////////////
    case INCARCERATION_INFORMATION:
      return Object.assign({}, state, {
        incarceratedInformation: [action.payload.value]
      });

    /////////////////////////////// DECEASED ////////////////////////////////

    case DECEASED_INFO:
      return Object.assign({}, state, {
        deceasedInformation: [action.payload.value]
      });

    //////////////////// DISPUTE ///////////////////////////

    case DEPENDENTS_OF_RESPONSIBLE:
      return Object.assign({}, state, {
        dependentsOfResponsible: action.payload.value
      });

    case DISPUTE_INFO:
      return Object.assign({}, state, {
        disputeInformation: [action.payload.value]
      });

    //////////////////// BANKRUPTCY ///////////////////////////
    case ADD_BANKRUPTCY_INPUTS:
      if (action.payload.operation !== 'reset') {
        const BankruptcyName = action.payload.name;
        const BankruptcyValue = action.payload.value;
        return {
          ...state,
          addBankruptcyInputs: {
            ...state.addBankruptcyInputs,
            [BankruptcyName]: BankruptcyValue
          }
        };
      } else {
        return Object.assign({}, state, {
          addBankruptcyInputs: {}
        });
      }
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
    case ADD_TRUSTEE_INPUTS:
      if (action.payload.operation !== 'reset') {
        const trusteeName = action.payload.name;
        const trusteeValue = action.payload.value;
        return {
          ...state,
          addTrusteeInputs: {
            ...state.addTrusteeInputs,
            [trusteeName]: trusteeValue
          }
        };
      } else {
        return Object.assign({}, state, {
          addTrusteeInputs: {}
        });
      }
    case BANKRUPTCY_INFO:
      return Object.assign({}, state, {
        bankruptcyInformation: action.payload.value ? [action.payload.value] : []
      })

    /////////////////////////////// COMPLAINTS ////////////////////////////////


    case COMPLAINT_INFO:
      return Object.assign({}, state, {
        complaintInformation: action.payload.value
      })

    /////////////////////////////// RESET ////////////////////////////////

    case RESET_ALL:
      return initialState;
    default:
      return state;
  }
};

export default ConsumerQuickActionsReducer;
