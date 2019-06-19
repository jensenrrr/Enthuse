import {
  POST_CREATE,
  POST_GET,
  POST_COMMENT,
  POST_UPVOTE
} from "../actions/types";
import update from "react-addons-update";

const initialState = {
  posts: [],
  ready: false
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
        posts: action.payload,
        ready: true
      };
    case POST_COMMENT:
      return {
        ...state
      };
    case POST_UPVOTE:
      return update(state, {
        posts: {
          [action.payload.index]: {
            liked: { $set: action.payload.liked },
            likes: { $set: action.payload.likes }
          }
        }
      });
    default:
      return state;
  }
}
