/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router';
import { updateRequest } from '../../../actions/updateRequest';
import { getAllUsers } from '../../../actions/getAllUsers';
import { setUserRole } from '../../../actions/setUserRole';
import RequestsAlert from './RequestsAlert';
import FavSchoolsPage from '../FavSchoolsPage/FavSchoolsPage';
import ProfileToggleMenu from './ToggleMenu/ToggleMenu';
import AddSchoolPage from '../AddSchoolPage/AddSchoolPage';

import './Profile.scss';
import { Paper, Button } from '@material-ui/core';

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
  },
  setUserRole: (uid, role, bindedSchool) => {
    return dispatch(setUserRole(uid, role, bindedSchool));
  }
});

const columns = [
  {
    field: 'studentName',
    title: 'Ім\u0027я\u00a0учня',
    editable: 'never'
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
    title: 'Першочергове\u00a0право',
    type: 'boolean'
  },
  {
    field: 'dateApply',
    title: 'Дата\u00a0подання',
    editable: 'never',
    type: 'date'
  },
  {
    field: 'comment',
    title: 'Коментар',
    minWidth: 150
  },
  {
    field: 'adress',
    title: 'Адреса',
    editable: 'never',
    render: rowData => {
      return `м.\u00a0${rowData.adress.city}, вул.\u00a0${rowData.adress.street},\u00a0${rowData.adress.building}`;
    }
  },
  {
    field: 'schoolName',
    title: 'Назва\u00a0школи',
    editable: 'never'
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
    field: 'role',
    title: 'Роль',
    lookup: {
      teacher: 'Вчитель',
      superadmin: 'Суперадмін',
      administration: 'Адміністрація школи',
      parent: 'Батьки'
    }
  },
  {
    field: 'bindedSchool',
    title: 'Школа',
    lookup: {}
  }
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.rolesAccess = {
      parent: ['mainInfo', 'favoriteSchools'],
      teacher: ['mainInfo', 'favoriteSchools'],
      administration: ['mainInfo', 'favoriteSchools', 'requests'],
      superadmin: [
        'mainInfo',
        'favoriteSchools',
        'requests',
        'setRoles',
        'addSchool'
      ]
    };

    this.access = this.rolesAccess[
      this.props.users.userRole ? this.props.users.userRole : 'parent'
    ];
    this.state = {
      menu: 'mainInfo',
      columns,
      columnsUsers,
      openMessage: this.props.users.userRole === 'administration'
    };
    this.customMenuButton(this.state.menu);
  }

  componentDidMount() {
    if (this.props.users.userRole === 'superadmin') {
      this.props.getAllUsers();
      let allSchools = { null: 'Відсутня' };
      this.props.schools.data.forEach(school => {
        allSchools[school._id] = school.name;
        return;
      });
      let newColumnsUsers = this.state.columnsUsers;
      newColumnsUsers[3].lookup = allSchools;
      this.setState({ ...this.state, columnsUsers: newColumnsUsers });
    }
  }
  customMenuButton() {
    let access = {};
    access[this.state.menu] = 'profile-menu-button-active';
    this.accessButtons = {
      mainInfo: (
        <Button
          className={access.mainInfo}
          key="mainInfo"
          onClick={this.showMainInfo.bind(this)}
        >
          Основна&#160;інформація
        </Button>
      ),
      favoriteSchools: (
        <Button
          className={access.favoriteSchools}
          key="favoriteSchools"
          onClick={this.showFavoriteSchools.bind(this)}
        >
          Улюблені&#160;школи
        </Button>
      ),
      requests: (
        <Button
          className={access.requests}
          key="requests"
          onClick={this.showRequests.bind(this)}
        >
          Заявки
        </Button>
      ),
      setRoles: (
        <Button
          className={access.setRoles}
          key="setRoles"
          onClick={this.showSetRoles.bind(this)}
        >
          Керування&#160;доступом
        </Button>
      ),
      addSchool: (
        <Button
          className={access.addSchool}
          key="addSchool"
          onClick={this.showAddSchool.bind(this)}
        >
          Додати&#160;школу
        </Button>
      )
    };
    return this.access.map(item => {
      return this.accessButtons[item];
    });
  }
  showMainInfo() {
    this.setState({
      ...this.state,
      menu: 'mainInfo'
    });
  }
  showFavoriteSchools() {
    this.setState({
      ...this.state,
      menu: 'favoriteSchools'
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
  showAddSchool() {
    this.setState({
      ...this.state,
      menu: 'addSchool'
    });
  }
  handleCloseMessage() {
    this.setState({
      ...this.state,
      openMessage: false
    });
  }
  render() {
    let profileContainer;
    let requestsApplied = 0;
    let requests = [];
    let menu = [];
    if (Object.keys(this.props.users).length && this.props.users.user) {
      if (this.props.users.userRole === 'superadmin') {
        for (let i = 0; i < this.props.schools.data.length; i++) {
          requests = requests.concat(
            this.props.schools.data[i].firstGrade.requests.map(request => {
              request.schoolName = this.props.schools.data[i].name;
              request.schoolId = this.props.schools.data[i]._id;
              return request;
            })
          );
        }
      } else {
        if (this.props.schools.data) {
          const currentSchool = this.props.schools.data.find(school => {
            return this.props.users.bindedSchool === school._id;
          });
          requests = currentSchool.firstGrade.requests.map(request => {
            request.schoolName = currentSchool.name;
            request.schoolId = currentSchool._id;
            return request;
          });
        } else {
          requests = [];
        }
      }
      for (let i = 0; i < requests.length; i++) {
        if (requests[i].status === 'подано') {
          requestsApplied++;
        }
      }
      switch (this.state.menu) {
        case 'addSchool':
          profileContainer = <AddSchoolPage />;
          break;
        case 'requests':
          profileContainer = (
            <MaterialTable
              icons={tableIcons}
              title="Заяви"
              columns={this.state.columns}
              data={requests}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      this.props.updateRequest({ ...newData });
                      resolve();
                    }, 600);
                  })
              }}
            />
          );
          break;
        case 'setRoles':
          let users = this.props.users.allUsers
            ? this.props.users.allUsers
            : [];
          profileContainer = (
            <MaterialTable
              icons={tableIcons}
              title="Користувачі"
              columns={this.state.columnsUsers}
              data={users}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      this.props.setUserRole(
                        newData.uid,
                        newData.role,
                        newData.bindedSchool
                      );
                      resolve();
                    }, 600);
                  })
              }}
            />
          );
          break;
        case 'favoriteSchools':
          profileContainer = <FavSchoolsPage />;
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
          userRole = this.props.users.userRole;
          username = this.props.users.user.displayName;
          userPicture = this.props.users.user.photoURL
            ? this.props.users.user.photoURL
            : 'https://i1.sndcdn.com/artworks-000241752752-qz4n69-t500x500.jpg';
          email = this.props.users.user.email;
          lastLoginAt = new Date(
            parseInt(this.props.users.user.metadata.b)
          ).toLocaleString();
          creationTime = new Date(
            parseInt(this.props.users.user.metadata.a)
          ).toLocaleString();
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
      menu = this.customMenuButton();
    } else {
      profileContainer = <Redirect push to={'/error/401'} />;
    }
    return (
      <>
        <div className="profile-container">
          <ProfileToggleMenu menuItems={menu} />
          <div className="profile-menu">{menu}</div>
          <div className="profile-data">{profileContainer}</div>
        </div>
        <RequestsAlert
          closeMessage={this.handleCloseMessage.bind(this)}
          open={this.state.openMessage}
          message={
            'У Вас є ' + requestsApplied + ' заявка(и) у статусі подано.'
          }
        />
      </>
    );
  }
}

Profile.propTypes = {
  users: propTypes.object,
  schools: propTypes.object,
  allUsers: propTypes.object,
  updateRequest: propTypes.func,
  getAllUsers: propTypes.func,
  setUserRole: propTypes.func,
  setBindedSchool: propTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
