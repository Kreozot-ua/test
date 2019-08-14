import { TYPES } from '../constants/actionTypes';
import { ROOT } from '../constants/common';

export function loadBooksList() {
  return (dispatch) => {
    dispatch({
      type: TYPES.FETCH_BOOKS_LIST_START
    });
    return fetch(`${ROOT}/api/books-list`)
      .then(response => response.json())
      .then(response => {
      if(response.success) {
        const favorites = JSON.parse(localStorage.getItem('saved-favorites') || '[]');
        dispatch({
          type: TYPES.FETCH_BOOKS_LIST_SUCCESS,
          payload: {
            items: response.data,
            favorites
          }
        });
        return response.data;
      } else {
        throw response.error
      }
    }).catch(error => {
      console.warn(error);
      dispatch({
        type: TYPES.FETCH_BOOKS_LIST_ERROR
      });
    });
  }
}

export function handleFavoritesList(id) {
  return (dispatch, getState) => {
    localStorage.getItem('saved-favorites');
    let { favorites } = getState().books;
    if(favorites.includes(id)) {
      favorites = favorites.filter(item => item !== id);
      dispatch({
        type: TYPES.SET_FAVORITES_LIST,
        payload: favorites
      });
    } else {
      favorites = [...favorites, id];
      dispatch({
        type: TYPES.SET_FAVORITES_LIST,
        payload: favorites
      });
    }
    localStorage.setItem('saved-favorites', JSON.stringify(favorites));
  }
}

export function loadBookById(id) {
  return (dispatch, getState) => {
    const { items } = getState().books;
    let book = items.find(item => item.id === parseInt(id));
    if(!book) {
      loadBooksList()(dispatch).then(() => {
        const { items } = getState().books;
        book = items.find(item => item.id === parseInt(id));
        dispatch({
          type: TYPES.SET_CURRENT_OPENED_BOOK,
          payload: book
        });
      });
    } else {
      dispatch({
        type: TYPES.SET_CURRENT_OPENED_BOOK,
        payload: book
      });
    }
  }
}
