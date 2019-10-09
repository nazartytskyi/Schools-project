import React, { Component } from 'react';
import firebase from '../../firebase-service/firebase-service';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './Profile.scss';

class Profile extends Component {
  render() {
    return <Container maxWidth="lg" className="profile-container"></Container>;
  }
}

export default Profile;
