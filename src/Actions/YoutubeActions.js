export function search(value) {
  return function(dispatch) {
    const { apiKey } = require('../../config.js');
    const params = `?part=snippet&maxResults=10&q=${value}&type=video&fields=items(snippet(channelId%2CchannelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Fdefault%2Ctitle))%2CnextPageToken%2CpageInfo%2CprevPageToken%2CtokenPagination&key=${apiKey}`;
    fetch(`https://www.googleapis.com/youtube/v3/search${params}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        dispatch({
          type: 'RESULTS',
          payload: {
            results: response
          }
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }
}
