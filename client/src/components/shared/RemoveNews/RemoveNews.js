import React, { Component } from 'react';
import './RemoveNews.scss';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {removeNews} from '../../../actions/removeNews';
import { getSchools } from '../../../actions/getSchools';

const mapStateToProps = state => ({
  schools: state.schools.data,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  removeNews: (idSchool, idNews) => {
    return dispatch(removeNews(idSchool, idNews));
  },
  getSchools: () => dispatch(getSchools())
});

export class RemoveNews extends Component {

  removeNews = () => {
   this.props.removeNews(this.props.currentSchool._id,this.props.item._id);
  }

  render() {
    if(this.props.users.userRole === 'administration' && this.props.users.user !== null) {
      return (
        <div className="remove-news">
          <Button variant="contained" onClick={this.removeNews}>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemoveNews);
