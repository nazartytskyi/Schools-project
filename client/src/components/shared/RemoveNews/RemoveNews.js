import React, { Component } from 'react';
import './RemoveNews.scss';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {removeNews} from '../../../actions/removeNews';

const mapStateToProps = state => ({
  schools: state.schools.data,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  removeNews: (newsId) => {
    return dispatch(removeNews(newsId));
  }
});

export class RemoveNews extends Component {


  removeNews = () => {
    console.log(this.props.item._id);
    this.props.removeNews(this.props.item._id);
  }

  render() {
    if(this.props.users.user !== null) {
      return (
        <div className="remove-news">
          <Button variant="contained" onClick={this.removeNews}>
             Видалити
          </Button>
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
