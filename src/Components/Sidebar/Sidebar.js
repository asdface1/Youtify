import React from 'react';
import { connect } from 'react-redux';
import './Sidebar.css';

import Player from '../Player/Player';
import * as firebase from 'firebase';
class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = { active: 0, width: 300, list: [], listRef: undefined };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.stopDrag);
    const rootRef = firebase.database().ref().child('youtify');
    this.setState({ listRef: rootRef.child('playlists') });
  }

  componentWillReceiveProps(props) {
    this.state.listRef
        .orderByChild('ownerId')
        .startAt(props.user.uid)
        .endAt(props.user.uid)
        .on('value', snap => {
      console.log('snap', snap.val());
      this.setState({
        list: snap.val()
      })
    })
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
    return (
      <div id='Sidebar' style={{ width: this.state.width + 'px'}}>
        <div className="flex flex-col flex-fill justify-content-between">
          <div style={{ overflowY: 'auto' }}>
            <Menu header="Playlists"
              active={this.state.active}
              setActive={(i) => {this.setState({active: i})}}
              items={this.state.list} />
          </div>
          <button className="ui large black fluid right labeled icon button" style={{borderRadius: 0}}>
            New playlist
            <i className="ui large plus circle icon" />
          </button>
        </div>
        <Player />
        {/*<img src='http://www.roadtovr.com/wp-content/uploads/2015/03/youtube-logo2.jpg' alt="" />*/}
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

const Menu = ({ header, items, active, setActive }) => {
  return (
    <div className="ui secondary vertical fluid inverted pointing menu" style={{ background: 'none' }}>
      <p></p>
      <div className="header item">{ header }</div>
      {
        Object.keys(items).map((key, i) => {
          return (
            <a className={"item " + (i === active ? "active" : "")}
              onClick={() => setActive(i)} key={i}>{ items[key].name }</a>
          )
        })
      }
    </div>
  )
};
