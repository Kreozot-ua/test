import { TYPES } from '../constants/actionTypes';
import { ROOT } from '../constants/common';

import { loadBooksList } from './booksActions';

export function loadAuthorsList() {
  return (dispatch, getState) => {
    dispatch({
      type: TYPES.FETCH_AUTHOR_LIST_START
    });
    const { items } = getState().books;
    if(!items.length) {
      return loadBooksList()(dispatch).then((response) => {
        return fetchAuthorList(response)(dispatch);
      });
    } else {
      return fetchAuthorList(items)(dispatch);
    }
  }
}

function fetchAuthorList(books) {
  return (dispatch) => {
    return fetch(`${ROOT}/api/authors-list`)
      .then(response => response.json())
      .then(response => {
        if(response.success) {
          let authors = response.data.reduce((acc, author) => {
            acc[author.name] = author;
            acc[author.name].books = [];
            return acc;
          }, {});
          books.forEach(book => {
            book.authors.forEach((author) => {
              authors[author].books.push({
                id: book.id,
                title: book.title
              });
            });
          });
          // authors = Object.keys(authors).reduce((acc, author) => {
          //   acc.push(authors[author]);
          //   return acc;
          // }, []);
          dispatch({
            type: TYPES.FETCH_AUTHOR_LIST_SUCCESS,
            payload: authors
          });
          return authors;
        } else {
          throw response.error
        }
      }).catch(error => {
        console.warn(error);
        dispatch({
          type: TYPES.FETCH_AUTHOR_LIST_ERROR
        });
      });
  }
}

export function loadAuthorByName(name) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const { items } = getState().authors;
      let author = items[name];
      if(!author) {
        loadAuthorsList()(dispatch, getState).then((response) => {
          author = response[name];
          dispatch({
            type: TYPES.SET_CURRENT_OPENED_AUTHOR,
            payload: author
          });
        });
      } else {
        dispatch({
          type: TYPES.SET_CURRENT_OPENED_AUTHOR,
          payload: author
        });
        resolve(author)
      }
    });
  }
}

export function expandAuthorMenu(e, name) {
  return {
    type: TYPES.EXPAND_AUTHOR_MENU,
    payload: {
      name,
      target: e.currentTarget
    }
  }
}

export function closeAuthorMenu(name) {
  return {
    type: TYPES.CLOSE_AUTHOR_MENU,
    payload: name
  }
}
