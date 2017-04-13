const { apiKey } = require('../../config.js');
const baseUrl = 'https://www.googleapis.com/youtube/v3';

export function search(query) {
  return function(dispatch) {
    dispatch({
      type: 'FETCH'
    });
    var params = `part=snippet&q=${query}&maxResults=50&type=video&fields=items(id%2FvideoId%2Csnippet(channelId%2CchannelTitle%2CpublishedAt%2Cthumbnails%2Fmedium%2Ctitle))%2CnextPageToken%2CpageInfo%2CprevPageToken%2CtokenPagination&key=${apiKey}`;
    fetch(`${baseUrl}/search?${params}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'SEARCH',
          payload: {
            query: query,
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
    dispatch({
      type: 'FETCH'
    });
    // Fetch the channel for banner image and playlist
    const channelParams = `part=snippet%2CcontentDetails%2CbrandingSettings&id=${id}&fields=items(brandingSettings(image(bannerImageUrl%2CbannerTvHighImageUrl))%2CcontentDetails%2FrelatedPlaylists%2Fuploads%2Csnippet(thumbnails(maxres%2Furl%2Cmedium%2Furl)))&key=${apiKey}`;
    fetch(`${baseUrl}/channels?${channelParams}`)
      .then(response => response.json())
      .then(response => {
        const playlistId = response.items[0].contentDetails.relatedPlaylists.uploads;
        const bannerImage = response.items[0].brandingSettings.image.bannerTvHighImageUrl || response.items[0].brandingSettings.image.bannerImageUrl;
        const thumbnail = response.items[0].snippet.thumbnails.medium.url;
        // Fetch the playlistItems api for songs in the playlist
        const playlistItemsParams = `part=snippet&playlistId=${playlistId}&maxResults=50&fields=items(contentDetails%2Cid%2Csnippet(channelId%2CchannelTitle%2CpublishedAt%2CresourceId%2FvideoId%2Cthumbnails%2Fmedium%2Ctitle))%2CnextPageToken%2CpageInfo%2CprevPageToken&key=${apiKey}`;
        fetch(`${baseUrl}/playlistItems?${playlistItemsParams}`)
          .then(response => response.json())
          .then(response => {
            console.log('response', response);
            response.bannerImage = bannerImage;
            response.thumbnail = thumbnail;
            // Need to rearrange keys so they fit our scheme
            response.items = response.items.map(item => {
              return { snippet: item.snippet, id: item.snippet.resourceId };
            });
            console.log('response', response);
            dispatch({
              type: 'SEARCH',
              payload: {
                results: response
              }
            })
          })
          .catch(error => {
            console.log('error', error);
          });
      })
      .catch(error => {
        console.log('error', error);
      });
  }
}

export function getTrends() {
  return function(dispatch) {
    dispatch({
      type: 'FETCH'
    });
    var params = `part=snippet&chart=mostPopular&maxResults=50&key=${apiKey}`;
    fetch(`${baseUrl}/videos?${params}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        response.items.forEach(item => {
          item.id = { ...item.id, videoId: item.id };
        });
        dispatch({
          type: 'SEARCH',
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
