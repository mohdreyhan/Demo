import { combineReducers } from "redux";
import ConsumerDetailsReducer from "./ConsumerDetailsReducer";
import ContactInfoReducer from "./ContactInformation/ContactInfoReducer.js";
import StaticDataReducer from "./StaticData/StaticDataReducer.js";
import BusinessProcessReducer from "./BusinessProcess/BusinessProcessReducer.js"
import LegalReducer from "./Legal/LegalReducer.js";
import ConsumerQuickActionsReducer from "./ConsumerQuickActions/ConsumerQuickActionsReducer.js";

export default combineReducers({
  ConsumerDetailsReducer: ConsumerDetailsReducer,
  ContactInfoReducer: ContactInfoReducer,
  StaticDataReducer: StaticDataReducer,
  BusinessProcessReducer: BusinessProcessReducer,
  LegalReducer: LegalReducer,
  ConsumerQuickActionsReducer: ConsumerQuickActionsReducer
});
