import React, { useContext, useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from './index.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../../atoms/Button';
import SettingsContext from '../../../context/settings-context';

function Timer() {
  const settings = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sessionMode, setSessionMode] = useState('break');

  const secondsRef = useRef(seconds);
  const isPausedRef = useRef(isPaused);
  const sessionModeRef = useRef(sessionMode);
  const start = () => {
    setSeconds(settings.sessionDuration * 60);
  };

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
    console.log('settings changed, and useEffect run');
    start();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsRef.current === 0) {
        console.log('currentt : ', secondsRef.current);
        changeMode();

        setIsPaused(true);
        isPausedRef.current = true;
        return;
      }
      tick();
    }, 10);

    return () => clearInterval(interval);
  }, [settings]);

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
      {console.log(seconds)}
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
// import { CircularProgressbarStyles } from './types';
// export default function buildStyles({ rotation, strokeLinecap, textColor, textSize, pathColor, pathTransition, pathTransitionDuration, trailColor, backgroundColor, }: {
//     rotation?: number;
//     strokeLinecap?: any;
//     textColor?: string;
//     textSize?: string | number;
//     pathColor?: string;
//     pathTransition?: string;
//     pathTransitionDuration?: number;
//     trailColor?: string;
//     backgroundColor?: string;
// }): CircularProgressbarStyles;
