import React from 'react';
import styles from './index.module.scss';

function Button({ name, onClick, disabled, className }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{name}</span>
    </button>
  );
}

export default Button;
