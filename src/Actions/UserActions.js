export function update(name) {
  return {
    type: 'UPDATE',
    payload: {
      user: {
        name: name
      }
    }
  }
}
