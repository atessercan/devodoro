import React from 'react';
import styles from './index.module.scss';

function Button({ name }) {
  return (
    <div>
      <button className={styles.button} type="submit">
        {name}
      </button>
    </div>
  );
}

export default Button;
