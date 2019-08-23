import React from 'react';
import AuthorsList from './AuthorsList';
import configureStore from '../../store/configureStore';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const store = configureStore();

describe('<AuthorsList />', () => {
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/authors-list' ]}>
          <Route component={props => <AuthorsList {...props} />} path="/authors-list" />
        </MemoryRouter>
      </Provider>
    );
  });
});
