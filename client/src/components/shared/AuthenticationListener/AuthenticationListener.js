import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../../actions/setUser';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setUser: () => dispatch(setUser())
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


export class AuthenticationListener extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(setUser);
    console.log(firebase.auth().currentUser);
  }
  // componentDidMount(){
  // }
  render() {
    return <div>
    </div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationListener);
