export function search(query) {
  return {
    type: 'SEARCH_QUERY',
    payload: {
      query: query
    }
  }
}