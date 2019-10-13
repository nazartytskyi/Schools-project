import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router';

// import firebase from '../../firebase-service/firebase-service';
import Container from '@material-ui/core/Container';
// import axios from 'axios';
import './Profile.scss';
import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({});

const columns = [
  {
    id: 'studentName',
    label: 'Student\u00a0name',
    // minWidth: 170
  },
  { id: 'dateApply', label: 'Date\u00a0apply', minWidth: 170 },
  {
    id: 'email',
    label: 'Email',
    // minWidth: 170
  },
  {
    id: 'dateBirth',
    label: 'Birth\u00a0date',
    // minWidth: 170
  },
  {
    id: 'status',
    label: 'Status',
    // minWidth: 170
  },
];
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: 'mainInfo' };
  }

  showMainInfo() {
    this.setState({
      ...this.state,
      menu: 'mainInfo',
    });
  }
  showRequests() {
    this.setState({
      ...this.state,
      menu: 'requests',
    });
  }
  render() {
    let profileContainer;
    switch (this.state.menu) {
      case 'requests':
        let requests = this.props.schools.data[0]
          ? this.props.schools.data[0].firstGrade.requests
          : [];
        profileContainer = (
          <Paper className="profile-card">
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map(column => {
                    return (<TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>)
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map(request => {
                  return (
                    <TableRow key={request._id}>
                      <TableCell>{request.studentName}</TableCell>
                      <TableCell>{request.dateApply}</TableCell>
                      <TableCell> {request.status}</TableCell>
                      <TableCell>
                        <Select
                          value={''}
                          name="age"
                          displayEmpty
                        >
                          <MenuItem value='' disabled>
                            Placeholder
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        );
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
        <div className="profile-menu">
          <Button onClick={this.showMainInfo.bind(this)}>
            Основна інформація
          </Button>
          <Button onClick={this.showRequests.bind(this)}>Заявки</Button>
        </div>
        {profileContainer}
      </Container>
    );
  }
}

Profile.propTypes = {
  users: propTypes.object,
  schools: propTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
