const initialState = {
  results: {
    items: []
  }
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SEARCH':
      return { ...state, results: action.payload.results }
    case 'VIDEOS':
      return { ...state, videos: action.payload.videos };
    default:
      return state;
  }
}
