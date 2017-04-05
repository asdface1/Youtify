import React from 'react';
import { connect } from 'react-redux';
import './Navbar.css';
import * as firebase from 'firebase';

import { Dropdown, Select } from 'semantic-ui-react';

import Login from '../Login/Login';
import Modal from '../Modal/Modal';

import * as AppActions from '../../Actions/AppActions';
import * as UserActions from '../../Actions/UserActions';
import * as YoutubeActions from '../../Actions/YoutubeActions';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = { query: '', showModal: false };
  }

  handleChange = ({ target }) => {
    this.setState({ query: target.value });
  }

  onSearch = (event) => {
    event.preventDefault();
    this.props.history.push('search');
    this.props.dispatch(YoutubeActions.search(this.state.query));
    this.props.dispatch(AppActions.search(this.state.query));
  }

  signOut = () => {
    this.props.dispatch(UserActions.signOut());
  }

  render() {
    const trigger = (
      <span>
        <i className="large user circle outline icon" size="big" /> {this.props.user.name}
      </span>
    )
  const options = [
    { key: 'videos', text: 'Videos', value: 'videos' },
    { key: 'playlists', text: 'Playlists', value: 'playlists' },
  ]

    return (
      <nav id="Navbar">
        <Modal
          title={'Sign in'}
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}>
          <Login onSignIn={() => {}}/>
        </Modal>
        <div className="content">
          <form id="search" onSubmit={this.onSearch}>
            <div className="ui inverted left icon action input">
              <input type="text" placeholder="Search..." onChange={this.handleChange} value={this.state.query} />
              <i className="search icon" />
              <Select compact options={options} defaultValue='videos' />
              {/*
              <select className="ui compact selection dropdown">
                <option selected="" value="video">Videos</option>
                <option value="playlists">Playlists</option>
              </select>
            */}
              <button className="ui button">Search</button>
            </div>
          </form>
          <Dropdown trigger={trigger} pointing>
            <Dropdown.Menu>
              <Dropdown.Item
                text="Settings" icon="settings" onClick={() => this.setState({ showModal: true })} />
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
