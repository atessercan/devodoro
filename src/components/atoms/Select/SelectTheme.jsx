import React, { useContext } from 'react';
import styles from './index.module.scss';
import ThemeContext from '../../../context/theme-context';

function SelectTheme() {
  const { theme, setTheme } = useContext(ThemeContext);
  const changeHandler = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };
  return (
    <label htmlFor="pomodoro">
      <span className={styles['option-title']}>Theme : </span>
      <select
        className={
          theme === 'night' ? styles['select-dark'] : styles['select-light']
        }
        name="duration"
        onChange={changeHandler}
        defaultValue={theme}
      >
        <option value="night">Night</option>
        <option value="day">Day</option>
      </select>
    </label>
  );
}

export default SelectTheme;
