import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Search.css';
import * as firebase from 'firebase';

import { Dropdown } from 'semantic-ui-react';

import Results from '../Results/Results';

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
    this.setState({ top: -(header.clientHeight - headerContent.clientHeight - 68 - 5) });
  }

  playAll = () => {
    if (this.props.results.length) {
      this.props.dispatch(VideoActions.playSong(this.props.results[0]));
      this.props.dispatch(VideoActions.setQueue(this.props.results, 0));
    }
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
      favoritesRef.push(id);
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
              { this.props.type !== 'playlistSearch' &&
                <button className="ui green labeled icon button"
                  onClick={this.playAll}>
                  <i className="play icon" />Play
                </button>
              }
              { this.props.type === 'playlist' && !ownPlaylist &&
                <button className={`ui ${isFollowing && 'active'} right labeled icon button`}
                  onClick={() => this.follow(id, isFollowing)}>
                  <i className={`${isFollowing ? 'remove' : 'plus'} icon`} />
                  { isFollowing ? 'Unfollow' : 'Follow' }
                </button>
              }
              { ownPlaylist &&
                <Dropdown pointing='top right' icon='ellipsis vertical' button className='icon'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='Delete' icon='trash' onClick={() => this.deletePlaylist(id)} />
                  </Dropdown.Menu>
                </Dropdown>
              }
            </div>
          </div>
        </div>
        {
          this.props.type === 'playlistSearch' ?
          <div className="playlists">
            { this.props.results.map(item => (
              <div className="playlist" key={item.id}>
                <div className="header">
                  {item.name}
                  <button className={`ui right labeled icon button`}
                    onClick={() => this.follow(item.id)}>
                    <i className={`plus icon`} />
                    Follow
                  </button>
                </div>
                <div className="item">
                  <Results
                    items={item.songs} />
                </div>
              </div>
            )) }
          </div>
          :
          <Results
            items={this.props.results} />
        }
      </div>
    )
  }
}

export default connect(store => {
  return {
    app: store.app,
    user: store.user,
    video: store.video,
    youtube: store.youtube,
  }
})(Search);
