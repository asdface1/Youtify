import * as firebase from 'firebase';

export function search(query) {
  return {
    type: 'SEARCH_QUERY',
    payload: {
      query: query
    }
  }
}

export function playlistSearch(query, callback) {
  return function(dispatch) {
  const rootRef = firebase.database().ref().child('youtify');
  const playlistsRef = rootRef.child('playlists');
  var playlists = [];

  // Listen to changes to the user's own playlists
  playlistsRef
      .orderByChild('nameLowerCase')
      .startAt(query)
      .endAt(query + '~')
      .once('value', snap => {

        // The playlists are returned as an object; convert it to an array
        const playlistsObject = snap.val();
        playlists = Object.keys(playlistsObject).map(key => {
          return { ...playlistsObject[key], id: key };
        });
        playlists.forEach(playlist => {
          playlist.songs = convertObjectToArray(playlist.songs);
        });
        console.log("appactions::playlists", {...playlists});
        /*dispatch({
          type: 'PLAYLIST_SEARCH',
          payload: {
            playlists: playlists
          }
        });*/
        if(callback) callback(playlists);
      });
  }
}
export function setPlaylistSongs(playlists) {
  console.log("appactions::playlists", playlists);
  return {
    type: 'SET_PLAYLIST_SONGS',
    payload: {
      playlists: playlists
    }
  }
}

function convertObjectToArray(object) {
  object = object || {};
  return Object.values(object);
}
