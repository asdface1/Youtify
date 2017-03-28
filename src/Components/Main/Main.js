import React from 'react';
import { connect } from 'react-redux';
import './Main.css';
import * as firebase from 'firebase';

import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

class Main extends React.Component {
  constructor() {
    super();
    this.state = { user: false };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user);
      this.setState({ user: user ? true : false });
    });
  }

  render() {
    if (this.state.user) {
      return (
        <div id="Main">
          <Navbar user={{ name: this.props.user.displayName || this.props.user.email }} />
          <Search
            label="Search results for:"
            title="Katy Perry"
            image="//yt3.ggpht.com/GPTRffZJ1dgjac5CN90pwxhMzYjZSh5iC5JnlQVPickZiW3gP6B6GiUsGnjoMkbz8kXu1CpZOjs=w2120-fcrop64=1,00005a57ffffa5a8-nd-c0xffffffff-rj-k-no"
            results={this.props.youtube.results.items} />
        </div>
      )
    } else {
      return (
        <div id="Main">
          <Login />
        </div>
      )
    }
  }
}

export default connect(store => {
  return {
    user: store.user,
    youtube: store.youtube,
  }
})(Main);
