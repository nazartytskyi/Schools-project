import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../shared/firebase-service/firebase-service';
import { auth } from '../../../shared/firebase-service/firebase-service';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import propTypes from 'prop-types';
import { setUser } from '../../../../actions/setUser';
import { getUserRole } from '../../../../actions/getUserRole';
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
  }
});
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: () => false
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInFlow: 'popup',
  immediateFederatedRedirect: false,
  tosUrl: '/termsofservice',
  
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

  createEmail = email => {
    if (email) {
      return `mailto:${email}`;
    }
  };

  setUser = user => {
    this.props.setUser(user);
    if (auth().currentUser) {
      auth()
        .currentUser.getIdTokenResult()
        .then(idTokenResult => {
          if (idTokenResult.claims.parent) {
            this.props.getUserRole('parent');
          }
          if (idTokenResult.claims.superadmin) {
            this.props.getUserRole('superadmin');
          }
          if (idTokenResult.claims.administration) {
            this.props.getUserRole('administration');
          }
        })
        .catch(() => {
          console.log('Token not found');
        });
    }
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
        <Button
          variant="contained"
          className="respond-btn"
          aria-describedby={id}
          href={this.createEmail(this.props.email)}
        >
          Відправити резюме
        </Button>
      );
    } else {
      login = (
        <div>
          <Button
            variant="contained"
            className="respond-btn"
            aria-describedby={id}
            onClick={this.handleClick}
          >
            Відправити резюме
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
  users: propTypes.object,
  email: propTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
