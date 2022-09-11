import React from 'react';
import styles from './index.module.scss';

function SiteTitle() {
  return (
    <a className={styles.link} href=".">
      <h1 className={styles['app-title']}>DEVODORO</h1>
    </a>
  );
}

export default SiteTitle;
