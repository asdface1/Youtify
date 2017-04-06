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
    case 'EMPTY_FAVORITES':
      return { ...state, favorites: [] };
    case 'ADD_TO_FAVORITES':
      var found = false;
      const newFavorites = state.favorites.map(favorite => {
        if(favorite.id===action.payload.favorite.id){
          found = true;
          return action.payload.favorite;
        }
        else {
          return favorite
        }
      })
      if(!found)
        return { ...state, favorites: [ ...state.favorites, action.payload.favorite ] };
      else
        return { ...state, favorites: newFavorites };
    case 'ADD_TO_PLAYLIST':
      console.log(action.payload.song);
      return {
        ...state,
        playlists: state.playlists.map(playlist => {
          if (playlist.id === action.payload.playlistId) {
            return { ...playlist, songs: playlist.songs.concat(action.payload.song) }
          } else {
            return { ...playlist, songs: playlist.songs };
          }
        })
      }
    default:
      return state;
  }
}
