export function signIn(user) {
  return {
    type: 'SIGN_IN',
    payload: {
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName
      }
    }
  }
}
export function signOut() {
  return {
    type: 'SIGN_OUT'
  }
}
export function setPlaylists(array) {
  return {
    type: 'SET_PLAYLISTS',
    payload: {
      playlists: array
    }
  }
}
export function addToFavorites(favorite) {
  return {
    type: 'ADD_FAVORITES',
    payload: {
      favorite
    }
  }
}
export function emptyFavorites() {
  return {
    type: 'EMPTY_FAVORITES'
  }
}
export function addToPlaylist(song, playlistId) {
  console.log("UserAction.js::song", song);
  return {
    type: 'ADD_TO_PLAYLIST',
    payload: {
      song: song,
      playlistId: playlistId
    }
  }
}
