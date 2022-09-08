import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Title from '../../atoms/Text/Title';
import styles from './index.module.scss';
import Button from '../../atoms/Button';

function Statistics({ onClick }) {
  const localStorageArray = [];

  for (let i = 0; i < 7; i += 1) {
    const item = localStorage.getItem(i);
    if (item) {
      const parsedItem = JSON.parse(item);
      localStorageArray[i] = parsedItem;
      switch (i) {
        case 0:
          localStorageArray[i].weekDay = `Sunday\n${
            localStorageArray[i].monthDay
          }/${localStorageArray[i].month + 1}`;
          localStorageArray[i].time = Math.floor(
            localStorageArray[i].time / 60,
          );
          break;
        case 1:
          localStorageArray[i].weekDay = `Monday\n${
            localStorageArray[i].monthDay
          }/${localStorageArray[i].month + 1}`;
          localStorageArray[i].time = Math.floor(
            localStorageArray[i].time / 60,
          );
          break;
        case 2:
          localStorageArray[i].weekDay = `Tuesday\n${
            localStorageArray[i].monthDay
          }/${localStorageArray[i].month + 1}`;
          localStorageArray[i].time = Math.floor(
            localStorageArray[i].time / 60,
          );
          break;
        case 3:
          localStorageArray[i].weekDay = `Wednesday\n${
            localStorageArray[i].monthDay
          }/${localStorageArray[i].month + 1}`;
          localStorageArray[i].time = Math.floor(
            localStorageArray[i].time / 60,
          );
          break;
        case 4:
          localStorageArray[i].weekDay = `Thursday\n${
            localStorageArray[i].monthDay
          }/${localStorageArray[i].month + 1}`;
          localStorageArray[i].time = Math.floor(
            localStorageArray[i].time / 60,
          );
          break;
        case 5:
          localStorageArray[i].weekDay = `Friday\n${
            localStorageArray[i].monthDay
          }/${localStorageArray[i].month + 1}`;
          localStorageArray[i].time = Math.floor(
            localStorageArray[i].time / 60,
          );
          break;
        default:
          localStorageArray[i].weekDay = `Monday\n${
            localStorageArray[i].monthDay
          }/${localStorageArray[i].month + 1}`;
          localStorageArray[i].time = Math.floor(
            localStorageArray[i].time / 60,
          );
      }
    } else {
      localStorageArray[i] = {
        weekDay: undefined,
        monthDay: undefined,
        month: undefined,
        time: undefined,
      };
    }
  }
  return (
    <div className={styles.statistics}>
      <Title text="Statistics" />
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={localStorageArray}
          margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="weekDay" stroke="#8884d8" />
          <YAxis
            label={{
              value: 'minutes',
              angle: '-90',
              position: 'center',
              fill: '#8884d8',
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="time" barSize={30}>
            {localStorageArray.map((entry) => (
              <Cell
                fill={entry.monthDay === 6 ? 'green' : '#005599'}
                text="today"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className={styles.exclaimer}>
        <div className={styles['square-today']} />
        <span> Today</span>
      </div>
      <div className={styles.exclaimer}>
        <div className={styles['square-past']} />
        <span> Past</span>
      </div>
      <Button className={styles['close-button']} name="X" onClick={onClick} />
    </div>
  );
}

export default Statistics;
