const initialState = {
  results: []
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SEARCH':
      return { ...state, query: action.payload.query };
    case 'SET_PLAYLIST_SEARCH_RESULTS':
      return { ...state, results: action.payload.results };
    default:
      return state;
  }
}
