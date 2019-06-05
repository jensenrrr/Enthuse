import { GET_ERRORS, TRIVIAL_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case TRIVIAL_ERRORS:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}
