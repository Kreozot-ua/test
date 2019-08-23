import { TYPES } from '../../constants/actionTypes';
import reducer from '../booksReducer';

import books from '../../mocks/books';

describe('books reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      current: {},
      favorites: [],
      items: []
    })
  });

  it('should handle FETCH_BOOKS_LIST_START', () => {
    expect(
      reducer({
        loading: false,
        current: {},
        favorites: [],
        items: []
      }, {
        type: TYPES.FETCH_BOOKS_LIST_START
      })
    ).toEqual({
      loading: true,
      current: {},
      favorites: [],
      items: []
    });
  });

  it('should handle FETCH_BOOKS_LIST_SUCCESS', () => {
    expect(
      reducer({
        loading: true,
        current: {},
        favorites: [],
        items: []
      }, {
        type: TYPES.FETCH_BOOKS_LIST_SUCCESS,
        payload: {
          items: books,
          favorites: [9348583, 9348584]
        }
      })
    ).toEqual({
      loading: false,
      current: {},
      favorites: [9348583, 9348584],
      items: books
    });
  });

  it('should handle FETCH_BOOKS_LIST_ERROR', () => {
    expect(
      reducer({
        loading: true,
        current: {},
        favorites: [],
        items: []
      }, {
        type: TYPES.FETCH_BOOKS_LIST_ERROR
      })
    ).toEqual({
      loading: false,
      current: {},
      favorites: [],
      items: []
    });
  });

  it('should handle SET_FAVORITES_LIST', () => {
    expect(
      reducer({
        loading: false,
        current: {},
        favorites: [],
        items: []
      }, {
        type: TYPES.SET_FAVORITES_LIST,
        payload: [9348583, 9348584]
      })
    ).toEqual({
      loading: false,
      current: {},
      favorites: [9348583, 9348584],
      items: []
    });
  });

  it('should handle SET_CURRENT_OPENED_BOOK', () => {
    expect(
      reducer({
        loading: false,
        current: {},
        favorites: [],
        items: books
      }, {
        type: TYPES.SET_CURRENT_OPENED_BOOK,
        payload: books[9348583]
      })
    ).toEqual({
      loading: false,
      current: books[9348583],
      favorites: [],
      items: books
    });
  });
});
