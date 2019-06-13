import { combineReducers } from "redux";
import authReducer from "./authReducer";
import setReducer from "./setReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  set: setReducer,
  post: postReducer,
  errors: errorReducer
});
