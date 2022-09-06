import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from './index.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../../atoms/Button';
import SettingsContext from '../../../context/settings-context';
import useLocalStorage from '../../../hooks/useLocalStorage';

function Timer() {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const dateObj = { dayOfWeek, dayOfMonth };
  const [, setStatsLS] = useLocalStorage(dateObj, {});
  const settings = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sessionMode, setSessionMode] = useState('break');

  const secondsRef = useRef(seconds);
  const isPausedRef = useRef(isPaused);
  const sessionModeRef = useRef(sessionMode);

  const tick = () => {
    secondsRef.current -= 1;
    setSeconds(secondsRef.current);
  };

  const changeMode = useCallback(() => {
    const next = sessionModeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds =
      next === 'work'
        ? settings.sessionDuration * 60
        : settings.breakDuration * 60;

    setSessionMode(next);
    sessionModeRef.current = next;
    setSeconds(nextSeconds);
    secondsRef.current = nextSeconds;
  }, [settings.breakDuration, settings.sessionDuration]);

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
      if (secondsRef.current === 1) {
        if (sessionModeRef.current === 'work') {
          const syncLS = async () => {
            let prevStat = 0;
            const item = await localStorage.getItem(dayOfWeek);
            if (item) {
              const stat = await JSON.parse(item);
              if (stat.monthDay !== dayOfMonth) {
                await localStorage.removeItem(dayOfWeek);
                prevStat = 0;
              } else {
                prevStat = await stat.time;
              }
            }
            const newTime = prevStat + settings.sessionDuration * 60;
            const currentStat = {
              weekDay: dayOfWeek,
              monthDay: dayOfMonth,
              month,
              time: newTime,
            };
            await setStatsLS(currentStat);
          };
          syncLS();
        }
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, dayOfMonth, dayOfWeek, changeMode]);

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
