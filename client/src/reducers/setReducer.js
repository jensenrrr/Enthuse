import { DATA_TREE, SET_CAT, PUSH_SET, SET_LOCATION } from "../actions/types";

const initialState = {
  tree: [],
  category: "",
  location: {
    county: "",
    country: "",
    state: ""
  },
  favoriteSets: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_TREE:
      return {
        ...state,
        tree: action.payload
      };
    case SET_CAT:
      return {
        ...state,
        category: action.payload
      };
    case PUSH_SET:
      return {
        ...state,
        favoriteSets: [...state.favoriteSets, action.payload]
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
