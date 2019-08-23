import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import books from '../../mocks/books';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import {
  loadBooksList,
  handleFavoritesList,
  loadBookById
} from '../booksActions';

import { ROOT } from '../../constants/common';
import { TYPES } from '../../constants/actionTypes';

describe('books list actions', () => {
  afterEach(() => {
    fetchMock.restore()
  });

  it('should fetch books list from api', () => {
    fetchMock.getOnce(`${ROOT}/api/books-list`, {
      body: {success: true, error: '', data: books},
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      {
        type: TYPES.FETCH_BOOKS_LIST_START
      },
      {
        type: TYPES.FETCH_BOOKS_LIST_SUCCESS,
        payload: {
          items: books,
          favorites: []
        }
      }
    ];

    const store = mockStore({
      books: {
        loading: false,
        favorites: [],
        items: []
      }
    });

    return store.dispatch(loadBooksList()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should remove id from favorites', () => {
    const expectedActions = [{
      type: TYPES.SET_FAVORITES_LIST,
      payload: [9348583, 9348584]
    }];

    const store = mockStore({
      books: {
        favorites: [9348583, 9348584, 9348585]
      }
    });

    store.dispatch(handleFavoritesList(9348585));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should load book data by id', () => {
    const expectedActions = [
      {
        type: TYPES.SET_CURRENT_OPENED_BOOK,
        payload: books.find(item => item.id === parseInt(9348583))
      }
    ];

    const store = mockStore({
      books: {
        items: books,
        favorites: [],
        current: {}
      }
    });

    store.dispatch(loadBookById(9348583)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
