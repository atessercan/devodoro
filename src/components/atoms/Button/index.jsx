import React from 'react';
import styles from './index.module.scss';

function Button({ name, onClick }) {
  return (
    <div>
      <button className={styles.button} type="submit" onClick={onClick}>
        {name}
      </button>
    </div>
  );
}

export default Button;
