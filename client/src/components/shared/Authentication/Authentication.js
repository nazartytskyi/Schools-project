const firebase = require('firebase/app');
const firebaseui = require('firebaseui');
require('firebase/auth');

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
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};

firebase.initializeApp(firebaseConfig);
