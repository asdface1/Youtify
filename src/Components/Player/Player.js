import React from 'react';
import "./Player.css";
import Youtube from 'react-youtube';

export default class player extends React.Component {
  constructor(){
      super()
      this.state = {player: {}, duration: 0};
  }
  playVideo = () =>{
    this.state.player.playVideo();
  }
  pauseVideo = () =>{
    this.state.player.pauseVideo();
  }
  volume = (event) => {
    this.state.player.setVolume(event.target.value);
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
  	this.setState({ player: event.target, duration: event.target.getDuration() })
    this.state.player.setVolume(10);
    console.log(event.target)
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
	      	videoId="Um7pMggPnug"
	      	opts={opts}
	      	onReady={this._onReady.bind(this)}
      	/>
      	{/*<button onClick={this.pauseVideo}>pause</button>
        <button onClick={this.playVideo}>play</button>
        <input type="text" width="100" onChange={this.volume}/>
        <span style={{color: "white"}}>{this.state.duration}  </span>
        */}
      </div>
    );

  }
}
