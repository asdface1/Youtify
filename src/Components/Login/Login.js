import React from 'react';
import { connect } from 'react-redux';
import './Login.css';
import * as firebase from 'firebase';

import * as UserActions from '../../Actions/UserActions';

class Login extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('firebase user:', user);
        this.props.dispatch(UserActions.signIn(user));
      } else {
        console.log('not logged in');
      }
    });
  }

  signInWithEmailAndPassword = (event) => {
    event.preventDefault();
    const { target } = event;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(target.email.value, target.password.value)
      .catch(error => console.log('firebase auth error:', error.message));
  }

  signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    return (
      <div id="Login">
        <h1>Youtify</h1>
        <div className="ui basic segment" style={{width: '500px', maxWidth: '100%'}}>
          <h2>Sign in</h2>
          <form onSubmit={this.signInWithEmailAndPassword}>
            <div className="ui divider"></div>
            <div className="ui fluid transparent left icon inverted big input">
              <input type="email" name="email" placeholder="Email" />
              <i className="envelope icon"></i>
            </div>
            <div className="ui divider"></div>
            <div className="ui fluid transparent left icon inverted big input">
              <input type="password" name="password" placeholder="Password" />
              <i className="lock icon"></i>
            </div>
            <div className="ui divider"></div>
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
              <div className="row">
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
