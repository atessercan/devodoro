import React, { useContext } from 'react';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';

function SelectTheme() {
  const { setTheme } = useContext(SettingsContext);
  const changeHandler = (e) => {
    const theme = e.target.value;
    setTheme(theme);
  };
  return (
    <label htmlFor="pomodoro">
      <span className={styles['option-title']}>Theme : </span>
      <select
        className={styles.select}
        name="duration"
        onChange={changeHandler}
      >
        <option value="night">Night</option>
        <option value="day">Day</option>
      </select>
    </label>
  );
}

export default SelectTheme;
