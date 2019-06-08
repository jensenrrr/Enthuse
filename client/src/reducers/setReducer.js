import { DATA_TREE, SET_CAT, PUSH_CAT } from "../actions/types";

const initialState = {
  tree: [],
  category: "",
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
    case PUSH_CAT:
      return {
        state,
        favoriteSets: [...state.favoriteSets, action.payload]
      };
    default:
      return state;
  }
}
