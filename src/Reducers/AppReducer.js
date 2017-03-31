
export default function reducer(state={}, action) {
  switch (action.type) {
    case 'SEARCH_QUERY':
      console.log("appreducer::query", action.payload.query);
      return { ...state, query: action.payload.query }
    default:
      return state;
  }
}


