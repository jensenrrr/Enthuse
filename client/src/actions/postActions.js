import axios from "axios";
import {
  POST_CREATE,
  POST_UPVOTE,
  POST_COMMENT,
  POST_GET,
  POST_ERRORS
} from "./types";

export const createPost = newPost => dispatch => {
  axios
    .post("/api/post/create", newPost)
    .then(res => {
      dispatch({
        type: POST_CREATE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPosts = sets => dispatch => {
  axios
    .post("/api/post/getposts", sets)
    .then(res => {
      console.log(res.data);
      console.log("getposts");
      dispatch({
        type: POST_GET,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_ERRORS,
        payload: err.response.data
      })
    );
};

export const getUserPosts = username => dispatch => {
  axios
    .post("/api/post/getuserposts", username)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: POST_GET,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_ERRORS,
        payload: err.response.data
      })
    );
};

export const upVotePost = upIDs => dispatch => {
  axios
    .post("/api/post/upvote", upIDs)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: POST_UPVOTE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_ERRORS,
        payload: err.response.data
      })
    );
};
export const commentOnComment = upIDs => dispatch => {
  axios
    .post("/api/post/commentOnComment", upIDs)
    .then(res => {
      //console.log(res.data);
      dispatch({
        type: POST_UPVOTE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_ERRORS,
        payload: err.response.data
      })
    );
};

export const comment = comment => dispatch => {
  axios
    .post("/api/post/comment", comment)
    .then(res => {
      dispatch({
        type: POST_COMMENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_ERRORS,
        payload: err.response.data
      })
    );
};
