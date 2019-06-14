import {
  DATA_TREE,
  SET_CAT,
  PUSH_SET,
  SET_LOCATION,
  SET_CURRENT_USER,
  PUSH_A_CURRENT_SET,
  REMOVE_A_CURRENT_SET
} from "../actions/types";

const initialState = {
  tree: [],
  category: "",
  location: {
    county: "",
    country: "",
    state: ""
  },
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
    case SET_CURRENT_USER:
      return {
        ...state,
        currentSets: action.payload.sets,
        favs: action.payload.favs,
        homePage: action.payload.sets
      };
    case REMOVE_A_CURRENT_SET:
      return {
        ...state,
        currentSets: [
          ...state.currentSets.slice(0, action.payload),
          ...state.currentSets.slice(action.payload + 1)
        ]
      };
    case PUSH_A_CURRENT_SET:
      return {
        ...state,
        currentSets: [...state.currentSets, action.payload]
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
