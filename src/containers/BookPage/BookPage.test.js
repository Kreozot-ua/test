import React from 'react';
import BookPage from './BookPage';
import configureStore from '../../store/configureStore';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const store = configureStore();

describe('<BookPage />', () => {
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/book-page' ]}>
          <Route component={props => <BookPage {...props} />} path="/book-page" />
        </MemoryRouter>
      </Provider>
    );
  });
});
