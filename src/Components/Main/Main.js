import React from 'react';
import { connect } from 'react-redux';
import './Main.css';
import * as firebase from 'firebase';

import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';

import * as UserActions from '../../Actions/UserActions';
import * as YoutubeActions from '../../Actions/YoutubeActions';

class Main extends React.Component {
  componentDidMount() {
    this.props.dispatch(YoutubeActions.getTrends());

    this.rootRef = firebase.database().ref().child('youtify');
    this.playlistsRef = this.rootRef.child('playlists');
    this.usersRef = this.rootRef.child('users');

    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      console.log('user', user);
      if (user) {
        this.props.dispatch(UserActions.signIn(user));
        this.onSignIn();
      } else {
        auth.signInAnonymously();
      }
    });
  }

  onSignIn = () => {
    // Listen to changes to the user's own playlists
    this.playlistsRef
        .orderByChild('ownerId')
        .startAt(this.props.user.uid)
        .endAt(this.props.user.uid)
        .on('value', snap => {

      // The playlists are returned as an object; convert it to an array
      const playlistsObject = snap.val();
      const playlists = Object.keys(playlistsObject || {}).map(key => {
        return { ...playlistsObject[key], id: key };
      });

      // Convert the songs object of each playlist to an array
      playlists.forEach(playlist => {
        playlist.songs = convertObjectToArray(playlist.songs);
      });

      // Fetch song details for all songs in all playlists with the Youtube API
      this.props.dispatch(YoutubeActions.fetchSongDetails(
        playlists,
        (res) => this.props.dispatch(UserActions.setPlaylists(res))
      ));
    });

    window.ref = this.usersRef
      .child(this.props.user.uid)
      .child('favorites');

    // Listen to changes to playlist that the user follows
    this.usersRef
        .child(this.props.user.uid)
        .child('favorites')
        .on('value', snap => {

      // Update song details for all favorite playlists
      console.log('favorite snap', snap.val());
      const favorites = Object.values(snap.val() || {}).map(fav => fav.id);
      this.props.dispatch(UserActions.emptyFavorites());
      favorites.forEach(id => {
        this.playlistsRef.child(id).on('value', snap1 => {
          if (!snap1.val()) return;
          // Convert the songs object of each playlist to an array
          const favorite = { ...snap1.val(), id: id };
          favorite.songs = convertObjectToArray(favorite.songs);
          // Fetch song details for all songs in all playlists with the Youtube API
          this.props.dispatch(YoutubeActions.fetchSongDetails(
            [favorite],
            (res) => this.props.dispatch(UserActions.addToFavorites(res[0]))
          ));
        });
        this.playlistsRef.child(id).on('child_removed', snap1 => {
          console.log('snap1', snap1.ref.parent.key);
          // const newFavorites = this.props.user.favorites
          //   .filter(fav => fav.id !== snap1.ref.parent.key)
          //   .map(fav => fav.id);
          //
          // console.log('newFavorites', newFavorites);
          // console.log('other', ['asd', 'aijsij']);
          this.usersRef
            .child(this.props.user.uid)
            .child('favorites')
            .orderByChild('id')
            .startAt(snap1.ref.parent.key)
            .endAt(snap1.ref.parent.key)
            .once('value', snap => {
              const favoriteToRemove = snap.val();
              console.log('favorite to remove', favoriteToRemove);
              if (Object.keys(favoriteToRemove || {}).length > 0) {
                snap.child(Object.keys(favoriteToRemove)[0]).child('id').ref.remove();
              }
            });
        });
      });
    });
  }

  render() {
    const { user } = this.props;
    var { pathname, hash } = this.props.location;
    hash = hash.slice(1);
    var type, label, title, results = [], bannerImage = "", thumbnail = "";
    switch (pathname) {
      case '/':
        type = "welcome";
        label = "Welcome";
        title = "Trending";
        results = this.props.youtube.results.items;
        break;
      case '/search':
        type = "search";
        label = "Search results for:";
        title = `"${this.props.app.query || ''}"`;
        results = this.props.youtube.results.items;
        break;
      case '/playlistSearch':
        type = "playlistSearch";
        label = "Search results for:";
        title = `"${this.props.app.query || ''}"`;
        results = this.props.app.results || [];
        break;
      case '/playlist':
        type = "playlist";
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
        type = "channel";
        label = "Channel";
        if (this.props.youtube.results.items.length) {
          title = this.props.youtube.results.items[0].snippet.channelTitle;
          bannerImage = this.props.youtube.results.bannerImage;
          thumbnail = this.props.youtube.results.thumbnail;
        }
        results = this.props.youtube.results.items;
        break;
      case '/queue':
        type = "queue";
        label = "Queue";
        title = "Now playing";
        if (this.props.video.song && this.props.video.song.id && this.props.video.song.id.videoId) {
          results = [this.props.video.song].concat(this.props.video.prioQueue).concat((this.props.video.queue || []).slice(this.props.video.song.current + 1));
        }
        if (this.props.video.repeat) {
          results = results.concat(this.props.video.queue.slice(0, this.props.video.song.current))
        }
        results = results || [];
        break;
      default:
    }

    return (
      <div id="Main">
        <Navbar
          {...this.props}
          onSignIn={this.onSignIn}/>
        <Search
          {...this.props}
          type={type}
          label={label}
          title={title}
          bannerImage={bannerImage}
          thumbnail={thumbnail}
          results={results}>
        </Search>
      </div>
    )
  }
}

export default connect(store => {
  return {
    app: store.app,
    user: store.user,
    video: store.video,
    youtube: store.youtube,
  }
})(Main);

function convertObjectToArray(object) {
  object = object || {};
  return Object.values(object);
}
