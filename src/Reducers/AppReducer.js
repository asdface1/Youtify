const initialState = {
  results: [],
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SEARCH_QUERY':
      return { ...state, query: action.payload.query }
    case 'PLAYLIST_SEARCH':
      return { ...state, results: action.payload.playlists };
    case 'SET_PLAYLIST_SONGS':
      return { ...state, results: action.payload.playlists };
    default:
      return state;
  }
}

