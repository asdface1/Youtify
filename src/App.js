import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Player from './Components/Player/Player';
import Sidebar from './Components/Sidebar/Sidebar';


class App extends Component {
  render() {
    return (
      <div className="App">
        {<Player />
        /*<div>
          <Sidebar />
          <Main />
        </div>
        <Footer />*/}
      </div>
    );
  }
}

export default App;
