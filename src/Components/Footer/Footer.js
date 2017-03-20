import React from 'react';
import { connect } from 'react-redux';
import './Footer.css';
import 'react-input-range/lib/css/index.css';

import InputRange from 'react-input-range';

import * as AppActions from '../../Actions/AppActions';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = { isPlaying: false, value: 30, duration: 241, volume: 50 };
  }

  toggle = () => {
    if (this.state.isPlaying === true) {
      this.props.dispatch(AppActions.pauseVideo());
    } else {
      this.props.dispatch(AppActions.playVideo());
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  handleChange = (value) => {
    this.setState({ value: value });
  }

  handleVolume = (value) => {
    this.setState({ volume: value });
    this.props.dispatch(AppActions.setVolume(value));
  }

  format = (seconds) => {
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    sec = sec < 10 ? '0' + sec : sec;
    return min + ':' + sec
  }

  render() {
    const volumeIcon = this.state.volume > 0 ? (this.state.volume >= 50 ? 'up' : 'down') : 'off';
    return (
      <div id="Footer">
        <div className="segment justify-content-start">
          <div>Beach Boys - Kokomo</div>
          <a>BeachBoysVEVO</a>
        </div>
        <div className="large segment flex flex-col justify-content-center">
          <div className="controllers">
            <a><i className="large random icon" /></a>
            <a><i className="large step backward icon" /></a>
            <a onClick={this.toggle} className="scale">
              <i className={`huge ${this.state.isPlaying ? "pause circle" : "video play"} outline icon`} />
            </a>
            <a><i className="large step forward icon" /></a>
            <a><i className="large refresh icon" /></a>
          </div>
          <div className="slider">
            <span className="label">{this.format(this.state.value)}</span>
            <InputRange
              minValue={0}
              maxValue={this.state.duration}
              value={this.state.value}
              onChange={this.handleChange} />
            <span className="label">{this.format(this.state.duration)}</span>
          </div>
        </div>
        <div className="segment flex-row justify-content-end">
          <div className="volume slider flex-fill">
            <span className="label">
              <i className={`large volume ${volumeIcon} icon`} />
            </span>
            <InputRange
              minValue={0}
              maxValue={100}
              value={this.state.volume}
              onChange={this.handleVolume} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    player: store.player
  }
})(Footer);
