import { POST_CREATE, POST_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_CREATE:
      return {
        ...state
      };
    case POST_ERRORS:
      return {
        ...state
      };
    default:
      return state;
  }
}
