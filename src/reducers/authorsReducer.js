import { TYPES } from '../constants/actionTypes';

const initialState = {
  loading: false,
  current: {},
  items: {}
};

export default (state = initialState, action) => {
  switch (action.type){
    case TYPES.FETCH_AUTHOR_LIST_START:
      return {
        ...state,
        loading: true
      };
    case TYPES.FETCH_AUTHOR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case TYPES.FETCH_AUTHOR_LIST_ERROR:
      return {
        ...state,
        loading: false
      };
    case TYPES.SET_CURRENT_OPENED_AUTHOR:
      return {
        ...state,
        current: action.payload
      };
    case TYPES.EXPAND_AUTHOR_MENU:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.name]: {...state.items[action.payload.name], opened: action.payload.target}
        }
      };
    case TYPES.CLOSE_AUTHOR_MENU:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {...state.items[action.payload], opened: null}
        }
      };
    default:
      return state;
  }
};
