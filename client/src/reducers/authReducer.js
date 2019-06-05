import { SET_CURRENT_USER, USER_LOADING, DATA_TREE } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  tree: []
};

export default function(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
      case DATA_TREE:
        return {
          ...state,
          tree: action.payload
        };
    default:
      return state;
  }
}
