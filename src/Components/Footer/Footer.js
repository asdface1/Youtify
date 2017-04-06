import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Footer.css';
import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';

import * as YoutubeActions from '../../Actions/YoutubeActions';
import * as VideoActions from '../../Actions/VideoActions';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {dragging: false, time: 0};
  }

  componentDidMount() {
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

  render() {
    const volumeIcon = this.props.video.volume > 0 ? (this.props.video.volume >= 50 ? 'up' : 'down') : 'off';
    return (
      <div id="Footer">
        <div className="segment justify-content-start">
          <div>{this.props.video.song.snippet.title}</div>
          <Link to={`/channel#${this.props.video.song.snippet.channelId}`} onClick={() => this.displayChannel(this.props.video.song.snippet.channelId)}>
            {this.props.video.song.snippet.channelTitle}
          </Link>
        </div>
        <div className="large segment flex flex-col justify-content-center">
          <div className="controllers">
            <a><i className="large random icon" /></a>
            <a onClick={() => this.props.dispatch(VideoActions.prev())}>
              <i className="large step backward icon" />
            </a>
            <a onClick={this.toggle} className="scale">
              <i className={`huge ${this.props.video.isPlaying ? "pause circle" : "video play"} outline icon`} />
            </a>
            <a onClick={() => this.props.dispatch(VideoActions.next())}>
              <i className="large step forward icon" />
            </a>
            <a><i className="large refresh icon" /></a>
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
    video: store.video
  }
})(Footer);
