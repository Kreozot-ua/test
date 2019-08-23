import React from 'react';
import AuthorPage from './AuthorPage';
import configureStore from '../../store/configureStore';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const store = configureStore();

describe('<AuthorPage />', () => {
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/author-page' ]}>
          <Route component={props => <AuthorPage {...props} />} path="/author-page" />
        </MemoryRouter>
      </Provider>
    );
  });
});
