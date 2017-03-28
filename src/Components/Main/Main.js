import React from 'react';
import { connect } from 'react-redux';
import './Main.css';
import * as firebase from 'firebase';

import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

import * as UserActions from '../../Actions/UserActions';

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

  onSignIn = () => {
    const rootRef = firebase.database().ref().child('youtify');
    const listRef = rootRef.child('playlists');
    listRef
        .orderByChild('ownerId')
        .startAt(this.props.user.uid)
        .endAt(this.props.user.uid)
        .on('value', snap => {
      console.log('snap', snap.val());
      const snapVal = snap.val();
      const playlists = Object.keys(snapVal).map(key => {
        return { ...snapVal[key], id: key };
      });
      console.log('playlists', playlists);
      this.props.dispatch(UserActions.setPlaylists(playlists));
    })
  }

  render() {
    if (this.props.user.uid) {
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
          <Login onSignIn={this.onSignIn} />
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
