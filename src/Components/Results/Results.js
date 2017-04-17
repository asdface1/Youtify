import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Results.css';
import * as firebase from 'firebase';

import { Dropdown } from 'semantic-ui-react';

import * as UserActions from '../../Actions/UserActions';
import * as VideoActions from '../../Actions/VideoActions';
import * as YoutubeActions from '../../Actions/YoutubeActions';

class Results extends React.Component {
  constructor() {
    super();
    this.rootRef = firebase.database().ref().child("youtify");
    this.playlistsRef = this.rootRef.child('playlists');
  }

  play = (item, i) => {
    this.props.dispatch(VideoActions.playSong(item));
    this.props.dispatch(VideoActions.setQueue(this.props.items, i));
  }

  addToQueue = (item) => {
    this.props.dispatch(VideoActions.addToQueue(item));
  }

  addToPlaylist = (item, playlist) => {
    this.props.dispatch(UserActions.addToPlaylist(item, playlist.id));
    this.playlistsRef
      .child(playlist.id)
      .child("songs")
      .push(item.id.videoId);
  }

  follow = (id) => {
    this.rootRef
      .child('users')
      .child(this.props.user.uid)
      .child('favorites')
      .push(id)
  }

  displayChannel = (channelId) => {
    this.props.dispatch(YoutubeActions.getChannel(channelId));
  }

  render() {
    if (this.props.items.length === 0 && this.props.youtube.fetching === true) {
      return (
        <div id="Results" style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <div className="ui massive active centered inline inverted loader"></div>
        </div>
      )
    } else if (this.props.items.length === 0) {
      return (
        <div id="Results" style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: 'rgba(255,255,255,.9)', fontWeight: '400', fontSize: '2em' }}>
            No results found
          </h1>
        </div>
      )
    } else {
      return (
        <div id="Results">
          <div className="ui inverted divided items" style={{ padding: '20px', color: 'lightgrey' }}>
            {
              this.props.items.map((item, i) => {
                return (
                  <div className="item justify-content-center" key={i} draggable onDoubleClick={() => this.play(item, i)}>
                    <div className="ui tiny image" onClick={() => this.play(item, i)}>
                      <img className="ui small image" src={item.snippet.thumbnails.medium.url} alt='' />
                      <div className="overlay"><i className="big play icon"/></div>
                    </div>
                    <div className={`middle aligned content ${item.id.videoId === this.props.video.song.id.videoId ? 'active' : ''}`}>
                      {item.snippet.title}<br/>
                      <Link to={`/channel#${item.snippet.channelId}`} onClick={() => this.displayChannel(item.snippet.channelId)}>
                        {item.snippet.channelTitle}
                      </Link>
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
}

export default connect(store => {
  return {
    user: store.user,
    video: store.video,
    youtube: store.youtube
  }
})(Results)
