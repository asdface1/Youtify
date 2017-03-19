import React from 'react';
import { connect } from 'react-redux';
import './Footer.css';

import * as AppActions from '../../Actions/AppActions';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = { play: true };
  }

  toggle = () => {
    if (this.state.play === true) {
      this.props.dispatch(AppActions.pauseVideo());
    } else {
      this.props.dispatch(AppActions.pauseVideo());
    }
    this.setState({ play: !this.state.play });
  }

  render() {
    return (
      <div id="Footer">
        <div className="segment justify-content-start">
          <div>Beach Boys - Kokomo</div>
          <a>BeachBoysVEVO</a>
        </div>
        <div className="large segment justify-content-center">
          <div className="flex justify-content-center align-items-center">
            <i className="large random icon" />
            <i className="large step backward icon" />
            <a onClick={this.toggle}>
              <i className={"huge " + (this.state.play ? "play" : "pause") + " circle icon"} />
            </a>
            <i className="large step forward icon" />
            <i className="large repeat icon" />
          </div>
        </div>
        <div className="segment justify-content-end">

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
