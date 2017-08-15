import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import HashtagCountList from './components/HashtagCountList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cliente: HashtagCount</h2>
        </div>
        <HashtagCountList/>
      </div>
    );
  }
}

export default App;
