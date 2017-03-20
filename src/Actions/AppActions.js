export function setPlayer(player) {
  return {
    type: 'SET_PLAYER',
    payload: {
      player: player,
    }
  }
}
export function playVideo(){
    return {
    type: 'PLAY_VIDEO',
  }
}
export function pauseVideo(){
  return {
    type: 'PAUSE_VIDEO'
  }
}
export function setVolume(value){
  return {
    type: 'SET_VOLUME',
    payload: {
      volume: value,
    }
  }
}
