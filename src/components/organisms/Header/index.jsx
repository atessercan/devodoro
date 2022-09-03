import React from 'react';
import { FaBars } from 'react-icons/fa';
import logo from '../../../logo.svg';
import { SiteTitle } from '../../atoms/Text';

function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="Application logo" width="100px" />
      <SiteTitle />
      <div className="menu">
        <FaBars />
      </div>
    </header>
  );
}

export default Header;
