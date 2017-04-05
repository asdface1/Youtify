export function search(query) {
  return {
    type: 'SEARCH_QUERY',
    payload: {
      query: query
    }
  }
}
export function playlistSearch(query) {
  return {
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
    type: 'PLAYLIST_SEARCH',
    payload: {
      query: query
    }
  }
}