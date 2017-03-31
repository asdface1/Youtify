import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import * as firebase from 'firebase';

import App from './App';

import store from './store';

var config = require('../config.js').firebaseConfig;

firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
