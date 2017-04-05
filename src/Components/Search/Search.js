import React from 'react';
import { connect } from 'react-redux';
import './Search.css';
import * as firebase from 'firebase';

import { Dropdown } from 'semantic-ui-react';

import * as VideoActions from '../../Actions/VideoActions';
import * as UserActions from '../../Actions/UserActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { top: 0 };
    this.rootRef = firebase.database().ref().child("youtify");
    this.playlistsRef = this.rootRef.child('playlists');
  }

  updateBannerHeight = () => {
    const { header, headerContent } = this.refs;
    this.setState({ top: -(header.clientHeight - Math.ceil(headerContent.clientHeight) - 66) });
  }

  play = (item, i) => {
    this.props.dispatch(VideoActions.playSong(item));
    this.props.dispatch(VideoActions.setQueue(this.props.results, i));
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

  deletePlaylist = (id) => {
    this.playlistsRef
      .child(id)
      .remove();
  }

  follow = (id, isFollowing) => {
    const favoritesRef = this.rootRef
      .child('users')
      .child(this.props.user.uid)
      .child('favorites');

    if (isFollowing) {
      favoritesRef.once('value', snap => {
        favoritesRef.set(Object.values(snap.val()).filter(fav => fav !== id))
      })
    } else {
      favoritesRef.push({ id });
    }
  }

  render() {
    const headerStyle = {
      backgroundImage: `url(${this.props.image})`,
      top: `${this.state.top}px`,
    }
    const id = this.props.location.hash.slice(1);
    const isFollowing = this.props.user.favorites.find(f => f.id === id) ? true : false;
    const ownPlaylist = this.props.user.playlists.find(p => p.id === id) ? true : false;
    return (
      <div id="Search">
        <img src={this.props.image}
          style={{ display: 'none', height: 0, width: 0}}
          onLoad={this.updateBannerHeight}
          onError={this.updateBannerHeight}/>
        <div className={`header ${this.props.image ? 'large' : ''}`} ref="header" style={headerStyle}>
          <div className="header-content" ref="headerContent">
            <div>
              <h3>{this.props.label}</h3>
              <h1>{this.props.title}</h1>
            </div>
            <div>
              { ownPlaylist &&
                <Dropdown pointing='top' icon='ellipsis vertical' button className='icon'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='Delete' onClick={() => this.deletePlaylist(id)} />
                  </Dropdown.Menu>
                </Dropdown>
              }
              <button className="ui green labeled icon button"
                onClick={() => this.play(this.props.results[0])}>
                <i className="play icon" />Play
              </button>
              { this.props.type === 'playlist' &&
                <button className={`ui ${isFollowing && 'active'} right labeled icon button`}
                  onClick={() => this.follow(id, isFollowing)}>
                  <i className={`${isFollowing ? 'remove' : 'plus'} icon`} />
                  { isFollowing ? 'Unfollow' : 'Follow' }
                </button>
              }
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
