/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState, useMemo } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Helmet } from 'react-helmet';
import Header from './components/organisms/Header';
import Pomodoro from './components/organisms/Pomodoro';
import './styles/global.scss';
import 'animate.css';
import AuthContext from './context/auth-context';
import ThemeContext from './context/theme-context';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [, setLocalS] = useLocalStorage('stats', []);
  const [theme, setTheme] = useState('night');

  const authValues = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser, setCurrentUser],
  );

  const themeValues = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
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
      setLocalS(lsArray);
    }
  }, [setLocalS]);

  return (
    <ThemeContext.Provider value={themeValues}>
      <AuthContext.Provider value={authValues}>
        <div className={theme === 'night' ? 'app-dark' : 'app-light'}>
          <div className={isLoading ? 'hidden' : 'visible'}>
            <Header />
            <Pomodoro />
          </div>
          <div className={isLoading ? 'visible' : 'hidden'}>
            <div className="animate__animated animate__backOutUp">DEVODORO</div>
          </div>
        </div>
        <Helmet>
          <style>{`body { background-color: ${
            theme === 'night' ? '#282c34' : '#fefefe'
          }; }`}</style>
        </Helmet>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
