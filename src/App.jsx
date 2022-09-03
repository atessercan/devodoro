import React from 'react';
import Header from './components/organisms/Header';
import Pomodoro from './components/organisms/Pomodoro';
import './styles/global.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Pomodoro />
    </div>
  );
}

export default App;
