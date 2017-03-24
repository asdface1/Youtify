export function setPlayer(value) {
  return {
    type: 'SEARCH',
    payload: {
      search: value,
    }
  }
}