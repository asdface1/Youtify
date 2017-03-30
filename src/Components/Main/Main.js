import React from 'react';
import { connect } from 'react-redux';
import './Main.css';
import * as firebase from 'firebase';

import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

import * as UserActions from '../../Actions/UserActions';
import * as YoutubeActions from '../../Actions/YoutubeActions';
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
  updateUserPlaylists = () => {
    console.log("main::youtube", this.props.youtube);
    this.props.user.playlists[0].song=this.props.youtube.videos.items;

  }
  onSignIn = () => {
    const rootRef = firebase.database().ref().child('youtify');
    const playlistsRef = rootRef.child('playlists');
    playlistsRef
        .orderByChild('ownerId')
        .startAt(this.props.user.uid)
        .endAt(this.props.user.uid)
        .on('value', snap => {
      console.log('snap', snap.val());
      const snapVal = snap.val();
      const playlists = Object.keys(snapVal).map(key => {
        return { ...snapVal[key], id: key };
      });
      var urlString = "";
      playlists[0].song.forEach(function(id){
        urlString+=(","+id);
      });
      console.log("main::playlists", playlists);
      this.props.dispatch(YoutubeActions.getVideos(urlString, playlists, this.updateUserPlaylists));

      var favorites = [];
      rootRef
          .child('users')
          .child(this.props.user.uid)
          .child('favorites')
          .on('value', snap => {
        snap.val().forEach(id => {
          playlistsRef.child(id).on('value', snap1 => {
            favorites.push({ ...snap1.val(), id: id });
          });
        });
        this.props.dispatch(UserActions.setFavorites(favorites));
      });
    });
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
