import {
  DATA_TREE,
  SET_CAT,
  PUSH_SET,
  SET_LOCATION,
  SET_SETS,
  CHANGE_CURRENT_SET
} from "../actions/types";

const initialState = {
  tree: [],
  category: "",
  location: {
    county: "",
    country: "",
    state: ""
  },
  list: [],
  favs: [],
  homePage: [],
  currentSets: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_TREE:
      return {
        ...state,
        tree: action.payload
      };
    case SET_SETS:
      return {
        ...state,
        currentSets: action.payload.sets,
        favs: action.payload.favs,
        homePage: action.payload.homePage
      };
    case CHANGE_CURRENT_SET:
      return {
        ...state,
        currentSets: action.payload
      };
    case SET_CAT:
      return {
        ...state,
        category: action.payload.category,
        list: action.payload.list
      };
    case PUSH_SET:
      return {
        ...state,
        homePage: [...state.homePage, action.payload]
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
}
