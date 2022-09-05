import React, { useContext } from 'react';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';

function SelectPomodoro() {
  const { setSessionDuration } = useContext(SettingsContext);
  const changeHandler = (e) => {
    const duration = e.target.value;
    setSessionDuration(duration);
  };
  return (
    <label htmlFor="pomodoro">
      <span className={styles['option-title']}>Pomodoro : </span>
      <select
        className={styles.select}
        name="duration"
        onChange={changeHandler}
      >
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="55">55</option>
        <option value="60">60</option>
      </select>
    </label>
  );
}

export default SelectPomodoro;
