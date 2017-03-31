import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import * as firebase from 'firebase';

import Player from '../Player/Player';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = { active: undefined, width: 300 };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.stopDrag);
  }

  startDrag = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', this.drag);
  }

  stopDrag = (e) => {
    e.preventDefault();
    window.removeEventListener('mousemove', this.drag);
  }

  pos = (x, min, max) => {
    return Math.max(min, Math.min(x, max))
  }

  drag = (e) => {
    this.setState({ width: this.pos(e.pageX, 200, 600) })
  }

  render() {
    console.log('PROPS', this.props);
    return (
      <div id='Sidebar' style={{ width: this.state.width + 'px'}}>
        <div className="flex flex-col flex-fill justify-content-between">
          <div style={{ overflowY: 'auto' }}>
            <Menu header="Playlists"
              items={this.props.user.playlists}
              active={window.location.hash.slice(1)} />
            <Menu header="Favorites"
              items={this.props.user.favorites}
              active={window.location.hash.slice(1)} />
          </div>
          <button className="ui large black fluid right labeled icon button" style={{borderRadius: 0}}>
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
