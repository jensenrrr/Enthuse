import {
  SET_CURRENT_USER,
  USER_LOADING,
  DATA_TREE,
  USERNAME_CHANGE,
  UPDATE_USER,
  HOMEPAGE_CHANGE
} from "../actions/types";
//const fs = require("fs");

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {
    id: "",
    username: "",
    homepage: "",
  },
  loading: false,
  tree: [],
  meme: false,
  currentSets: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DATA_TREE:
      return {
        ...state,
        tree: action.payload,
      };
    case USERNAME_CHANGE:
      const cUser = state.user;
      cUser.username = action.payload.username;
      //fs.writeFile("meme.txt", JSON.stringify(cUser));
      return {
        ...state,
        user: cUser,
      };
      case HOMEPAGE_CHANGE:
        const hUser = state.user;

        hUser.id = action.payload.id;
        return{
          ...state,
          user: hUser,
          homePage: action.payload
        };
    case UPDATE_USER:
      const uUser = state.user;
      uUser.username = action.payload.username;
      uUser.homepage = action.payload.homepage;
      uUser.favs = action.payload.favs;
      uUser.sets = action.payload.sets;
      return {
        ...state,
        user: uUser,
      };
    default:
      return state;
  }
}
