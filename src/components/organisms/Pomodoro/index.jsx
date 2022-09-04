import React from 'react';
import ButtonGroup from '../../molecules/ButtonGroup';
import PomoNav from '../../molecules/PomoNav';
import Timer from '../../molecules/Timer';
import styles from './index.module.scss';

function Pomodoro() {
  return (
    <div className={styles['pomodoro-section']}>
      <PomoNav />
      <Timer />
      <hr style={{ width: '40%' }} />
      <ButtonGroup />
    </div>
  );
}

export default Pomodoro;
