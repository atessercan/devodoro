import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import Title from '../../atoms/Text/Title';
import styles from './index.module.scss';

function Statistics() {
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
          <Bar dataKey="time" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
      <i>*Stats reset every Sunday.</i>
    </div>
  );
}

export default Statistics;
