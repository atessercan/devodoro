import React, { useContext, useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from './index.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../../atoms/Button';
import SettingsContext from '../../../context/settings-context';
import playSound from '../../../helpers/playSound';
import AuthContext from '../../../context/auth-context';
import saveData from '../../../helpers/saveData';

function Timer() {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();

  const settings = useContext(SettingsContext);
  const { currentUser } = useContext(AuthContext);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sessionMode, setSessionMode] = useState('break');

  const secondsRef = useRef(seconds);
  const isPausedRef = useRef(isPaused);
  const sessionModeRef = useRef(sessionMode);
  const userRef = useRef(currentUser);
  userRef.current = currentUser;
  const tick = () => {
    secondsRef.current -= 1;
    setSeconds(secondsRef.current);
  };
  const changeMode = () => {
    const next = sessionModeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds =
      next === 'work'
        ? settings.sessionDuration * 60
        : settings.breakDuration * 60;

    setSessionMode(next);
    sessionModeRef.current = next;
    setSeconds(nextSeconds);
    secondsRef.current = nextSeconds;
  };

  useEffect(() => {
    setSeconds(0);
    secondsRef.current = 0;
    setSessionMode('break');
    sessionModeRef.current = 'break';
    const start = () => {
      setSeconds(settings.sessionDuration * 60);
    };
    start();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsRef.current === 0) {
        changeMode();
        setIsPaused(true);
        isPausedRef.current = true;
        return;
      }
      if (sessionModeRef.current === 'work' && secondsRef.current === 1) {
        playSound();
        // save data
        saveData(userRef.current, settings.sessionDuration);
        // save data
      }
      tick();
    }, 10);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, dayOfMonth, dayOfWeek]);

  const totalSeconds =
    sessionMode === 'work'
      ? settings.sessionDuration * 60
      : settings.breakDuration * 60;
  const percentage = Math.round((seconds / totalSeconds) * 100);

  const min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  if (sec < 10) sec = `0${sec}`;

  return (
    <div className={styles['timer-group']}>
      <CircularProgressbar
        counterClockwise
        value={percentage}
        text={`${min}:${sec}`}
        // background
        styles={buildStyles({
          pathColor: sessionMode === 'work' ? '#60b8c5' : 'green',
          strokeLinecap: 'butt',
          textColor: '#fff',
          trailColor: 'transparent',
        })}
      />
      <hr style={{ width: '80%' }} />
      <div className={styles['button-group']}>
        {isPaused ? (
          <Button
            name="Start"
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <Button
            name="Pause"
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Timer;
