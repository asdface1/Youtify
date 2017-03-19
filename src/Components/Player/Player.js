import React from 'react';
// TODO: fixa en video utan kontrollers
// Fixa externa kontrollers
// Allt ska ske i renders och return
import Youtube from 'react-youtube';
export default class player extends React.Component {
  constructor(){
      super()
      this.state = {player: {}};
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
  	this.setState({ player: event.target })
    console.log(event.target)
  }
  render() {

  	const opts = {
      height: '390',
      width: '640',
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
      	<button onClick={this.pauseVideo}>pause</button>
        <button onClick={this.playVideo}>play</button>
        <input type="text" width="100" onChange={this.volume}/>
      </div>
    );
    
  }
}

