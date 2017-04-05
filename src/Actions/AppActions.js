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
  console.log("appactions::query", query);
  // Listen to changes to the user's own playlists
  playlistsRef
      .orderByChild('name')
      .startAt(query)
      .endAt(query)
      .on('value', snap => {
      console.log(snap.val());
      });


  return {
    type: 'PLAYLIST_SEARCH',
    payload: {
      query: query
    }
  }
}