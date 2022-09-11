import React, { useContext } from 'react';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';
import breakDurations from '../../../constants/constant';
import ThemeContext from '../../../context/theme-context';

function SelectBreak() {
  const { breakDuration, setBreakDuration } = useContext(SettingsContext);
  const { theme } = useContext(ThemeContext);
  const changeHandler = (e) => {
    const duration = +e.target.value;
    setBreakDuration(duration);
  };
  return (
    <label htmlFor="pomodoro">
      <span className={styles['option-title']}>Break : </span>
      <select
        className={
          theme === 'night' ? styles['select-dark'] : styles['select-light']
        }
        name="duration"
        onChange={changeHandler}
        value={breakDuration}
      >
        {breakDurations.breakDurations.map((item) => (
          <option key={Math.random()} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectBreak;
