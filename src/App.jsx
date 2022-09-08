import React, { useEffect, useState, useMemo } from 'react';
import Header from './components/organisms/Header';
import Pomodoro from './components/organisms/Pomodoro';
import './styles/global.scss';
import 'animate.css';
import AuthContext from './context/auth-context';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
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
