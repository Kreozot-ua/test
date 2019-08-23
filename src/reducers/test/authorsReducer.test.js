import { TYPES } from '../../constants/actionTypes';
import reducer from '../authorsReducer';

import books from '../../mocks/books';
import authors from '../../mocks/authors';

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

describe('authors reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      current: {},
      items: {}
    })
  });

  it('should handle FETCH_AUTHOR_LIST_START', () => {
    expect(
      reducer({
        loading: false,
        current: {},
        items: {}
      }, {
        type: TYPES.FETCH_AUTHOR_LIST_START
      })
    ).toEqual({
      loading: true,
      current: {},
      items: {}
    });
  });

  it('should handle FETCH_AUTHOR_LIST_SUCCESS', () => {
    expect(
      reducer({
        loading: true,
        current: {},
        items: {}
      }, {
        type: TYPES.FETCH_AUTHOR_LIST_SUCCESS,
        payload: mappedAuthors
      })
    ).toEqual({
      loading: false,
      current: {},
      items: mappedAuthors
    });
  });

  it('should handle FETCH_AUTHOR_LIST_ERROR', () => {
    expect(
      reducer({
        loading: true,
        current: {},
        items: {}
      }, {
        type: TYPES.FETCH_AUTHOR_LIST_ERROR
      })
    ).toEqual({
      loading: false,
      current: {},
      items: {}
    });
  });

  it('should handle SET_CURRENT_OPENED_AUTHOR', () => {
    expect(
      reducer({
        loading: false,
        current: {},
        items: mappedAuthors
      }, {
        type: TYPES.SET_CURRENT_OPENED_AUTHOR,
        payload: mappedAuthors['Rachele Oiller']
      })
    ).toEqual({
      loading: false,
      current: mappedAuthors['Rachele Oiller'],
      items: mappedAuthors
    });
  });

  it('should handle EXPAND_AUTHOR_MENU', () => {
    const div = document.createElement('div');

    expect(
      reducer({
        loading: false,
        current: {},
        items: {
          'Rachele Oiller': {
            name: 'Rachele Oiller',
            bio: 'dummy bio'
          }
        }
      }, {
        type: TYPES.EXPAND_AUTHOR_MENU,
        payload: {
          target: div,
          name: 'Rachele Oiller'
        }
      })
    ).toEqual({
      loading: false,
      current: {},
      items: {
        'Rachele Oiller': {
          name: 'Rachele Oiller',
          bio: 'dummy bio',
          opened: div
        }
      }
    });
  });

  it('should handle CLOSE_AUTHOR_MENU', () => {
    const div = document.createElement('div');

    expect(
      reducer({
        loading: false,
        current: {},
        items: {
          'Rachele Oiller': {
            name: 'Rachele Oiller',
            bio: 'dummy bio',
            opened: div
          }
        }
      }, {
        type: TYPES.CLOSE_AUTHOR_MENU,
        payload: 'Rachele Oiller'
      })
    ).toEqual({
      loading: false,
      current: {},
      items: {
        'Rachele Oiller': {
          name: 'Rachele Oiller',
          bio: 'dummy bio',
          opened: null
        }
      }
    });
  });
});
