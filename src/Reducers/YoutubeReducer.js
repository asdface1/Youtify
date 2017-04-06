const initialState = {
  results: {
    items: [],
    fetching: false
  }
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SEARCH':
      return { ...state, results: action.payload.results, fetching: false }
    case 'FETCH':
      return { ...state, results: initialState.results, fetching: true };
    default:
      return state;
  }
}
