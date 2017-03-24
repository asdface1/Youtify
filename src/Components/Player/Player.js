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
<<<<<<< HEAD
=======

  onPlay = () => {
    this.props.dispatch(VideoActions.playVideo());
  }

  onPause = () => {
    this.props.dispatch(VideoActions.pauseVideo());
  }

  onEnd = () => {
    this.props.dispatch(VideoActions.next());
  }

>>>>>>> 07495951619123383e51f660f7cb7986a35bfe64
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
<<<<<<< HEAD
      	<Youtube
	      	videoId="Um7pMggPnug"
	      	opts={opts}
	      	onReady={this._onReady.bind(this)}
      	/>
=======
        <Youtube
          videoId={this.props.video.song.src}
          opts={opts}
          onReady={this._onReady.bind(this)}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnd={this.onEnd} />
>>>>>>> 07495951619123383e51f660f7cb7986a35bfe64
      </div>
    );

  }
}

export default connect(store => {
  return {
    video: store.video,
  }
})(Player);
