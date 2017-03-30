import React from 'react';
import { connect } from 'react-redux';
import './Search.css';

import { Dropdown } from 'semantic-ui-react';

import * as VideoActions from '../../Actions/VideoActions';
import * as UserActions from '../../Actions/UserActions';
import * as firebase from 'firebase';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { top: 0 };
  }

  componentDidMount() {
    const { header, headerContent } = this.refs;
    this.setState({ top: -(header.clientHeight - Math.ceil(headerContent.clientHeight) - 66) });
  }

  play = (item, i) => {
    this.props.dispatch(VideoActions.playSong(item));
    this.props.dispatch(VideoActions.setQueue(this.props.youtube.results.items, i));
  }

  addToQueue = (item) => {
    this.props.dispatch(VideoActions.addToQueue(item));
  }

  addToPlaylist = (item, playlist) => {
    this.props.dispatch(UserActions.addToPlaylist(item, playlist.id));
    firebase.database().ref()
      .child("youtify")
      .child("playlists")
      .child(playlist.id)
      .child("songs")
      .push(item.id.videoId);
  }

  render() {
    const headerStyle = {
      backgroundImage: `url(${this.props.image})`,
      top: `${this.state.top}px`,
    }
    return (
      <div id="Search">
        <div className={`header ${this.props.image ? 'large' : ''}`} ref="header" style={headerStyle}>
          <div className="header-content" ref="headerContent">
            <div>
              <h3>{this.props.label}</h3>
              <h1>{this.props.title}</h1>
            </div>
            <div>
              <button className="ui green labeled icon button">
                <i className="play icon" />Play
              </button>
              <button className="ui right labeled icon button">
                <i className="plus icon" />Follow
              </button>
            </div>
          </div>
        </div>
        <div className="ui inverted divided items" style={{ padding: '2em', color: 'lightgrey' }}>
          {
            this.props.results.map((item, i) => {
              return (
                <div className="item justify-content-center" key={item.id.videoId} draggable onDoubleClick={() => this.play(item, i)}>
                  <div className="ui tiny image" onClick={() => this.play(item, i)}>
                    <img className="ui small image" src={item.snippet.thumbnails.medium.url} />
                    <div className="overlay"><i className="big play icon"/></div>
                  </div>
                  <div className={`middle aligned content ${item.id.videoId === this.props.video.song.id.videoId ? 'active' : ''}`}>
                    {item.snippet.title}
                  </div>
                  <div className="flex align-items-center justify-content-center">
                    <Dropdown pointing="right" icon="ellipsis horizontal">
                      <Dropdown.Menu>
                        <Dropdown.Item text='Add to queue' icon="plus" onClick={() => this.addToQueue(item)} />
                        <Dropdown.Header icon='list' content='Add to playlist' />
                        { this.props.user.playlists.map(playlist => {
                          return (
                            <Dropdown.Item key={playlist.id} text={playlist.name} icon="plus" className="italic"
                              onClick={() => this.addToPlaylist(item, playlist)} />
                          )
                        }) }
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user,
    video: store.video,
    youtube: store.youtube,
  }
})(Search);
