import React from 'react';
import NotFoundPage from './NotFoundPage';
import configureStore from '../../store/configureStore';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

const store = configureStore();

describe('<NotFoundPage />', () => {
  it('renders without crashing', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/404' ]}>
          <Route component={props => <NotFoundPage {...props} />} path="/404" />
        </MemoryRouter>
      </Provider>
    );
  });
});
