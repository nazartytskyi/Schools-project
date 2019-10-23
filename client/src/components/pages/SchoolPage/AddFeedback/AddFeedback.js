import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFeedback } from '../../../../actions/addFeedback';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import propTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CustomizedSnackbars from '../SchoolInfo/Snackbar';
import CommentIcon from '@material-ui/icons/Comment';
import './AddFeedback.scss';

const mapStateToProps = state => ({
  schools: state.schools.data,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  addFeedback: (feedback, schoolId) => {
    return dispatch(addFeedback(feedback, schoolId));
  }
});

class AddFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDialogOpened: false,
      author: null,
      text: null,
      isFormFilled: true,
      fSuccess: false
    }
  }

  openDialog = () => {
    this.setState({...this.state, isDialogOpened: true});
  }
  closeDialog = () => {
    this.setState({...this.state, isDialogOpened: false, isFormFilled: true});
  }
  closeMessage = () => {
    this.setState({...this.state, fSuccess: false});
  }
  updateTextarea = (e) => {
    this.setState({...this.state, text: e.target.value});
  }
  displayMessage = () => {
    if(this.state.isFormFilled) {
      return {visibility: 'hidden', marginTop: '20px'}
    }
    return {visibility: 'visible', marginTop: '20px'}
  }
  addFeedback = (e) => {
    e.preventDefault();
    this.setState({...this.state, fSuccess: false});
    if(this.state.text !== null) {
      let object = {
        author: this.props.users.user.displayName,
        text: this.state.text
      }
      this.props.addFeedback(object, this.props.id);
      this.setState({
        ...this.state,
        isDialogOpened:false,
        author:null,
        text: null,
        fSuccess: true
      });
    } else {
      this.setState({...this.state, isFormFilled: false});
    }
  }
  displayAddFeedback = () => {
    if(this.state.isDialogOpened) {
      return (
        <Dialog open={true} className="news-dialog" onBackdropClick={this.closeDialog}>
          <form onSubmit={this.addFeedback} className="dialog-form">
            <Typography variant="h5">Залишити відгук</Typography>
            <div className="dialog-field">
              <TextField
                id="outlined-with-placeholder"
                label="Ваше повідомлення"
                multiline={true}
                variant="outlined"
                onChange={this.updateTextarea}
                className="dialog-field-input"
                rows="8"
              />
            </div>
            <Typography 
              style={this.displayMessage()} 
              className="form-message" 
              variant="body2"
            >
              Введіть ваше повідомлення
            </Typography>
            <div className="dialog-btns">
              <Button onClick={this.closeDialog} variant="contained" color="secondary">Вийти</Button>
              <Button type="submit" variant="contained" color="primary">Додати</Button>
            </div>
          </form>
        </Dialog>
      )
    }
  }
  handleClick = () => {
    this.setState({ ...this.state, isDialogOpened: true});
  };

  render() {
    if(this.props.users.user !== null) {
      return (
        <div className='add-feedback'>
          <CustomizedSnackbars 
            fSuccess={this.state.fSuccess} 
            closeMessage={this.closeMessage.bind(this)}
            alertMessage="Відгук додано"
          />
          <Fab className='feedback-icon' onClick={this.openDialog} color="primary" aria-label="add">
            <CommentIcon className='feedback-icon' />
          </Fab>
          {this.displayAddFeedback()}
        </div>
      )
    } else {
      return (
        <div className='add-feedback'></div>
      )
    }
  }
}

AddFeedback.propTypes = {
  users: propTypes.object.isRequired,
  addFeedback: propTypes.func.isRequired,
  id: propTypes.string.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(AddFeedback);