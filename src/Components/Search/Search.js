import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Search.css';
import * as firebase from 'firebase';

import { Dropdown, Checkbox } from 'semantic-ui-react';

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
        favoritesRef.set(Object.values(snap.val()).filter(fav => fav.id !== id))
      })
    } else {
      favoritesRef.push({ id: id });
    }
  }

  publicSetting = (event) => {
    console.log("search::onchange event", event.target.value);
  }

  render() {
    this.id = this.props.location.hash.slice(1);
    var isFavorite = (id) => {
      return this.props.user.favorites.filter(fav => fav.id === id).length > 0;
    }
    var ownPlaylist = (id = this.id) => {
      return this.props.user.playlists.filter(p => p.id === id).length > 0;
    }
    const isFollowing = this.props.user.favorites.find(f => f.id === this.id) ? true : false;
    const headerStyle = {
      backgroundImage: `url(${this.props.bannerImage})`,
      top: `${this.state.top}px`,
    }
    return (
      <div id="Search">
        <img src={this.props.bannerImage}
          style={{ display: 'none', height: 0, width: 0}}
          onLoad={this.updateBannerHeight}
          onError={this.updateBannerHeight}/>
        <div className={`header ${this.props.bannerImage ? 'large' : ''}`} ref="header" style={headerStyle}>
          <img src={this.props.thumbnail} />
          <div className="header-content" ref="headerContent">
            <div>
              <h3>{this.props.label}</h3>
              <h1>{this.props.title}</h1>
            </div>
            <div>
              { ownPlaylist() &&
                <div className="ui toggle red checkbox">
                  <input type="checkbox" name="public" onChange={this.publicSetting} />
                  <label>Make public</label>
                </div>
              }
              { this.props.type !== 'playlistSearch' &&
                <button className="ui green labeled icon button"
                  onClick={this.playAll}>
                  <i className="play icon" />Play
                </button>
              }
              { this.props.type === 'playlist' && !ownPlaylist() &&
                <button className={`ui ${isFollowing && 'active'} right labeled icon button`}
                  onClick={() => this.follow(this.id, isFollowing)}>
                  <i className={`${isFollowing ? 'remove' : 'plus'} icon`} />
                  { isFollowing ? 'Unfollow' : 'Follow' }
                </button>
              }
              { ownPlaylist() &&
                <Dropdown pointing='top right' icon='ellipsis vertical' button className='icon'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='Delete' icon='trash' onClick={() => this.deletePlaylist(this.id)} />
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
                  { !ownPlaylist(item.id) &&
                    <button className={`ui ${isFavorite(item.id) ? 'active' : ''} right labeled icon button`}
                      onClick={() => this.follow(item.id, isFavorite(item.id))}>
                      <i className={`${isFavorite(item.id) ? 'remove' : 'plus'} icon`} />
                      {isFavorite(item.id) ? 'Unfollow' : 'Follow'}
                    </button>
                  }
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
