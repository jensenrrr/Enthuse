import axios from "axios";
import { POST_CREATE, POST_ERRORS } from "./types";

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
