const initialState = {
  player: undefined,
  isPlaying: false,
  song: {
    id: 0,
    duration: 241,
    src: 'Um7pMggPnug'
  },
  volume: 50,
  queue: [
    'Um7pMggPnug',
    'F57P9C4SAW4'
  ]
};

export default function reducer(state=initialState, action) {
  Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
  }

  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload.player };
    case 'PLAY_VIDEO':
      state.player.playVideo();
      return { ...state, isPlaying: true };
    case 'PAUSE_VIDEO':
      state.player.pauseVideo();
      return { ...state, isPlaying: false };
    case 'SET_VOLUME':
      state.player.setVolume(action.payload.volume);
      return { ...state, volume: action.payload.volume };
    case 'SEEK_TO':
      state.player.seekTo(action.payload.time);
      return state;
    case 'PREV':
      var songId = (state.song - 1).mod(state.queue.length);
      var song = { id: songId, src: state.queue[songId] };
      state.player.loadVideoById(song.src);
      return { ...state, song: song, isPlaying: false };
    case 'NEXT':
      var songId = (state.song + 1) % state.queue.length;
      var song = { id: songId, src: state.queue[songId] };
      state.player.loadVideoById(song.src);
      return { ...state, song: song, isPlaying: false };
    default:
      return state;
  }
}
