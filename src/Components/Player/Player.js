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
	      	videoId="Um7pMggPnug"
	      	opts={opts}
	      	onReady={this._onReady.bind(this)}
      	/>
      </div>
    );

  }
}

export default connect(store => {
  return {
    player: store.app.player,
  }
})(Player);
