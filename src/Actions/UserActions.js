export function signIn(user) {
  return {
    type: 'SIGN_IN',
    payload: {
      user: user
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
