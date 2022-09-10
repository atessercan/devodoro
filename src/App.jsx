/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState, useMemo } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from './components/organisms/Header';
import Pomodoro from './components/organisms/Pomodoro';
import './styles/global.scss';
import 'animate.css';
import AuthContext from './context/auth-context';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [, setLocalS] = useLocalStorage('stats', []);
  const authValues = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser, setCurrentUser],
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.displayName);
      } else {
        setCurrentUser(null);
      }
    });
    const item = localStorage.getItem('stats');
    if (!item) {
      const lsArray = [
        ...new Array(7).fill({}).map(() => ({
          time: null,
          month: null,
          monthDay: null,
          dayName: null,
        })),
      ];
      console.log(lsArray);
      setLocalS(lsArray);
    }
  }, []);

  return (
    <AuthContext.Provider value={authValues}>
      <div className="app">
        <div className={isLoading ? 'hidden' : 'visible'}>
          <Header />
          <Pomodoro />
        </div>
        <div className={isLoading ? 'visible' : 'hidden'}>
          <div className="animate__animated animate__backOutUp">DEVODORO</div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
