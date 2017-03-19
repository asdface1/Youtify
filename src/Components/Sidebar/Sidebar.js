import React from 'react';
import { connect } from 'react-redux';

import { update } from '../../Actions/UserActions';

class Sidebar extends React.Component {
  update() {
    this.props.dispatch(update('Viktor'));
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.name}</h1>
        <button onClick={this.update.bind(this)}>Update</button>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user
  }
})(Sidebar);
