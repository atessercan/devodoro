import React, { useContext, useState, useEffect } from 'react';
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
import { getFirebaseDB } from '../../../helpers/firebase';
import AuthContext from '../../../context/auth-context';

function Statistics({ onClick }) {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const date = new Date();
  const today = date.getDate();
  useEffect(() => {
    let arr = [];
    if (currentUser) {
      (async () => {
        arr = [...(await getFirebaseDB())];
        setData(arr);
      })();
    } else {
      (async () => {
        arr = [...(await JSON.parse(localStorage.getItem('stats')))];
        setData(arr);
      })();
    }
  }, [currentUser]);
  return (
    <div className={styles.statistics}>
      <Title text="Statistics" />
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey={(v) =>
              `${v.dayName ? v.dayName : ''} ${v.monthDay ? v.monthDay : ''} ${
                v.dayName && v.monthDay && v.month ? '/' : ''
              } ${v.month ? v.month + 1 : ''}`
            }
            stroke="#8884d8"
          />
          <YAxis
            label={{
              value: 'minutes',
              angle: '-90',
              position: 'center',
              fill: '#ffffff99',
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey={(v) => v.time / 60} barSize={30}>
            {data.map((entry) => (
              <Cell
                key={Math.random()}
                fill={entry.monthDay === today ? 'green' : '#005599'}
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
