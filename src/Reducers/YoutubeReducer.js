const initialState = {
  results: []
};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'RESULT':
      return {...state, results: action.payload.result};
    default:
      return state;
  }
}
