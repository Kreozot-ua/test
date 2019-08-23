import React from 'react';
import BooksList from './BooksList';
import configureStore from '../../store/configureStore';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const store = configureStore();

describe('<BooksList />', () => {
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/books-list' ]}>
          <Route component={props => <BooksList {...props} />} path="/books-list" />
        </MemoryRouter>
      </Provider>
    );
  });
});
