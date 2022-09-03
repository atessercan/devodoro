import React, { useEffect } from 'react';
import setAnimationDuration from '../../../helpers/setAnimationDuration';
import setTime from '../../../helpers/setTime';
import styles from './index.module.scss';

function Timer() {
  useEffect(() => {
    const fiveMinutes = 60 * 5;
    const display = document.getElementById('lazy');
    setAnimationDuration(fiveMinutes);
    setTime(fiveMinutes, display);
  }, []);

  return (
    <div>
      <div className={styles['timer-group']}>
        <div className={`${styles.timer} ${styles.minute}`}>
          <div className={styles.hand}>
            <span id="hand1" />
          </div>
          <div className={styles.hand}>
            <span id="hand2" />
          </div>
        </div>
        <div className={styles.face} id="face">
          <h2>Stay Focused</h2>
          <div id="lazy" className={styles.clock} />
        </div>
      </div>
    </div>
  );
}

export default Timer;
