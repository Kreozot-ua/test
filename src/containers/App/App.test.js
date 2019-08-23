import React from 'react';
import App from './App';
import { BooksList } from '../BooksList/BooksList';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import configureStore from '../../store/configureStore';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { mount, shallow } from 'enzyme';

const rrd = require('react-router-dom');
rrd.BrowserRouter = ({children}) => <div>{children}</div>;
module.exports = rrd;

const store = configureStore();

describe('<App />', () => {
  // GENERAL
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </Provider>
    );
  });

  //ROUTER
  it('invalid path should redirect to 404', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/invalid']}>
          <App store={store}/>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(BooksList)).toHaveLength(0);
    expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  });

  it('valid path should not redirect to 404', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App store={store}/>
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(BooksList)).toHaveLength(1);
    expect(wrapper.find(NotFoundPage)).toHaveLength(0);
  });
});
