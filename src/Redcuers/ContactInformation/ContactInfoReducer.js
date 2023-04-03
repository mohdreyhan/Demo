import {
  ADD_PHONE_INPUTS,
  PHONE_TYPES,
  VIEW_PHONE_DATA,
  PHONE_DATA_FOR_CALLWRAPUP,
  /////////////////// EMAIL ADDRESS //////////////////////
  ADD_EMAIL_INPUTS,
  EMAIL_TYPES,
  VIEW_EMAIL_DATA,
  /////////////////// CONSUMER ADDRESS //////////////////////
  ADDRESS_TYPES,
  VIEW_ADDRESS_DATA,
  ADD_ADDRESS_INPUTS,
} from "../../Actions/ConsumerDetails/ContactInformation/Types.js";

const initialState = {
  /////////////////// PHONE   //////////////////////
  phoneData: [],
  addPhoneInputs: {},
  phoneTypes: [],
  phoneDataForCallWrapUp: [],
  /////////////////// EMAIL ADDRESS //////////////////////
  emailData: [],
  addEmailInputs: {},
  emailTypes: [],
  /////////////////// CONSUMER ADDRESS //////////////////////
  addressData: [],
  addAddressInputs: {},
  addressTypes: [],
};

const ContactInfoReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    /////////////////// Phone Add //////////////////////
    case VIEW_PHONE_DATA:
      return Object.assign({}, state, {
        phoneData: action.payload.value,
      });

    case PHONE_DATA_FOR_CALLWRAPUP:
      return Object.assign({}, state, {
        phoneDataForCallWrapUp: action.payload.value,
      });

    case ADD_PHONE_INPUTS:
      if (action.payload.operation !== "reset") {
        const phonename = action.payload.name;
        const phoneValue = action.payload.value;
        return {
          ...state,
          addPhoneInputs: {
            ...state.addPhoneInputs,
            [phonename]: phoneValue,
          },
        };
      } else {
        return Object.assign({}, state, {
          addPhoneInputs: {},
        });
      }

    case PHONE_TYPES:
      return Object.assign({}, state, {
        phoneTypes: action.payload.value,
      });
    /////////////////// EMAIL ADDRESS //////////////////////
    case EMAIL_TYPES:
      return Object.assign({}, state, {
        emailTypes: action.payload.value,
      });
    case VIEW_EMAIL_DATA:
      return Object.assign({}, state, {
        emailData: action.payload.value,
      });
    case ADD_EMAIL_INPUTS:
      if (action.payload.operation !== "reset") {
        const emailname = action.payload.name;
        const emailValue = action.payload.value;
        return {
          ...state,
          addEmailInputs: {
            ...state.addEmailInputs,
            [emailname]: emailValue,
          },
        };
      } else {
        return Object.assign({}, state, {
          addEmailInputs: {},
        });
      }
    /////////////////// CONSUMER ADDRESS //////////////////////
    case ADDRESS_TYPES:
      return Object.assign({}, state, {
        addressTypes: action.payload.value,
      });
    case VIEW_ADDRESS_DATA:
      return Object.assign({}, state, {
        addressData: action.payload.value,
      });
    case ADD_ADDRESS_INPUTS:
      if (action.payload.operation !== "reset") {
        const addressName = action.payload.name;
        const addressValue = action.payload.value;
        return {
          ...state,
          addAddressInputs: {
            ...state.addAddressInputs,
            [addressName]: addressValue,
          },
        };
      } else {
        return Object.assign({}, state, {
          addAddressInputs: {},
        });
      }
    default:
      return state;
  }
};

export default ContactInfoReducer;
