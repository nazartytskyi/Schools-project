import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../actions/setUser';
import firebase from './firebase-service';
import { auth } from './firebase-service';
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
  constructor(props) {
    super(props);
    auth().onAuthStateChanged(this.setUser);
  }

  setUser = user => {
    // in this method we launch action
    this.props.setUser(user);
  };

  setMyRole = () => {
    auth().currentUser.getIdToken().then((idTokenResult) => {
      console.log(idTokenResult);
    })
    auth().currentUser.getIdTokenResult().then((idTokenResult) => {
      console.log(idTokenResult);
    })
    
    // firebase.auth().setUserClaim(auth().currentUser.uid, {teacher: true});
  }

  render() {
    return (
      <div className="signup-form">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
        <button onClick={this.setMyRole}>Set my role</button>
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
