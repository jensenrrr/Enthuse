import {
  POST_CREATE,
  POST_GET,
  POST_COMMENT,
  POST_UPVOTE,
  LIKE_COMMENT,
  POST_COMMENT_ON_COMMENT,
  LOAD_COMMENT,
  SINGLEPOST_GET,
  SINGLEPOST_COMMENT_ON_COMMENT,
  SINGLEPOST_LOAD_COMMENT,
  LOAD_IMAGE,
  LOAD_SINGLE_IMAGE,
} from "../actions/types";
import update from "react-addons-update";

const initialState = {
  posts: [],
  singlepost: "",
  ready: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_SINGLE_IMAGE:
      const sgpi = state.singlepost;
      sgpi.img = action.payload.img;
      return {
        ...state,
        singlepost: sgpi,
      };
    case LOAD_IMAGE:
      const upPosts = state.posts;
      if (upPosts[action.payload.index]) {
        upPosts[action.payload.index].img = action.payload.img;
      }
      return {
        ...state,
        posts: upPosts,
      };
    case POST_CREATE:
      return {
        ...state,
      };
    case POST_GET:
      return {
        ...state,
        posts: action.payload,
        ready: true,
      };
    case SINGLEPOST_GET:
      return {
        ...state,
        singlepost: action.payload,
      };
    case POST_COMMENT:
      const updatedPosts = state.posts;
      updatedPosts[action.payload.index].comments.push(action.payload.comment);
      return {
        ...state,
        posts: updatedPosts,
      };
    case POST_COMMENT_ON_COMMENT:
      const up = state.posts;
      var meme = up[action.payload.indices[0]];
      console.log(action.payload + "pushing this");
      action.payload.indices.forEach((element, i) => {
        if (i >= 1) meme = meme.comments[element];
      });
      meme.comments.push(action.payload.comment);
      return {
        ...state,
        posts: up,
      };
    case SINGLEPOST_COMMENT_ON_COMMENT:
      var upS = state.singlepost;
      if (upS) {
        action.payload.indices.forEach((element, i) => {
          if (i >= 1) upS = upS.comments[element];
        });

        upS.comments.push(action.payload.comment);
        return {
          ...state,
          posts: upS,
        };
      } else {
        return state;
      }
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
        posts: upCommentLikes,
      };
    case LOAD_COMMENT:
      const loadMoreComments = state.posts;
      var dream = loadMoreComments[action.payload.indices[0]];
      action.payload.indices.forEach((element, i) => {
        if (i >= 1) dream = dream.comments[element];
      });
      //console.log("existing comment " + dream);
      //console.log("new comment  " + action.payload.comments);
      action.payload.comments.forEach((element, i) => {
        console.log(element);
        if (element) dream.comments.push(element);
      });
      return {
        ...state,
        posts: loadMoreComments,
      };
    case SINGLEPOST_LOAD_COMMENT:
      const upsPost = state.singlepost;
      var dream = upsPost;
      if (upsPost) {
        action.payload.indices.forEach((element, i) => {
          if (i >= 1) dream = dream.comments[element];
        });
        action.payload.comments.forEach((element, i) => {
          console.log(element);
          if (element) dream.comments.push(element);
        });
      }
      return {
        ...state,
        singlepost: upsPost,
      };
    case POST_UPVOTE:
      return update(state, {
        posts: {
          [action.payload.index]: {
            liked: { $set: action.payload.liked },
            likes: { $set: action.payload.likes },
          },
        },
      });
    default:
      return state;
  }
}
