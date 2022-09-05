import React, { useEffect, useState } from 'react';
import Header from './components/organisms/Header';
import Pomodoro from './components/organisms/Pomodoro';
import './styles/global.scss';
import 'animate.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });
  return (
    <div className="app">
      <div className={isLoading ? 'hidden' : 'visible'}>
        <Header />
        <Pomodoro />
      </div>
      <div className={isLoading ? 'visible' : 'hidden'}>
        <div className="animate__animated animate__backOutUp">DEVODORO</div>
      </div>
    </div>
  );
}

export default App;
