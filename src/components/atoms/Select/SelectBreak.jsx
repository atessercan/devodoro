import React, { useContext } from 'react';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';

function SelectBreak() {
  const { setBreakDuration } = useContext(SettingsContext);
  const changeHandler = (e) => {
    const duration = e.target.value;
    setBreakDuration(duration);
  };
  return (
    <label htmlFor="pomodoro">
      <span className={styles['option-title']}>Short Break : </span>
      <select
        className={styles.select}
        name="duration"
        onChange={changeHandler}
      >
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
    </label>
  );
}

export default SelectBreak;
