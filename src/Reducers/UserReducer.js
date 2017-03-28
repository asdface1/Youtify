const initialState = {
  playlists: []
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, ...action.payload.user };
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload.playlists };
    default:
      return state;
  }
}
