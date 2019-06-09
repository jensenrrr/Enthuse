import {
  POST_CREATE,
  POST_GET,
  POST_COMMENT,
  POST_UPVOTE
} from "../actions/types";

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_CREATE:
      return {
        ...state
      };
    case POST_GET:
      return {
        ...state,
        posts: action.payload
      };
    case POST_COMMENT:
      return {
        ...state
      };
    case POST_UPVOTE:
      return {
        ...state
      };
    default:
      return state;
  }
}
