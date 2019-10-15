/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router';
import { updateRequest } from '../../../actions/updateRequest';
import { getAllUsers } from '../../../actions/getAllUsers';
import axios from 'axios';

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
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  updateRequest: request => {
    return dispatch(updateRequest(request));
  },
  getAllUsers: () => {
    return dispatch(getAllUsers());
  }
});

const columns = [
  {
    field: 'studentName',
    title: 'Ім\u0027я\u00a0учня',
    editable: 'never'
    // minWidth: 170
  },
  {
    field: 'dateBirth',
    title: 'Дата\u00a0народження',
    editable: 'never',
    type: 'date'
  },
  {
    field: 'email',
    title: 'Електронна\u00a0пошта',
    editable: 'never'
  },
  {
    field: 'status',
    title: 'Статус',
    lookup: {
      подано: 'подано',
      підтверджено: 'підтверджено',
      відхилено: 'відхилено'
    }
  },
  {
    field: 'firstPriority',
    title: 'Перша\u00a0черга',
    type: 'boolean'
  },
  {
    field: 'dateApply',
    title: 'Дата\u00a0подання',
    editable: 'never',
    type: 'date'
  },
  {
    field: 'adress',
    title: 'Адреса',
    editable: 'never',
    render: rowData => {
      return `м.\u00a0${rowData.adress.city}, вул.\u00a0${rowData.adress.street},\u00a0${rowData.adress.building}`;
    }
  }
];
const columnsUsers = [
  {
    field: 'displayName',
    title: 'Ім\u0027я\u00a0користувача',
    editable: 'never'
  },
  {
    field: 'email',
    title: 'Електронна\u00a0пошта',
    editable: 'never'
  },
  {
    field: 'uid',
    title: 'ID\u00a0користувача',
    editable: 'never'
  },
  {
    field: 'userRole',
    title: 'Роль',
    lookup: {
      '': 'Відсутня',
      teacher: 'Вчитель',
      superadmin: 'Суперадмін',
      administration: 'Адміністрація школи',
      parent: 'Батьки'
    }
  }
];
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: 'mainInfo', columns, columnsUsers };
  }

  componentDidMount() {
    if (this.props.users.userRole === 'superadmin') {
      this.props.getAllUsers();
    }
  }
  showMainInfo() {
    this.setState({
      ...this.state,
      menu: 'mainInfo'
    });
  }
  showRequests() {
    this.setState({
      ...this.state,
      menu: 'requests'
    });
  }
  showSetRoles() {
    this.setState({
      ...this.state,
      menu: 'setRoles'
    });
  }
  render() {
    let profileContainer;
    switch (this.state.menu) {
      case 'requests':
        let requests = this.props.schools.data
          ? this.props.schools.data[0].firstGrade.requests
          : [];
        profileContainer = (
          <MaterialTable
            icons={tableIcons}
            title="Заяви"
            columns={this.state.columns}
            data={requests}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  this.props.updateRequest({ ...newData });
                  setTimeout(() => {
                    resolve();
                    this.forceUpdate();
                  }, 600);
                })
            }}
          />
        );
        break;
      case 'setRoles':
        let users = this.props.users.allUsers ? this.props.users.allUsers : [];
        profileContainer = (
          <MaterialTable
            icons={tableIcons}
            title="Користувачі"
            columns={this.state.columnsUsers}
            data={users}
            editable={
              {
                // onRowUpdate: (newData, oldData) =>
                //   new Promise(resolve => {
                //     console.log('onRowUpdate');
                //     this.props.updateRequest({ ...newData });
                //     setTimeout(() => {
                //       resolve();
                //       this.forceUpdate();
                //     }, 600);
                //   })
              }
            }
          />
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
          <Button onClick={this.showSetRoles.bind(this)}>
            Керування доступом
          </Button>
        </div>
        {profileContainer}
      </Container>
    );
  }
}

Profile.propTypes = {
  users: propTypes.object,
  schools: propTypes.object,
  allUsers: propTypes.object,
  updateRequest: propTypes.func,
  getAllUsers: propTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
