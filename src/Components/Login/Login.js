import React from 'react';
import './Login.css';
import * as firebase from 'firebase';

export default class Login extends React.Component {
  componentDidMount() {
    // Check for auth state change
  }

  signInWithEmailAndPassword = (event) => {
    event.preventDefault();
    const { target } = event;
  }

  signInWithGoogle = () => {

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
