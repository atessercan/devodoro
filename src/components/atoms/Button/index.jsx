import React, { useContext } from 'react';
import styles from './index.module.scss';
import ThemeContext from '../../../context/theme-context';

function Button({ name, onClick, disabled, className }) {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className={
        theme === 'night'
          ? `${styles['button-dark']} ${className}`
          : `${styles['button-light']} ${className}`
      }
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{name}</span>
    </button>
  );
}

export default Button;
