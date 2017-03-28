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
export function signIn(user) {
  return {
    type: 'SIGN_IN',
    payload: {
      user: user
    }
  }

}
