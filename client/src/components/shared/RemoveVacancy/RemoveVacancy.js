import React, { Component } from 'react';
import './RemoveVacancy.scss';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {removeVacancy} from '../../../actions/removeVacancy';
import { getSchools } from '../../../actions/getSchools';

const mapStateToProps = state => ({
  schools: state.schools.data,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  removeVacancy: (idSchool, idVacancy) => {
    return dispatch(removeVacancy(idSchool, idVacancy));
  },
  getSchools: () => dispatch(getSchools())

});

export class RemoveVacancy extends Component {


  removeVacancy = () => {
    console.log(this.props.schoolId);
    console.log(this.props.vacancyId);
    
  this.props.removeVacancy(this.props.schoolId, this.props.vacancyId);
  }

  render() {
    if(this.props.users.user !== null) {
      return (
        <div className="remove-vacancy">
          <Button variant="contained" onClick={this.removeVacancy}>
             Видалити
          </Button>
          <div>{this.props.newsId}</div>
        </div>
      )
    }else {
      return (
        <div className="remove-vacancy"></div>
      )
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveVacancy);
