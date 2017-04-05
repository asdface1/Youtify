import * as firebase from 'firebase';

export function search(query) {
  return {
    type: 'SEARCH_QUERY',
    payload: {
      query: query
    }
  }
}
export function playlistSearch(query) {
  const rootRef = firebase.database().ref().child('youtify');
  const playlistsRef = rootRef.child('playlists');
  var playlists = [];
  console.log("appactions::query", query);
  // Listen to changes to the user's own playlists
  playlistsRef
      .orderByChild('nameLowerCase')
      .startAt(query)
      .endAt(query + '~')
      .on('value', snap => {
        // The playlists are returned as an object; convert it to an array
        const playlistsObject = snap.val();
        playlists = Object.keys(playlistsObject).map(key => {
          return { ...playlistsObject[key], id: key };
        });
      });

  return {
    type: 'PLAYLIST_SEARCH',
    payload: {
      playlists: playlists
    }
  }
}