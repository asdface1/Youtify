import React from 'react';
import { connect } from 'react-redux';
import './NewPlaylist.css';
import * as firebase from 'firebase';

class NewPlaylist extends React.Component {
  addPlaylist = (e) => {
    e.preventDefault();
    const playlistName = e.target.playlist.value;
    const makePublic = e.target.public.checked;

    const rootRef = firebase.database().ref().child('youtify');
    const playlistsRef = rootRef.child('playlists');

    playlistsRef.push({
      name: playlistName,
      nameLowerCase: playlistName.toLowerCase(),
      ownerId: this.props.user.uid,
      public: makePublic
    }, (error) => {
      if (error) {
        console.log('Some error on pushing ');
      } else {
        this.props.onHide();
      }
    });
  }

  render() {
    return (
      <div id="NewPlaylist">
        <div className="ui basic segment" style={{ width: '500px', maxWidth: '100%', padding: 0 }}>
          <form onSubmit={this.addPlaylist}>
            <div className="ui fluid left icon inverted big input">
              <input type="text" name="playlist" placeholder="Playlist name" />
              <i className="list icon" />
            </div>
            <div className="ui inverted divider"></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div className="ui toggle red checkbox">
                <input type="checkbox" name="public" />
                <label>Make public</label>
              </div>
              <div>
                <button type="button" className="ui large labeled icon button" onClick={this.props.onHide}>
                  <i className="remove icon" />
                  Cancel
                </button>
                <button className="ui green large labeled icon button">
                  <i className="plus icon" />
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(store => {
  return {
    user: store.user
  }
})(NewPlaylist)
