const initialState = {
  results: [],
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SEARCH_QUERY':
      return { ...state, query: action.payload.query }
    case 'PLAYLIST_SEARCH':
      return { ...state, results: action.payload.playlists };
    case 'PLAYLIST_SEARCH_SONGS':
      return {
        ...state,
        results: state.results.map((result, i) => {
          result.songs = action.payload[i].songs[i]
       })
      }
    default:
      return state;
  }
}

