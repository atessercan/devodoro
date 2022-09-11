import React, { useContext } from 'react';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';

function SelectTheme() {
  const { theme, setTheme } = useContext(SettingsContext);
  const changeHandler = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };
  return (
    <label htmlFor="pomodoro">
      <span className={styles['option-title']}>Theme : </span>
      <select
        className={styles.select}
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
