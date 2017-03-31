import React, { Component } from 'react';
import './App.css';

import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <div id="App">
        <div className="flex flex-row flex-fill">
          <Sidebar {...this.props} />
          <Main {...this.props} />
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default App;
