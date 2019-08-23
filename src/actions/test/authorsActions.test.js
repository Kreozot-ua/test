import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import books from '../../mocks/books';
import authors from '../../mocks/authors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let mappedAuthors = authors.reduce((acc, author) => {
  acc[author.name] = author;
  acc[author.name].books = [];
  return acc;
}, {});
books.forEach(book => {
  book.authors.forEach((author) => {
    mappedAuthors[author].books.push({
      id: book.id,
      title: book.title
    });
  });
});

import {
  loadAuthorsList,
  loadAuthorByName,
  expandAuthorMenu,
  closeAuthorMenu
} from '../authorsActions';

import { ROOT } from '../../constants/common';
import { TYPES } from '../../constants/actionTypes';

describe('authors list actions', () => {
  afterEach(() => {
    fetchMock.restore()
  });

  it('should fetch authors list from api', () => {
    fetchMock.getOnce(`${ROOT}/api/authors-list`, {
      body: {success: true, error: '', data: authors},
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      {
        type: TYPES.FETCH_AUTHOR_LIST_START
      },
      {
        type: TYPES.FETCH_AUTHOR_LIST_SUCCESS,
        payload: mappedAuthors
      }
    ];

    const store = mockStore({
      authors: {
        loading: false,
        items: {}
      },
      books: {
        items: books
      }
    });

    return store.dispatch(loadAuthorsList()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should set current opened author info', () => {
    const expectedActions = [
      {
        type: TYPES.SET_CURRENT_OPENED_AUTHOR,
        payload: mappedAuthors["Rachele Oiller"]
      }
    ];

    const store = mockStore({
      authors: {
        loading: false,
        items: mappedAuthors
      },
      books: {
        items: books
      }
    });

    return store.dispatch(loadAuthorByName("Rachele Oiller")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to add a todo', () => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, false);
    const element = document.createElement('div');
    element.dispatchEvent(event);

    const expectedAction = {
      type: TYPES.EXPAND_AUTHOR_MENU,
      payload: {
        name: 'Rachele Oiller',
        target: event.currentTarget
      }
    };
    expect(expandAuthorMenu(event, 'Rachele Oiller')).toEqual(expectedAction)
  });

  it('should create an action to add a todo', () => {
    const expectedAction = {
      type: TYPES.CLOSE_AUTHOR_MENU,
      payload: 'Rachele Oiller'
    };
    expect(closeAuthorMenu('Rachele Oiller')).toEqual(expectedAction)
  });
});
