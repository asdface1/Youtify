export function search(value) {
  return function(dispatcher) {
    const params = `?part=snippet&maxResults=10&q=${value}&type=video&fields=items(snippet(channelId%2CchannelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Fdefault%2Ctitle))%2CnextPageToken%2CpageInfo%2CprevPageToken%2CtokenPagination&key={YOUR_API_KEY}`;
    fetch(`https://www.googleapis.com/youtube/v3/search${params}`, {
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
