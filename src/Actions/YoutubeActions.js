const { apiKey } = require('../../config.js');
const baseUrl = 'https://www.googleapis.com/youtube/v3';

export function search(query) {
  return function(dispatch) {
    console.log("youtubeactions::query", query);
    dispatch({
      type: 'FETCH'
    });
    var params = "";
    if (query.req === "songs") {
      params = `part=snippet&q=${query.text}&maxResults=40&type=video&fields=items(id%2FvideoId%2Csnippet(channelId%2CchannelTitle%2CpublishedAt%2Cthumbnails%2Fmedium%2Ctitle))%2CnextPageToken%2CpageInfo%2CprevPageToken%2CtokenPagination&key=${apiKey}`;
    } else if(query.req === "channel") {
      params = `part=snippet&channelId=${query.text}&maxResults=40&type=video&fields=items(id%2FvideoId%2Csnippet(channelId%2CchannelTitle%2CpublishedAt%2Cthumbnails%2Fmedium%2Ctitle))%2CnextPageToken%2CpageInfo%2CprevPageToken%2CtokenPagination&key=${apiKey}`;
    }
    fetch(`${baseUrl}/search?${params}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        //console.log('response', response);
        dispatch({
          type: 'SEARCH',
          payload: {
            query: query.text,
            results: response
          }
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }
}

export function getChannel(id) {
  return function(dispatch) {
    const params = `part=contentDetails&id=${id}=${apiKey}`
    fetch(`${baseUrl}/channels?${params}`)
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        // dispatch({
        //   type: 'SEARCH',
        //   payload: {
        //     query: query.text,
        //     results: response
        //   }
        // });
      })
      .catch(error => {
        console.log('error', error);
      });
  }
}

export function fetchSongDetails(playlists, callback) {
  return function(dispatch) {
    console.log("youtubeactions::playlists", playlists);
    // Batch ids from all playlist into one comma-separated string
    const batchedIds = playlists.map(playlist => {
      return playlist.songs.join();
    }).filter(id => id).join();

    const params = `?part=snippet&id=${batchedIds}&fields=items(id%2Csnippet(channelId%2CchannelTitle%2Cthumbnails%2Fmedium%2Ctitle))&key=${apiKey}`;
    fetch(`https://www.googleapis.com/youtube/v3/videos${params}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
      console.log('response', response);

      // Update 'id' field of response to match response from youtube/v3/search
      response.items.forEach(item => {
        item.id = { videoId: item.id };
      });

      // Update each playlist with song information
      var currentIndex = 0;
      playlists.forEach(playlist => {
        playlist.songs = response.items.slice(currentIndex, currentIndex + playlist.songs.length);
        currentIndex += playlist.songs.length;
      });

      if (callback) {
        callback(playlists);
      }
    })
    .catch(error => {
      console.log('error', error)
    })
  }
}
