import React, { useContext } from 'react';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';
import sessionDurations from '../../../constants/constant';
import ThemeContext from '../../../context/theme-context';

function SelectPomodoro() {
  const { sessionDuration, setSessionDuration } = useContext(SettingsContext);
  const { theme } = useContext(ThemeContext);
  const changeHandler = (e) => {
    const duration = e.target.value;
    setSessionDuration(duration);
  };
  return (
    <label htmlFor="pomodoro">
      <span className={styles['option-title']}>Pomodoro : </span>
      <select
        className={
          theme === 'night' ? styles['select-dark'] : styles['select-light']
        }
        name="duration"
        onChange={changeHandler}
        value={sessionDuration}
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
