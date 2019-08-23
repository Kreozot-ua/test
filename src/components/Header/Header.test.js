import React from 'react';
import Header from './Header';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { mount, shallow } from 'enzyme';


describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it('navigates properly', () => {
    const header = mount(
      <MemoryRouter initialEntries={[ '/authors-list' ]}>
        <Header />
      </MemoryRouter>
    );
    expect(header.find('[href="/authors-list"]').hasClass('-active')).toBe(true);
    expect(header.find('[href="/books-list"]').hasClass('-active')).toBe(false);
  });
});
