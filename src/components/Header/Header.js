import React from 'react';
import { NavLink } from 'react-router-dom';


import './Header.css';

const Header = () => (
  <header className="header">
    <NavLink
      className='item'
      activeClassName='-active'
      to='/books-list'
      isActive={(match, location) => location.pathname === '/' || location.pathname === '/books-list'}
    >
      <p className='text'>Books list</p>
    </NavLink>
    <NavLink className='item' exact={true} activeClassName='-active' to='/authors-list'>
      <p className='text'>Authors list</p>
    </NavLink>
    <NavLink className='item' exact={true} activeClassName='-active' to='/books-list/favorites'>
      <p className='text'>Favorites list</p>
    </NavLink>
  </header>
);

export default Header;
