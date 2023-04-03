import {
  ASSIGNED_ATTORNEYS, ATTORNEY_SEARCH_LIST,
  ATTORNEY_ASSIGNED_FLAG, ADD_ATTORNEY_INPUTS,EDIT_ATTORNEY_INPUTS,CANCEL_ATTORNEY_PAGE,
} from '../../Actions/ConsumerDetails/Legal/Types.js';
import { RESET_ALL } from "../../Actions/ConsumerDetails/Types.js";

const initialState = {
  assignedAttorneys: [],
  assignedAttorneyFlag: [],
  addAttorneyInputs: {},
  attorneyList: [],
  editAttorneyInputs: {},
  attorneyCancelpage: {data: false}

};

const LegalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ATTORNEY_ASSIGNED_FLAG:
      return Object.assign({}, state, {
        assignedAttorneyFlag: action.payload.value
      });
    case ASSIGNED_ATTORNEYS:
      return Object.assign({}, state, {
        assignedAttorneys: action.payload.value
      });
    case ATTORNEY_SEARCH_LIST:
      return Object.assign({}, state, {
        attorneyList: action.payload.value
      });
    case ADD_ATTORNEY_INPUTS:
      if (action.payload.operation !== "reset") {
        const attorneyName = action.payload.name;
        const attorneyValue = action.payload.value;
        return {
          ...state,
          addAttorneyInputs: {
            ...state.addAttorneyInputs,
            [attorneyName]: attorneyValue,
          },
        };
      } else {
        return Object.assign({}, state, {
          addAttorneyInputs: {},
        });
      }
      case EDIT_ATTORNEY_INPUTS:
      if (action.payload.operation !== "reset") {
        const attorneyName = action.payload.name;
        const attorneyValue = action.payload.value;
        return {
          ...state,
          editAttorneyInputs: {
            ...state.editAttorneyInputs,
            [attorneyName]: attorneyValue,
          },
        };
      } else {
        return Object.assign({}, state, {
          editAttorneyInputs: {},
        });
      }
      case CANCEL_ATTORNEY_PAGE:
      return Object.assign({}, state, {
        attorneyCancelpage: action.payload.value
      });
      
    case RESET_ALL:
      return initialState;
    default:
      return state;
  }
};

export default LegalReducer;
