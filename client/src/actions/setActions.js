import axios from "axios";
import {
  DATA_TREE,
  TRIVIAL_ERRORS,
  SET_CAT,
  PUSH_SET,
  SET_LOCATION,
  REMOVE_A_CURRENT_SET,
  PUSH_A_CURRENT_SET
} from "./types";

export const removeCurrSet = index => dispatch => {
  dispatch({
    type: REMOVE_A_CURRENT_SET,
    payload: index
  });
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

export const pushCurrentSet = set => dispatch => {
  dispatch({
    type: PUSH_A_CURRENT_SET,
    payload: set
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
