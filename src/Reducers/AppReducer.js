
export default function reducer(state={}, action) {
  switch (action.type) {
    case 'SEACH_QUERY':
      return { ...state, query: action.payload.query }
    default:
      return state;
  }
}


