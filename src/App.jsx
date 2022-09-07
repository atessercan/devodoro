import React, { useEffect, useState } from 'react';
import Header from './components/organisms/Header';
import Pomodoro from './components/organisms/Pomodoro';
import './styles/global.scss';
import 'animate.css';
import AuthContext from './context/auth-context';
import app from './helpers/firebase';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth.onAuthStateChanged(setCurrentUser);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });
  return (
    <AuthContext.Provider value={(currentUser, setCurrentUser)}>
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
