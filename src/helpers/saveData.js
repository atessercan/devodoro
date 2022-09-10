/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { addFirebaseDB, getFirebaseDB } from './firebase';

const saveData = (user, minutes) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const date = new Date();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const month = date.getMonth();
  const seconds = minutes * 60;
  if (user) {
    (async () => {
      const dbArray = await getFirebaseDB();
      if (
        dbArray[dayOfWeek].monthDay === dayOfMonth &&
        dbArray[dayOfWeek].month === month
      ) {
        dbArray[dayOfWeek].time += seconds;
      } else {
        dbArray[dayOfWeek].time = seconds;
        dbArray[dayOfWeek].monthDay = dayOfMonth;
        dbArray[dayOfWeek].month = month;
        dbArray[dayOfWeek].dayName = dayName;
      }
      await addFirebaseDB(dbArray);
    })();
  } else {
    (async () => {
      const lsArray = await JSON.parse(localStorage.getItem('stats'));
      console.log(lsArray);
      if (
        lsArray[dayOfWeek].monthDay === dayOfMonth &&
        lsArray[dayOfWeek].month === month
      ) {
        lsArray[dayOfWeek].time += seconds;
      } else {
        lsArray[dayOfWeek].time = seconds;
        lsArray[dayOfWeek].monthDay = dayOfMonth;
        lsArray[dayOfWeek].month = month;
        lsArray[dayOfWeek].dayName = dayName;
      }
      await localStorage.setItem('stats', JSON.stringify(lsArray));
    })();
  }
};

export default saveData;
