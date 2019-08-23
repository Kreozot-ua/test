import React from 'react';
import Book from './Book';
import { shallow } from 'enzyme';
import configureStore from '../../store/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();

describe('<Book />', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <Book />
      </Provider>
    );
  });
});
