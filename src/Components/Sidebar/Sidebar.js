import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import * as firebase from 'firebase';

import Modal from '../Modal/Modal';
import NewPlaylist from '../NewPlaylist/NewPlaylist';
import Player from '../Player/Player';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = { width: 300, showModal: false };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.stopDrag);
  }

  pos = (x, min, max) => {
    return Math.max(min, Math.min(x, max))
  }

  startDrag = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', this.drag);
  }

  stopDrag = (e) => {
    e.preventDefault();
    window.removeEventListener('mousemove', this.drag);
  }

  drag = (e) => {
    this.setState({ width: this.pos(e.pageX, 200, 600) });
  }

  showNewPlaylistModal = () => this.setState({ showModal: true });

  hideNewPlaylistModal = () => this.setState({ showModal: false });

  render() {
    return (
      <div id='Sidebar' style={{ width: this.state.width + 'px'}}>
        <Modal
          title={'New playlist'}
          show={this.state.showModal}
          onHide={this.hideNewPlaylistModal}>
          <NewPlaylist />
        </Modal>
        <div className="flex flex-col flex-fill justify-content-between">
          <div style={{ overflowY: 'auto' }}>
            <Menu header="Playlists"
              items={this.props.user.playlists}
              active={this.props.location.hash.slice(1)} />
            {
              this.props.user.favorites.length > 0 && 
              <Menu header="Favorites"
                items={this.props.user.favorites}
                active={this.props.location.hash.slice(1)} />
            }
          </div>
          <button className="ui large black fluid right labeled icon button"
            style={{borderRadius: 0}}
            onClick={this.showNewPlaylistModal}>
            New playlist
            <i className="ui large plus circle icon" />
          </button>
        </div>
        <Player />
        <div id='dragbar' onMouseDown={this.startDrag}></div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    app: store.app,
    user: store.user,
  }
})(Sidebar);

const Menu = ({ header, items, active }) => {
  return (
    <div className="ui secondary vertical fluid inverted pointing menu" style={{ background: 'none' }}>
      <p></p>
      <div className="header item">{ header }</div>
      {
        items.map((item, i) => {
          return (
            <Link to={`/playlist#${item.id}`}
              key={i}
              className={"item " + (item.id === active ? "active" : "")}>
                { item.name }
              </Link>
          )
        })
      }
    </div>
  )
};
