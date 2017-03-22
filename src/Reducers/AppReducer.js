const initialState = {player: undefined};

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload.player };
    case 'PLAY_VIDEO':
      state.player.playVideo();
      return state;
    case 'PAUSE_VIDEO':
      state.player.pauseVideo();
      return state;
    case 'SET_VOLUME':
      state.player.setVolume(action.payload.volume);
      return state;
    case 'SEEK_TO':
      state.player.seekTo(action.payload.time);
      return state;
    default:
      return state;
  }
}
