import React from 'react';
import { connect } from 'react-redux';
import './Main.css';
import * as firebase from 'firebase';

import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

import * as AppActions from '../../Actions/AppActions';
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

    // Listen to changes to the user's own playlists
    playlistsRef
        .orderByChild('ownerId')
        .startAt(this.props.user.uid)
        .endAt(this.props.user.uid)
        .on('value', snap => {

      // The playlists are returned as an object; convert it to an array
      const playlistsObject = snap.val();
      const playlists = Object.keys(playlistsObject).map(key => {
        return { ...playlistsObject[key], id: key };
      });

      // Convert the songs object of each playlist to an array
      playlists.forEach(playlist => {
        if (!playlist.songs) {
          playlist.songs = [];
        } else {
          playlist.songs = Object.values(playlist.songs).map(id => id);
        }
      });

      console.log('playlists', playlists);

      // Fetch song details for all songs in all playlists with the Youtube API
      this.props.dispatch(YoutubeActions.fetchSongDetails(playlists));
    });

    // Listen to changes to playlist that the user follows
    var favorites = [];
    rootRef.child('users').child(this.props.user.uid).child('favorites').on('value', snap => {
      snap.val().forEach(id => {
        playlistsRef.child(id).on('value', snap1 => {
          favorites.push({ ...snap1.val(), id: id });
        });
      });
      this.props.dispatch(UserActions.setFavorites(favorites));
    });
  }

  render() {
    if (this.props.user.uid) {
      return (
        <div id="Main">
          <Navbar user={{ name: this.props.user.name || this.props.user.email }} />
          <Search
              label="Search results for:"
              if(this.props.location.pathname==="/search"){
                title=this.props.app.query
                results={this.props.youtube.results.items} 
              }
              if(this.props.location.pathname==="/playlist"){
                var url = this.props.location.hash.slice(1);
                title=this.props.user.playlists[url].name
                results={this.props.user.playlists[url].songs} 
              }
              if(this.props.location.pathname==="/channel"){
                image="//yt3.ggpht.com/GPTRffZJ1dgjac5CN90pwxhMzYjZSh5iC5JnlQVPickZiW3gP6B6GiUsGnjoMkbz8kXu1CpZOjs=w2120-fcrop64=1,00005a57ffffa5a8-nd-c0xffffffff-rj-k-no"

                title=this.props.youtube.results.item.channelTitle
                results={this.props.youtube.results.item} 
              }

             />
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
    app: store.app,
    user: store.user,
    youtube: store.youtube,
  }
})(Main);
