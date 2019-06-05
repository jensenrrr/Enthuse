import { combineReducers } from "redux";
import authReducer from "./authReducer";
import treeReducer from "./treeReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  tree: treeReducer,
  errors: errorReducer
});
