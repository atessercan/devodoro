import React from 'react';
import { FaBars } from 'react-icons/fa';
import logo from './logo.svg';
import './styles/global.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Application logo" width="100px" />
        <h1 className="app-title">DEVODORO</h1>
        <div className="menu">
          <FaBars />
        </div>
      </header>
      <p>This is a Text!</p>
    </div>
  );
}

export default App;
