import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="vk.com">
          Star DB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <a href="vk.com">People</a>
        </li>
        <li>
          <a href="vk.com">Planets</a>
        </li>
        <li>
          <a href="vk.com">Starships</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;