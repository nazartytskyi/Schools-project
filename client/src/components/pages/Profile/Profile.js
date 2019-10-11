import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router';

// import firebase from '../../firebase-service/firebase-service';
import Container from '@material-ui/core/Container';
// import axios from 'axios';
import './Profile.scss';
import { Paper, Typography, Button } from '@material-ui/core';
// import { Button } from '@material-ui/core';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({});
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: 'mainInfo' };
  }

  showMainInfo(){
    this.setState({
      ...this.state,
      menu: 'mainInfo'
    });
  }
  showRequests(){
    this.setState({
      ...this.state,
      menu: 'requests'
    });
  }
  render() {
    let profileContainer;
    switch (this.state.menu) {
      case 'requests':
        profileContainer = (<Paper className="profile-card">
          
        </Paper>)
        break;
      case 'mainInfo':
      default:
        let userRole = 'Parent';
        let username = '';
        let userPicture = '';
        let email = '';
        let lastLoginAt = '';
        let creationTime = '';
        let redir = null;
        if (Object.keys(this.props.users).length && this.props.users.user) {
          userRole = this.props.users.userRole;
          username = this.props.users.user.displayName;
          userPicture = this.props.users.user.photoURL;
          email = this.props.users.user.email;
          lastLoginAt = this.props.users.user.metadata.lastSignInTime;
          creationTime = this.props.users.user.metadata.creationTime;
        } else {
          redir = <Redirect push to={'/error/401'} />;
        }
        profileContainer = (
          <Paper className="profile-card">
            {redir}
            <img className="user-picture" src={userPicture}></img>
            <div className="profile-row">
              <div className="userdata-title">Ім&#39;я</div>{' '}
              <div className="userdata">{username}</div>
            </div>
            <div className="profile-row">
              <div className="userdata-title">Електронна пошта</div>{' '}
              <div className="userdata">{email}</div>
            </div>
            <div className="profile-row">
              <div className="userdata-title">Статус</div>{' '}
              <div className="userdata">{userRole}</div>
            </div>
            <div className="profile-row">
              <div className="userdata-title">Останній вхід</div>{' '}
              <div className="userdata">{lastLoginAt}</div>
            </div>
            <div className="profile-row">
              <div className="userdata-title">Зареєстровано</div>{' '}
              <div className="userdata">{creationTime}</div>
            </div>
          </Paper>
        );
        break;
    }

    return (
      <Container maxWidth="lg" className="profile-container">
        <div className='profile-menu'>
          <Button onClick={this.showMainInfo.bind(this)}>Основна інформація</Button>
          <Button onClick={this.showRequests.bind(this)}>Заявки</Button>

        </div>
        {profileContainer}
      </Container>
    );
  }
}

Profile.propTypes = {
  users: propTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
