import React from 'react';
import { connect } from 'react-redux';
import './Login.css';
import * as firebase from 'firebase';

import * as UserActions from '../../Actions/UserActions';

class Login extends React.Component {
  signInWithEmailAndPassword = (event) => {
    event.preventDefault();
    const { target } = event;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(target.email.value, target.password.value)
      .then(() => this.props.onSignIn())
      .catch(error => console.log('firebase auth error:', error.message));
  }

  signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(() => this.props.onSignIn());
  }

  render() {
    return (
      <div id="Login">
        <div className="ui basic segment" style={{ width: '500px', maxWidth: '100%', padding: 0 }}>
          <form onSubmit={this.signInWithEmailAndPassword}>
            <div className="ui fluid left icon inverted big input">
              <input type="email" name="email" placeholder="Email" />
              <i className="envelope icon"></i>
            </div>
            <div className="ui inverted divider"></div>
            <div className="ui fluid left icon inverted big input">
              <input type="password" name="password" placeholder="Password" />
              <i className="lock icon"></i>
            </div>
            <div className="ui inverted divider"></div>
            <div className="ui equal width grid">
              <div className="row">
                <div className="column">
                  <div className="ui toggle red checkbox">
                    <input type="checkbox" name="public" />
                    <label>Remember me</label>
                  </div>
                </div>
                <div className="column">
                  <button className="ui fluid large green right labeled icon button">
                    <i className="right arrow icon"></i>
                    Sign in
                  </button>
                </div>
              </div>
              <div className="row" style={{ paddingTop: 0 }}>
                <div className="column">
                  <button type="button" className="ui fluid large blue left labeled icon button" onClick={this.signInWithGoogle}>
                    <i className="google icon"></i>
                    Sign in with Google
                  </button>
                </div>
                <div className="column">
                  <button type="button" className="ui fluid large blue right labeled icon button">
                    <i className="right arrow icon"></i>
                    Register
                  </button>
                </div>
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
  }
})(Login);
