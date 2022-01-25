import { combineReducers } from "redux";
import { reducer as formReducers } from "redux-form";
import AuthReducer from "./AuthReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
    auth:AuthReducer,
    form: formReducers,
    stream: streamReducer

})