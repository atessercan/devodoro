import React from 'react';
import logo from '../../../logo.svg';
import { SiteTitle } from '../../atoms/Text';
import Menu from '../../molecules/Menu';
import styles from './index.module.scss';

function Header() {
  return (
    <header className={styles['app-header']}>
      <img
        src={logo}
        className={styles['application-logo']}
        alt="app logo"
        width="100px"
      />
      <SiteTitle />
      <Menu />
    </header>
  );
}

export default Header;
