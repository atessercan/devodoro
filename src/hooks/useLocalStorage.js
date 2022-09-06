import { useState } from 'react';

const useLocalStorage = (keyObj, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(keyObj.dayOfWeek);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setLocalStorageState = (newState) => {
    try {
      const newStateValue =
        newState === 'function' ? newState(state) : newState;
      setState(newStateValue);
      localStorage.setItem(keyObj.dayOfWeek, JSON.stringify(newStateValue));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Unable to store new value for ${keyObj.dayOfWeek} in localStorag.`,
      );
    }
  };
  return [state, setLocalStorageState];
};

export default useLocalStorage;
