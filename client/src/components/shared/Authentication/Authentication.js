import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../actions/setUser';
import firebase from '../firebase-service/firebase-service';
import { auth } from '../firebase-service/firebase-service';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import propTypes from 'prop-types';
import './Authentication.scss';
const firebaseui = require('firebaseui');

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setUser: user => {
    return dispatch(setUser(user));
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
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
  signInFlow: 'redirect',
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

export class Authentication extends Component {
  render() {
    return (
      <div className="signup-form">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
      </div>
    );
  }
}

Authentication.propTypes = {
  setUser: propTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
