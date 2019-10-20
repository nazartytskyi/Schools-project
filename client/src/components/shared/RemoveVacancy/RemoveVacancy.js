import React, { Component } from 'react';
import './RemoveVacancy.scss';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {removeVacancy} from '../../../actions/removeVacancy';
import propTypes from 'prop-types';

const mapStateToProps = state => ({
  schools: state.schools.data,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  removeVacancy: (idSchool, idVacancy) => {
    return dispatch(removeVacancy(idSchool, idVacancy));
  }
});

export class RemoveVacancy extends Component {

  removeVacancy = () => {
  this.props.removeVacancy(this.props.currentSchool._id, this.props.vacancyId);
  }

  render() {
    if(this.props.users.user !== null) {
      return (
        <div className="remove-vacancy">
          <Button variant="contained" onClick={this.removeVacancy}>
             Видалити
          </Button>
        </div>
      )
    }else {
      return (
        <div></div>
      )
    }
    
  }
}

RemoveVacancy.propTypes = {
  removeVacancy: propTypes.func.isRequired,
  currentSchool: propTypes.object.isRequired,
  vacancyId: propTypes.string.isRequired,
  users: propTypes.object.isRequired  
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveVacancy);
