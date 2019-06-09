import axios from "axios";
import {
  DATA_TREE,
  TRIVIAL_ERRORS,
  SET_CAT,
  PUSH_SET,
  SET_LOCATION
} from "./types";

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
