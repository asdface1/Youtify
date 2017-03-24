export function setPlayer(player) {
  return {
    type: 'SET_PLAYER',
    payload: {
      player: player,
    }
  }
}
export function play() {
    return {
    type: 'PLAY',
  }
}
export function pause() {
  return {
    type: 'PAUSE'
  }
}
export function setVolume(value) {
  return {
    type: 'SET_VOLUME',
    payload: {
      volume: value,
    }
  }
}
export function seekTo(value) {
  return {
    type: 'SEEK_TO',
    payload: {
      time: value,
    }
  }
}
export function prev() {
  return {
    type: 'PREV'
  }
}
export function next() {
  return {
    type: 'NEXT'
  }
}
export function setDuration(duration) {
  return {
    type: 'SET_DURATION',
    payload: {
      duration
    }
  }
}
export function playById(id) {
  return {
    type: 'PLAY_BY_ID',
    payload: {
      song: id
    }
  }
}
