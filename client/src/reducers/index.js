import { combineReducers } from "redux";
import authReducer from "./authReducer";
import treeReducer from "./setReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  tree: treeReducer,
  post: postReducer,
  errors: errorReducer
});
