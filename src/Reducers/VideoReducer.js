const initialState = {
  player: undefined,
  isPlaying: false,
  song: {
    id: 0,
    duration: 0,
    src: 'Um7pMggPnug'
  },
  volume: 50,
  queue: []
};

export default function reducer(state=initialState, action) {
  Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
  }

  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload.player };
    case 'PLAY':
      state.player.playVideo();
      return { ...state, isPlaying: true };
    case 'PAUSE':
      state.player.pauseVideo();
      return { ...state, isPlaying: false };
    case 'SET_VOLUME':
      state.player.setVolume(action.payload.volume);
      return { ...state, volume: action.payload.volume };
    case 'SET_DURATION':
      return { ...state, song: { ...state.song, duration: action.payload.duration }};
    case 'SEEK_TO':
      state.player.seekTo(action.payload.time);
      return state;
    case 'PREV':
      var currentSong = (state.song.current - 1).mod(state.queue.length);
      var song = state.queue[currentSong];
      state.player.loadVideoById(song.id.videoId);
      return { ...state, song: song, isPlaying: false };
    case 'NEXT':
      var currentSong = (state.song.current + 1) % state.queue.length;
      var song = state.queue[currentSong];
      song.current = currentSong;
      state.player.loadVideoById(song.id.videoId);
      return { ...state, song: song, isPlaying: false};
    case 'PLAY_SONG':
      state.player.loadVideoById(action.payload.song);
      return {
        ...state,
        song: { ...action.payload.song, current: 0 }
      }
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload.queue,
        song: {
          ...state.song, current: action.payload.current
        }
      };
    case 'ADD_TO_QUEUE':
      var index = state.current + 1;
      for (var i = index; i < state.queue.length; i++) {
        if (state.queue[index].prio) {
          index = i;
          break;
        }
      }
      var head = state.queue.slice(0, index);
      var tail = state.queue.slice(index);
      var newQueue = head.concat(action.payload.item).concat(tail);
      return { ...state, queue: newQueue };
    default:
      return state;
  }
}
