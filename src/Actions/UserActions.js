export function update(name) {
  return {
    type: 'UPDATE',
    payload: {
      user: {
        name: name
      }
    }
  }

}
export function signIn(user) {
  return {
    type: 'SIGN_IN',
    payload: {
      user: user
    }
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
