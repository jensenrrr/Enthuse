import axios from "axios";
import { DATA_TREE, TRIVIAL_ERRORS, SET_CAT, PUSH_CAT } from "./types";

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

export const pushCat = set => dispatch => {
  dispatch({
    type: PUSH_CAT,
    payload: set
  });
};
