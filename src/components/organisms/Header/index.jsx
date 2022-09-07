import React, { useContext } from 'react';
import AuthContext from '../../../context/auth-context';
import logo from '../../../logo.svg';
import { SiteTitle } from '../../atoms/Text';
import Menu from '../../molecules/Nav';
import styles from './index.module.scss';

function Header() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(setCurrentUser);
  return (
    <>
      {console.log(currentUser)}
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
    </>
  );
}

export default Header;
