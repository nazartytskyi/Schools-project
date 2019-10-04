import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDUljpXeWcbZJb9lLukIlugh8c2YOMcFRA',
  authDomain: 'schools-40858.firebaseapp.com',
  databaseURL: 'https://schools-40858.firebaseio.com',
  projectId: 'schools-40858',
  storageBucket: '',
  messagingSenderId: '621662719271',
  appId: '1:621662719271:web:2d52f379cbc3073717ed02'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;

export default firebase;
