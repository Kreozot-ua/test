import React from 'react';
import Loader from './Loader';
import { shallow } from 'enzyme';


describe('<Loader />', () => {
  it('renders without crashing', () => {
    shallow(<Loader />);
  });
});
