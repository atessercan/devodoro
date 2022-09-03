import React from 'react';
import styles from './index.module.scss';

function Menu() {
  return (
    <div className={styles.menu}>
      <strong>Signup</strong>
      <strong>Login</strong>
    </div>
  );
}

export default Menu;
