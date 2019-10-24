import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase-service/firebase-service';
import { auth } from '../../firebase-service/firebase-service';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import axios from 'axios';
import propTypes from 'prop-types';
import { setUser } from '../../../../actions/setUser';
import { getUserRole } from '../../../../actions/getUserRole';
import { setUserFromMongo } from '../../../../actions/setUserFromMongo';

import './Login.scss';
const firebaseui = require('firebaseui');

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  setUser: user => {
    return dispatch(setUser(user));
  },
  getUserRole: userRole => {
    return dispatch(getUserRole(userRole));
  },
  setUserFromMongo: user => {
    return dispatch(setUserFromMongo(user));
  }
});
const uiConfig = {
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInFlow: 'popup',
  immediateFederatedRedirect: false,
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '/termsofservice',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('/privacypolicy');
  }
};

export class Login extends Component {
  constructor(props) {
    super(props);
    auth().onAuthStateChanged(this.setUser);
    this.state = { anchorEl: null };
  }

  logout = () => {
    auth().signOut();
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  setUser = user => {
    this.props.setUser(user);
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken()
        .then(idToken => {
          axios
            .get(`/api/user`, {
              headers: { authorization: idToken }
            })
            .then(user => {
              this.props.setUserFromMongo(user.data);
            });
        });
      
    }
    this.props.getUserRole();
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    let login;
    let username = '';
    if (Object.keys(this.props.users).length && this.props.users.user) {
      username = this.props.users.user.displayName;
    }
    if (username) {
      login = (
        <div className="login">
          <span className="userGreeting">
            {' '}
            Вітаю, <Link to="/profile">{username}</Link>{' '}
          </span>
          <Button
            onClick={this.logout}
            variant="outlined"
            className="login-btn"
          >
            Вийти
          </Button>
        </div>
      );
    } else {
      login = (
        <div className="login">
          <span className="userGreeting"> </span>
          <Button
            variant="outlined"
            className="login-btn"
            aria-describedby={id}
            onClick={this.handleClick}
          >
            Увійти
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <div className="login-container">
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
            </div>
          </Popover>
        </div>
      );
    }
    return <>{login}</>;
  }
}

Login.propTypes = {
  setUser: propTypes.func,
  getUserRole: propTypes.func,
  setUserFromMongo: propTypes.func,
  users: propTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
