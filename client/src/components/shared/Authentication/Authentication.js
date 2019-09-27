import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../actions/setUser';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import propTypes from 'prop-types';
// var firebaseui = require('firebaseui');


// const firebase = require('firebase/app');
// const firebaseui = require('firebaseui');
// require('firebase/auth');

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    return dispatch(setUser(user));
  }
});

const firebaseConfig = {
  apiKey: 'AIzaSyDUljpXeWcbZJb9lLukIlugh8c2YOMcFRA',
  authDomain: 'schools-40858.firebaseapp.com',
  databaseURL: 'https://schools-40858.firebaseio.com',
  projectId: 'schools-40858',
  storageBucket: '',
  messagingSenderId: '621662719271',
  appId: '1:621662719271:web:2d52f379cbc3073717ed02'
};

const uiConfig = {
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
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
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.setUser);
  }

  setUser = (user) => {
    // in this method we launch action
    this.props.setUser(user);
  };
  componentDidMount(){
    // this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    // this.ui.start('#firebaseui-auth-container', uiConfig);
  }
  render() {
    return <div >
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    </div>;
  }
}

Authentication.propTypes = {
  setUser: propTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
