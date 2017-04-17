import React from 'react';
import { connect } from 'react-redux';
import './Login.css';
import * as firebase from 'firebase';

import * as UserActions from '../../Actions/UserActions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { error: undefined };
  }

  signIn = (user) => {
    this.props.dispatch(UserActions.signIn(user));
    this.props.onSignIn();
  }

  signInWithEmailAndPassword = (event) => {
    event.preventDefault();
    const { target } = event;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(target.email.value, target.password.value)
      .then(() => this.props.onSignIn())
      .catch(error => this.setState({ error: error.message }));
  }

  registerWithEmailAndPassword = () => {
    const { form } = this.refs;
    var credential = firebase.auth.EmailAuthProvider.credential(form.email.value, form.password.value);
    const auth = firebase.auth();
    auth.currentUser.link(credential)
      .then(user => this.signIn(user))
      .catch(error => this.setState({ error: error.message }));
  }

  signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    // Link the current anonymous account with a Google account
    firebase.auth().currentUser.linkWithPopup(provider)
      .then(user => this.signIn(user.user))
      .catch(error => {
        console.log('error', error);
        // If Google account already exists, sign in instead
        if (error.code == 'auth/credential-already-in-use') {
          const credential = firebase.auth.GoogleAuthProvider.credential(error.credential.idToken);
          firebase.auth().signInWithCredential(credential)
            .then(user => this.signIn(user))
            .catch(error => this.setState({ error: error.message }));
        } else {
          this.setState({ error: error.message });
        }
      });
  }

  render() {
    return (
      <div id="Login">
        <div className="ui basic segment" style={{ width: '500px', maxWidth: '100%', padding: 0 }}>
          <form onSubmit={this.signInWithEmailAndPassword} ref='form'>
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
                  <button type="button" className="ui fluid large blue right labeled icon button" onClick={this.registerWithEmailAndPassword}>
                    <i className="right arrow icon"></i>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        { this.state.error &&
          <div style={{ width: '100%' }}>
            <div className="ui inverted divider"></div>
            <h3>Error</h3>
            <code>{this.state.error}</code>
          </div>
        }
      </div>
    )
  }
}

export default connect(store => {
  return {
  }
})(Login);
