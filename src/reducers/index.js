import { combineReducers } from 'redux';
import books from './booksReducer';
import authors from './authorsReducer';

export default combineReducers({
  books,
  authors
});
