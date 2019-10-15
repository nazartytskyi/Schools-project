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
    
    this.props.removeNews(this.props.schoolId, this.props.newsId);
  }

  render() {
    if(this.props.users.user !== null) {
      return (
        <div className="remove-news">
          <Button variant="contained" onClick={this.removeNews}>
             Видалити
          </Button>
          <div>{this.props.newsId}</div>
        </div>
      )
    }else {
      return (
        <div className="remove-news"></div>
      )
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveNews);
