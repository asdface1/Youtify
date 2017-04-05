import * as firebase from 'firebase';

export function search(query) {
  return {
    type: 'SEARCH',
    payload: {
      query: query
    }
  }
}

export function playlistSearch(query, callback) {
  return function(dispatch) {
    const rootRef = firebase.database().ref().child('youtify');
    const playlistsRef = rootRef.child('playlists');

    // Listen to changes to the user's own playlists
    playlistsRef
      .orderByChild('nameLowerCase')
      .startAt(query)
      .endAt(query + '~')
      .once('value', snap => {

        // The playlists are returned as an object; convert it to an array
        const playlistsObject = snap.val();
        const playlists = Object.keys(playlistsObject).map(key => {
          return { ...playlistsObject[key], id: key };
        });
        playlists.forEach(playlist => {
          playlist.songs = convertObjectToArray(playlist.songs);
        });
        if (callback) {
          callback(playlists);
        }
      });
  }
}
export function setPlaylistSearchResults(results) {
  return {
    type: 'SET_PLAYLIST_SEARCH_RESULTS',
    payload: {
      results
    }
  }
}

export function setPlaylist(playlist) {
  return {
    type: 'SET_PLAYLIST',
    payload: {
      playlist
    }
  }
}

function convertObjectToArray(object) {
  object = object || {};
  return Object.values(object);
}
