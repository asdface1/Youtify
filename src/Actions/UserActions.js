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
export function addToFavorites(favorites) {
  return {
    type: 'SET_FAVORITES',
    payload: {
      favorites
    }
  }
}
export function emptyFavorites() {
  return {
    type: 'SET_FAVORITES'
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
