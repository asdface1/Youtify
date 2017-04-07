const initialState = {
  player: undefined,
  isPlaying: false,
  song: {
    id: {},
    snippet: {}
  },
  volume: 50,
  queue: [],
  prioQueue: [],
  shuffle: false,
  repeat: false
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
      if (state.prioQueue.length) {
        song = state.prioQueue[0];
        song.current = state.song.current;
        state.player.loadVideoById(song.id.videoId);
        return { ...state, song: song, isPlaying: false, prioQueue: state.prioQueue.slice(1) };
      } else {
        var currentSong = (state.song.current + 1) % state.queue.length;
        var song = state.queue[currentSong];
        song.current = currentSong;
        state.player.loadVideoById(song.id.videoId);
        return { ...state, song: song, isPlaying: false};
      }
    case 'PLAY_SONG':
      state.player.loadVideoById(action.payload.song);
      return {
        ...state,
        song: { ...action.payload.song, current: 0 }
      }
    case 'SET_QUEUE':
      if (state.shuffle) {
        var shuffledQueue = shuffle(action.payload.queue);
      }
      return {
        ...state,
        queue: state.shuffle ? shuffledQueue : action.payload.queue,
        song: {
          ...state.song, current: action.payload.current
        }
      };
    case 'ADD_TO_QUEUE':
      return { ...state, prioQueue: [ ...state.prioQueue, action.payload.item ] };
    case 'SET_SHUFFLE':
      return {
        ...state,
        shuffle: action.payload.shuffle,
        queue: action.payload.shuffle ? shuffle(state.queue || []) : state.queue
      }
    case 'SET_REPEAT':
      return {
        ...state,
        repeat: action.payload.repeat
      }
    default:
      return state;
  }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
  var b = [ ...a ];
  for (let i = b.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [b[i - 1], b[j]] = [b[j], b[i - 1]];
  }
  return b;
}
