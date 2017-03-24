import React from 'react';
import { connect } from 'react-redux';
import "./Player.css";

import Youtube from 'react-youtube';

import * as AppActions from '../../Actions/AppActions';

class Player extends React.Component {
  constructor(){
      super()
      this.state = {player: {}, duration: 0};
  }

  _onReady(event) {
  	this.props.dispatch(AppActions.setPlayer(event.target));
    console.log(event.target)
  }

  onPlay = () => {
    this.props.dispatch(VideoActions.playVideo());
  }

  onPause = () => {
    this.props.dispatch(VideoActions.pauseVideo());
  }

  onEnd = () => {
    this.props.dispatch(VideoActions.next());
  }

  render() {
  	const opts = {
      playerVars: {
        autoplay: 0,
        showinfo: 0,
        controls: 0
      }
    };
    return (
      <div id="Player">
        <Youtube
          videoId={this.props.video.song.src}
          opts={opts}
          onReady={this._onReady.bind(this)}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnd={this.onEnd} />
      </div>
    );
  }
}

export default connect(store => {
  return {
    video: store.video,
  }
})(Player);
