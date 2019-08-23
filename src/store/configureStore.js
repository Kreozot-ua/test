import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(...process.env.NODE_ENV === 'development' ? [logger] : [], thunk));
}
