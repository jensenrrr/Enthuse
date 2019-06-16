import axios from "axios";
import {
  DATA_TREE,
  TRIVIAL_ERRORS,
  SET_CAT,
  PUSH_SET,
  SET_LOCATION,
  CHANGE_CURRENT_SET,
  SET_ERRORS,
  SET_SETS,
  POST_GET
} from "./types";

export const getSetsAndPosts = data => dispatch => {
  axios
    .post("/api/set/setsAndPosts", data)
    .then(res => {
      const setsPayload = {
        sets: res.data.currentSets,
        favs: res.data.favoriteSets,
        homePage: res.data.homePage
      };
      dispatch({
        type: SET_SETS,
        payload: setsPayload
      });
      dispatch({
        type: POST_GET,
        payload: res.data.returnPosts
      });
    })
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};

export const changeCurrentSet = data => dispatch => {
  axios
    .post("/api/set/changeCurrent", data)
    .then(res => {
      dispatch({
        type: CHANGE_CURRENT_SET,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
};

export const callTree = () => dispatch => {
  axios
    .get("/api/tree/tree")
    .then(res => {
      dispatch({
        type: DATA_TREE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: TRIVIAL_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCat = category => dispatch => {
  dispatch({
    type: SET_CAT,
    payload: category
  });
};
/*
export const pushCurrentSet = set => dispatch => {
  dispatch({
    type: PUSH_A_CURRENT_SET,
    payload: set
  });
};*/

export const pushSet = set => dispatch => {
  dispatch({
    type: PUSH_SET,
    payload: set
  });
};

export const setLocation = category => dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: category
  });
};
