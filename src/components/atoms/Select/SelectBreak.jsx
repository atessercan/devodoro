import React, { useContext } from 'react';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';
import breakDurations from '../../../constants/constant';

function SelectBreak() {
  const { breakDuration, setBreakDuration } = useContext(SettingsContext);
  const changeHandler = (e) => {
    const duration = +e.target.value;
    setBreakDuration(duration);
  };
  return (
    <label htmlFor="pomodoro">
      <span className={styles['option-title']}>Break : </span>
      <select
        className={styles.select}
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
