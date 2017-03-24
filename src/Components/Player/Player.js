import React from 'react';
import { connect } from 'react-redux';
import "./Player.css";

import Youtube from 'react-youtube';

import * as VideoActions from '../../Actions/VideoActions';

class Player extends React.Component {
  _onReady(event) {
  	this.props.dispatch(VideoActions.setPlayer(event.target));
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

  onStateChange = ({ data }) => {
    if (data === 1) {
      this.props.dispatch(VideoActions.setDuration(this.props.video.player.getDuration()));
    }
  }

  render() {
  	const opts = {
      playerVars: {
        autoplay: 1,
        showinfo: 0,
        controls: 0
      }
    };
    return (
      <div id="Player">
        <Youtube
          videoId={this.props.video.song.src}
          opts={opts}
          onStateChange={this.onStateChange}
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
