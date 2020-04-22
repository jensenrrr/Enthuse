import axios from "axios";
import {
  POST_CREATE,
  POST_UPVOTE,
  POST_COMMENT,
  POST_GET,
  POST_ERRORS,
  LIKE_COMMENT,
  POST_COMMENT_ON_COMMENT,
  LOAD_COMMENT,
  SINGLEPOST_GET,
  SINGLEPOST_COMMENT_ON_COMMENT,
  SINGLEPOST_LOAD_COMMENT,
  LOAD_IMAGE,
  LOAD_SINGLE_IMAGE,
} from "./types";
function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}
export const getSingleImage = (up) => (dispatch) => {
  //console.log("calling get image");
  axios
    .post("/api/post/getimage", up)
    .then((data) => {
      //console.log(data);
      var meme = "";
      if (data.data.img) {
        var base64Flag = "data:image/jpeg;base64,";
        //console.log(data.data.img.data.data);
        var imageStr = arrayBufferToBase64(data.data.img.data.data);
        meme = base64Flag + imageStr;
      }

      dispatch({
        type: LOAD_SINGLE_IMAGE,
        payload: { img: meme, index: up.index },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};
export const getImage = (up) => (dispatch) => {
  //console.log("calling get image");
  axios
    .post("/api/post/getimage", up)
    .then((data) => {
      //console.log(data);
      var meme = "";
      if (data.data.img) {
        var base64Flag = "data:image/jpeg;base64,";
        //console.log(data.data.img.data.data);
        var imageStr = arrayBufferToBase64(data.data.img.data.data);
        meme = base64Flag + imageStr;
      }

      dispatch({
        type: LOAD_IMAGE,
        payload: { img: meme, index: up.index },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};
export const createPost = (newPost) => (dispatch) => {
  //console.log(newPost);
  //console.log(newPost.imgArr);
  axios
    .post("/api/post/create/c", newPost)
    .then((res) => {
      dispatch({
        type: POST_CREATE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const getSinglePost = (sets) => (dispatch) => {
  axios
    .post("/api/post/getSinglePost", sets)
    .then((res) => {
      console.log(res.data);
      console.log("getsinglepost");
      dispatch({
        type: SINGLEPOST_GET,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const getPosts = (sets) => (dispatch) => {
  axios
    .post("/api/post/getposts", sets)
    .then((res) => {
      console.log("getposts" + res.data);
      //console.log("getposts");
      dispatch({
        type: POST_GET,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const getUserPosts = (username) => (dispatch) => {
  console.log(username);
  axios
    .post("/api/post/getuserposts", username)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: POST_GET,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const upVotePost = (upIDs) => (dispatch) => {
  axios
    .post("/api/post/upvote", upIDs)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: POST_UPVOTE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const comment = (comment) => (dispatch) => {
  console.log(comment);
  axios
    .post("/api/post/comment", comment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: POST_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const commentOnComment = (upIDs) => (dispatch) => {
  axios
    .post("/api/post/commentOnComment", upIDs)
    .then((res) => {
      dispatch({
        type: POST_COMMENT_ON_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const singleCommentOnComment = (upIDs) => (dispatch) => {
  //console.log(upIDs);
  axios
    .post("/api/post/commentOnComment", upIDs)
    .then((res) => {
      dispatch({
        type: SINGLEPOST_COMMENT_ON_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const likeComment = (data) => (dispatch) => {
  axios
    .post("/api/post/likeComment", data)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LIKE_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: POST_ERRORS,
        payload: "err",
      })
    );
};
export const singleLoadMoreComments = (data) => (dispatch) => {
  axios
    .post("/api/post/loadMoreComments", data)
    .then((res) => {
      //console.log(res.data);
      dispatch({
        type: SINGLEPOST_LOAD_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};

export const loadRestComments = (data) => (dispatch) => {
  axios
    .post("/api/post/loadMoreComments", data)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOAD_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: POST_ERRORS,
        payload: err,
      });
    });
};
