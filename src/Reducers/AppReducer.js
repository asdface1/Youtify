
export default function reducer(state={}, action) {
  switch (action.type) {
    case 'SEARCH_QUERY':
      return { ...state, query: action.payload.query }
    case 'PLAYLIST_SEARCH':
      return state;
    default:
      return state;
  }
}

