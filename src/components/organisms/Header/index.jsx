import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import logo from '../../../logo.svg';
import { SiteTitle } from '../../atoms/Text';
import Menu from '../../molecules/Nav';
import styles from './index.module.scss';

function Header() {
  const [menuVisibility, setMenuVisibility] = useState(false);

  return (
    <>
      <header className={styles['app-header']}>
        <img src={logo} alt="Application logo" width="100px" />
        <SiteTitle />
        <FaBars
          className={styles['menu-button']}
          onClick={() => setMenuVisibility((prevState) => !prevState)}
        />
      </header>
      {menuVisibility && <Menu />}
    </>
  );
}

export default Header;
