import React, { useState, useMemo } from 'react';
import PomoNav from '../PomoNav';
import Timer from '../../molecules/Timer';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';

function Pomodoro() {
  const [sessionDuration, setSessionDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(5);
  const [theme, setTheme] = useState('night');
  const settingValues = useMemo(
    () => ({
      sessionDuration,
      breakDuration,
      theme,
      setSessionDuration,
      setBreakDuration,
      setTheme,
    }),
    [sessionDuration, breakDuration, theme],
  );
  return (
    <SettingsContext.Provider value={settingValues}>
      <div className={styles['pomodoro-section']}>
        <PomoNav />
        <Timer />
      </div>
    </SettingsContext.Provider>
  );
}

export default Pomodoro;
