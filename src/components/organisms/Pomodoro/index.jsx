import React, { useContext, useState, useMemo } from 'react';
import PomoNav from '../PomoNav';
import Timer from '../../molecules/Timer';
import styles from './index.module.scss';
import SettingsContext from '../../../context/settings-context';
import ThemeContext from '../../../context/theme-context';

function Pomodoro() {
  const { theme } = useContext(ThemeContext);
  const [sessionDuration, setSessionDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(5);

  const settingValues = useMemo(
    () => ({
      sessionDuration,
      breakDuration,
      setSessionDuration,
      setBreakDuration,
    }),
    [sessionDuration, breakDuration],
  );
  return (
    <SettingsContext.Provider value={settingValues}>
      <div
        className={
          theme === 'night'
            ? styles['pomodoro-section-dark']
            : styles['pomodoro-section-light']
        }
      >
        <PomoNav />
        <Timer />
      </div>
    </SettingsContext.Provider>
  );
}

export default Pomodoro;
