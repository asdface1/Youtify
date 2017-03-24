export function search(value) {
  return function(dispatcher) {
    fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        /*
        return {
          type: 'RESULTS',
          payload: {
            response
          }
        }
        */
      })
      .catch(error => {
        console.log('error', error);
      });
  }
}
