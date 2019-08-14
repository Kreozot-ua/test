import { TYPES } from '../constants/actionTypes';

const initialState = {
  loading: false,
  current: {},
  favorites: [],
  items: []
};

export default (state = initialState, action) => {
  switch (action.type){
    case TYPES.FETCH_BOOKS_LIST_START:
      return {
        ...state,
        loading: true
      };
    case TYPES.FETCH_BOOKS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        favorites: action.payload.favorites,
      };
    case TYPES.FETCH_BOOKS_LIST_ERROR:
      return {
        ...state,
        loading: false
      };
    case TYPES.SET_FAVORITES_LIST:
      return {
        ...state,
        favorites: action.payload
      };
    case TYPES.SET_CURRENT_OPENED_BOOK:
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
};
