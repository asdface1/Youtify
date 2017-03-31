import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <div id="App">
        <div className="flex flex-row flex-fill">
          <Sidebar />
          <Router>
            <Route path="/" component={Main} />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
