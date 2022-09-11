import React, { useContext } from 'react';
import ThemeContext from '../../../context/theme-context';
import logo from '../../../logo.svg';
import SiteTitle from '../../atoms/Text';
import Menu from '../../molecules/Menu';
import styles from './index.module.scss';

function Header() {
  const { theme } = useContext(ThemeContext);
  return (
    <header
      className={
        theme === 'night'
          ? styles['app-header-dark']
          : styles['app-header-light']
      }
    >
      <div className={styles['application-logo']}>
        <img src={logo} alt="app logo" width="100px" />
      </div>
      <SiteTitle />
      <Menu />
    </header>
  );
}

export default Header;
