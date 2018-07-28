import * as React from 'react';
import './App.css';
import { double } from './utils/math';

import logo from './logo.svg';

class App extends React.Component {
  render() {
    console.log(double(5));
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spinny</h1>
        </header>
      </div>
    );
  }
}

export default App;
