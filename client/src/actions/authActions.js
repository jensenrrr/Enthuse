import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  DATA_TREE,
  TRIVIAL_ERRORS,
  SET_SETS,
  USERNAME_CHANGE,
  UPDATE_USER,
} from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      history.push("/login");
      dispatch({
        type: DATA_TREE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const usernameChange = (userData) => (dispatch) => {
  axios
    .post("/api/users/changeUsername", userData)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USERNAME_CHANGE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(setSets(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const getCurrentUser = (userData) => (dispatch) => {
  console.log("get user");
  dispatch(setCurrentUser(userData));
  axios
    .post("/api/users/getUser", { id: userData.id })
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log("get curr user err"));
};
// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setSets = (decoded) => {
  return {
    type: SET_SETS,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const callTree = () => (dispatch) => {
  axios
    .get("/api/tree/tree")
    .then((res) => {
      dispatch({
        type: DATA_TREE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: TRIVIAL_ERRORS,
        payload: err.response.data,
      })
    );
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
