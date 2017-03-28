import * as firebase from 'firebase';

const initialState = {
  playlists: [],
  favorites: []
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, ...action.payload.user };
    case 'SIGN_OUT':
      firebase.auth().signOut();
      return initialState;
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload.playlists };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload.favorites };
    case 'ADD_TO_PLAYLIST':
      console.log(action.payload.song);
      return {
        ...state,
        playlists: state.playlists.map(playlist => {
          if(playlist.id===action.payload.playlistId) {
            return {...playlist, song: playlist.song.concat(action.payload.song)}
          } else {
            return {...playlist, song: playlist.song};
          }
        })
      }
    default:
      return state;
  }
}
