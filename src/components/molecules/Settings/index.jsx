import React from 'react';
import Button from '../../atoms/Button';
import SelectPomodoro from '../../atoms/Select/SelectPomodoro';
import SelectBreak from '../../atoms/Select/SelectBreak';
import SelectTheme from '../../atoms/Select/SelectTheme';
import Title from '../../atoms/Text/Title';
import styles from './index.module.scss';

function Settings({ onClick, modalTitle }) {
  return (
    <div className={styles.wrapper}>
      <Title text={modalTitle} />
      <div className={styles.settings}>
        <div className={styles.options}>
          <div>
            <h2>Time</h2>
            <SelectPomodoro />
            <SelectBreak />
          </div>
          <div>
            <h2>UI</h2>
            <SelectTheme />
          </div>
        </div>
        <div className={styles['close-button']} />
      </div>
      <div className={styles['close-button']}>
        <Button name="X" onClick={onClick} />
      </div>
    </div>
  );
}

export default Settings;
