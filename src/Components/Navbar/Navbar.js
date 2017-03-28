import React from 'react';
import { connect } from 'react-redux';
import './Navbar.css';
import * as firebase from 'firebase';

import { Dropdown } from 'semantic-ui-react';

import * as YoutubeActions from '../../Actions/YoutubeActions';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { query: '' };
  }

  handleChange = ({ target }) => {
    this.setState({ query: target.value });
  }

  onSearch = (event) => {
    event.preventDefault();
    this.props.dispatch(YoutubeActions.search(this.state.query));
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  render() {
    const trigger = (
      <span>
        <i className="large user circle outline icon" size="big" /> {this.props.user.name}
      </span>
    )

    return (
      <nav id="Navbar">
        <div className="content">
          <form onSubmit={this.onSearch}>
            <div className="ui inverted left icon action input">
              <input type="text" placeholder="Search..." onChange={this.handleChange} value={this.state.query} />
              <i className="search icon" />
              <button className="ui button">Search</button>
            </div>
          </form>
          <Dropdown trigger={trigger} pointing>
            <Dropdown.Menu>
              <Dropdown.Item
                text="Settings" icon="settings" />
              <Dropdown.Item
                text="Sign out" icon="sign out" onClick={this.signOut}/>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    )
  }
}

export default connect(store => {
  return {
    youtube: store.youtube,
  }
})(Navbar);
