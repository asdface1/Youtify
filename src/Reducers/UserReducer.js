import * as firebase from 'firebase';

const initialState = {
  playlists: []
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
    default:
      return state;
  }
}
