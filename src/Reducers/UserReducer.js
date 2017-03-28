export default function reducer(state={}, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, ...action.payload.user };
    default:
      return state;
  }
}
