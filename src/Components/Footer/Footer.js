import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Footer.css';
import 'rc-slider/assets/index.css';
import * as firebase from 'firebase';

import { Dropdown } from 'semantic-ui-react';
import Slider from 'rc-slider';

import * as UserActions from '../../Actions/UserActions';
import * as VideoActions from '../../Actions/VideoActions';
import * as YoutubeActions from '../../Actions/YoutubeActions';



class Footer extends React.Component {
  constructor() {
    super();
    this.state = {dragging: false, time: 0};
  }

  componentDidMount() {
    this.rootRef = firebase.database().ref().child('youtify');
    this.playlistsRef = this.rootRef.child('playlists');
    setInterval(() => {
      if (this.props.video.player && this.props.video.isPlaying && !this.state.dragging) {
        this.setState({ time: this.props.video.player.getCurrentTime() });
      }
    }, 250);
  }

  toggle = () => {
    if (this.props.video.isPlaying === true) {
      this.props.dispatch(VideoActions.pause());
    } else {
      this.props.dispatch(VideoActions.play());
    }
    this.setState({ isPlaying: !this.props.video.isPlaying });
  }

  handleTimeChange = (value) => {
    if (value !== 1) {
      this.setState({ dragging: true, time: value/4 });
    }
  }

  handleTimeChangeComplete = (value) => {
    this.setState({ dragging: false });
    this.props.dispatch(VideoActions.seekTo(value/4));
  }

  handleVolumeChange = (value) => {
    this.setState({volume: value});
    this.props.dispatch(VideoActions.setVolume(value))
  }

  format = (seconds) => {
    if (seconds === undefined) return '0:00';
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    sec = sec < 10 ? '0' + sec : sec;
    return min + ':' + sec
  }

  displayChannel = (channelId) => {
    this.props.dispatch(YoutubeActions.getChannel(channelId));
  }

  fullScreen = () => {
    const iframe = document.getElementsByTagName('iframe')[0];
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }
  }

  addToPlaylist = (item, playlist) => {
    this.props.dispatch(UserActions.addToPlaylist(item, playlist.id));
    this.playlistsRef
      .child(playlist.id)
      .child("songs")
      .push(item.id.videoId);
  }

  render() {
    const volumeIcon = this.props.video.volume > 0 ? (this.props.video.volume >= 50 ? 'up' : 'down') : 'off';
    return (
      <div id="Footer">
        <div className="segment flex-row justify-content-start">
          <div className="flex flex-col">
            <div>{this.props.video.song.snippet.title}</div>
            <Link id='channelId' to={`/channel#${this.props.video.song.snippet.channelId}`} onClick={() => this.displayChannel(this.props.video.song.snippet.channelId)}>
              {this.props.video.song.snippet.channelTitle}
            </Link>
          </div>
          <div className="flex flex-row align-items-center" style={{ marginLeft: '8px' }}>
            <a id='fullscreen' onClick={this.fullScreen}>
              <i className="large step expand icon" />
            </a>
          </div>
        </div>
        <div className="large segment flex flex-col justify-content-center">
          <div className="controllers">
            <a onClick={() => this.props.dispatch(VideoActions.setShuffle(!this.props.video.shuffle))}>
              <i className={`large ${this.props.video.shuffle ? 'green' : ''} random icon`} />
            </a>
            <a onClick={() => this.props.dispatch(VideoActions.prev())}>
              <i className="large step backward icon" />
            </a>
            <a onClick={this.toggle} className="scale">
              <i className={`huge ${this.props.video.isPlaying ? "pause circle" : "video play"} outline icon`} />
            </a>
            <a onClick={() => this.props.dispatch(VideoActions.next())}>
              <i className="large step forward icon" />
            </a>
            <a onClick={() => this.props.dispatch(VideoActions.setRepeat(!this.props.video.repeat))}>
              <i className={`large ${this.props.video.repeat ? 'green' : ''} refresh icon`} />
            </a>
          </div>
          <div className="slider">
            <span className="label">{this.format(this.state.time)}</span>
            <Slider
              min={0}
              max={Math.max(1, (this.props.video.song.duration || 0) * 4)}
              value={this.state.time * 4}
              onChange={this.handleTimeChange}
              onAfterChange={this.handleTimeChangeComplete} />
            <span className="label">{this.format(this.props.video.song.duration)}</span>
          </div>
        </div>
        <div className="segment flex-row justify-content-end">
          <div className="volume slider flex-fill">
          <span className="label">
            <Dropdown pointing="bottom left" icon="large ellipsis horizontal">
              <Dropdown.Menu>
                <Dropdown.Header icon='list' content='Add to playlist' />
                { this.props.user.playlists.map(playlist => {
                  return (
                    <Dropdown.Item key={playlist.id} text={playlist.name} icon="plus" className="italic"
                      onClick={() => this.addToPlaylist(this.props.video.song, playlist)} />
                  )
                }) }
              </Dropdown.Menu>
            </Dropdown>
            </span>
            <span className="label">
              <Link to='/queue'>
                <i className={`large ${this.props.location.pathname === '/queue' ? 'green' : ''} list ul icon`} />
              </Link>
            </span>
            <span className="label">
              <i className={`large volume ${volumeIcon} icon`} />
            </span>
            <Slider
              min={0}
              max={100}
              value={this.props.video.volume}
              onChange={this.handleVolumeChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    video: store.video,
    user: store.user,
  }
})(Footer);
