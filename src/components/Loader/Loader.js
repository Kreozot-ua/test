import React from 'react';
import src from '../../loader.gif';

import './Loader.css';

const Loader = () => (
  <div className="loader">
    <img className="image" src={src} title="Loading" alt="Loading"/>
  </div>
);

export default Loader;
