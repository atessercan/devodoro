import React from 'react';
import styles from './index.module.scss';

function Title({ text }) {
  return <h2 className={styles['app-title']}>{text}</h2>;
}

export default Title;
