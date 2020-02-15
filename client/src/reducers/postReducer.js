import {
  POST_CREATE,
  POST_GET,
  POST_COMMENT,
  POST_UPVOTE,
  LIKE_COMMENT,
  POST_COMMENT_ON_COMMENT,
  LOAD_COMMENT,
  SINGLEPOST_GET
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
    case SINGLEPOST_GET:
      return {
        ...state,
        singlepost: action.payload
        };
    case POST_COMMENT:
      const updatedPosts = state.posts;
      updatedPosts[action.payload.index].comments.push(action.payload.comment);
      return {
        ...state,
        posts: updatedPosts
      };
    case POST_COMMENT_ON_COMMENT:
      const up = state.posts;
      var meme = up[action.payload.indices[0]];
      action.payload.indices.forEach((element, i) => {
        if (i >= 1) meme = meme.comments[element];
      });

      meme.comments.push(action.payload.comment);
      return {
        ...state,
        posts: up
      };
    case LIKE_COMMENT:
      const upCommentLikes = state.posts;
      var dream = upCommentLikes[action.payload.indices[0]];
      action.payload.indices.forEach((element, i) => {
        if (i >= 1) dream = dream.comments[element];
      });
      dream.liked = action.payload.liked;
      dream.likes = action.payload.likes;
      return {
        ...state,
        posts: upCommentLikes
      };
    case LOAD_COMMENT:
      return state;
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
