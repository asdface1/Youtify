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

    // Listen to changes to the user's own playlists
    const playlistsRef = rootRef.child('playlists');
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
        playlist.songs = convertObjectToArray(playlist.songs);
      });

      console.log('playlists', playlists);

      // Fetch song details for all songs in all playlists with the Youtube API
      this.props.dispatch(YoutubeActions.fetchSongDetails(
        playlists,
        (res) => this.props.dispatch(UserActions.setPlaylists(res))
      ));
    });

    // Listen to changes to playlist that the user follows
    const usersRef = rootRef.child('users');
    usersRef
        .child(this.props.user.uid)
        .child('favorites')
        .on('value', snap => {

      // Update song details for all favorite playlists
      snap.val().forEach(id => {
        playlistsRef.child(id).on('value', snap1 => {
          // Convert the songs object of each playlist to an array
          const favorite = { ...snap1.val(), id: id };
          favorite.songs = convertObjectToArray(favorite.songs);

          // Fetch song details for all songs in all playlists with the Youtube API
          this.props.dispatch(YoutubeActions.fetchSongDetails(
            [favorite],
            (res) => this.props.dispatch(UserActions.setFavorites(res))
          ));
        });
      });
    });
  }

  render() {
    if (this.props.user.uid) {
      const { user } = this.props;
      const { pathname, hash } = this.props.location;
      hash = hash.slice(1);
      var label, title, results = [], image = "";
      switch (pathname) {
        case '/search':
          label = "Search results for:";
          title = `"${this.props.app.query || ''}"`;
          results = this.props.youtube.results.items;
          break;
        case '/playlist':
          if (user.playlists.length) {
            label = "Playlist";
            user.playlists.concat(user.favorites).forEach(playlist => {
              if (playlist.id === hash) {
                title = playlist.name;
                results = playlist.songs;
              }
            });
            title = title || "";
            results = results || [];
          } else {
            label = "Playlist not found";
            results = [];
          }
          break;
        case '/channel':
          label = "Channel";
          if (this.props.youtube.results.items.length) {
            title = this.props.youtube.results.items[0].snippet.channelTitle;
          }
          image = "//yt3.ggpht.com/GPTRffZJ1dgjac5CN90pwxhMzYjZSh5iC5JnlQVPickZiW3gP6B6GiUsGnjoMkbz8kXu1CpZOjs=w2120-fcrop64=1,00005a57ffffa5a8-nd-c0xffffffff-rj-k-no";
          results = this.props.youtube.results.items;
          break;
      }

      return (
        <div id="Main">
          <Navbar
            user={{ name: this.props.user.name || this.props.user.email }}
            history={this.props.history} />
          <Search
            label={label}
            title={title}
            image={image}
            results={results} />
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

function convertObjectToArray(object) {
  object = object || {};
  return Object.values(object);
  // return Object.keys(object).map(key => {
  //   return { id: object[key], key: key };
  // });
}
