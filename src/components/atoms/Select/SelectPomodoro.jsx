import React, { useContext } from 'react';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';
import sessionDurations from '../../../constants/constant';

function SelectPomodoro() {
  const { sessionDuration, setSessionDuration } = useContext(SettingsContext);
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
        defaultValue={sessionDuration}
      >
        {sessionDurations.sessionDurations.map((item) => (
          <option key={Math.random()} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectPomodoro;
