import * as firebase from 'firebase';

export function search(query) {
  return {
    type: 'SEARCH',
    payload: {
      query: query
    }
  }
}

/**
 * Searches for playlists in Firebase.
 * @param query    - Search query
 * @param callback - Function to call after the search is done.
 */
export function playlistSearch(query, callback) {
  return function(dispatch) {
    const rootRef = firebase.database().ref().child('youtify');
    const playlistsRef = rootRef.child('playlists');

    // Listen to changes to the user's own playlists
    playlistsRef
      .orderByChild('nameLowerCase')
      .startAt(query.toLowerCase())
      .endAt(query.toLowerCase() + '~')
      .once('value', snap => {

        // The playlists are returned as an object; convert it to an array
        const playlistsObject = snap.val();
        const playlists = Object.keys(playlistsObject || {}).map(key => {
          return { ...playlistsObject[key], id: key };
        });
        const publicPlaylists = playlists.filter((playlist) =>  playlist.public);
        publicPlaylists.forEach(playlist => {
          playlist.songs = convertObjectToArray(playlist.songs);
        });
        dispatch({
          type: 'SEARCH',
          payload: {
            query
          }
        });
        if (callback) {
          callback(publicPlaylists);
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

/**
 * Converts an object to an array.
 * @param object - The object to convert.
 */
function convertObjectToArray(object) {
  object = object || {};
  return Object.values(object);
}
