export function search(value) {
  return {
    type: 'SEARCH',
    payload: {
      search: value,
    }
  }
}