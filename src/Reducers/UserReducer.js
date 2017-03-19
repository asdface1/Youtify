export default function reducer(state={}, action) {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.payload.user };
    default:
      return state;
  }
}
