import React from 'react';
import styles from './index.module.scss';

function Button({ name, onClick }) {
  return (
    <div>
      <button className={styles.button} type="submit" onClick={onClick}>
        <span>{name}</span>
      </button>
    </div>
  );
}

export default Button;
