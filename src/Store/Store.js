import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootreducer from "../Redcuers/index";

const Store = createStore(rootreducer, applyMiddleware(thunk));

export default Store;
