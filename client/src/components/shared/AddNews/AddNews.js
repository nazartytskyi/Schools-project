import React, { Component } from 'react';
import './AddNews.scss';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {addNewsAction} from '../../../actions/addNewsAction';
import CustomizedSnackbars from './SuccessAlert';

const mapStateToProps = state => ({
  schools: state.schools.data,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  addNewsAction: (obj, id) => {
    return dispatch(addNewsAction(obj, id));
  }
});

 class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpened: false, 
      title: null,
      description: null,
      date: null,
      url: null,
      isSuccess: false,
      isFormFilled: true,
      fileName: ''
    };
  }

  openDialog = () => {
    this.setState({...this.state, isDialogOpened: true});
  }

  closeDialog = () => {
    this.setState({...this.state, isDialogOpened: false, isFormFilled: true});
  }

 closeMessage = () => {
  this.setState({...this.state, isSuccess: false});
 }

  getCurrentDate = () => {
    if(this.state.date !== null) {
      let year = this.state.date.getFullYear()
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                      'August', 'September', 'October', 'November', 'December'];
      let month = months[this.state.date.getMonth()];
      let day = this.state.date.getDate();
      return `${month} ${day}, ${year}`;
    }
  }

  updateInput = (e) => {
    this.setState({...this.state, title: e.target.value, date: new Date()});

  }

  updateTextarea = (e) => {
    this.setState({...this.state, description: e.target.value});
  }

  getFiles = (e) => {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(e.target.files[0]);
    this.setState({...this.state, fileName: e.target.files[0].name});
    let self = this;
    oFReader.onload = function (oFREvent) {
      self.setState({...this.state, url: oFREvent.target.result});
  };
  }

  displayMessage = () => {
    if(this.state.isFormFilled) {
      return {visibility: 'hidden', marginTop: '20px'}
    }
    return {visibility: 'visible', marginTop: '20px'}
    
  }

  addNews = (e) => {
    e.preventDefault();
    this.setState({...this.state, isSuccess: false});

    if(this.state.title !== null && 
      this.state.description !== null && 
      this.state.url !== null) {

        let obj = {
          title: this.state.title,
          description: this.state.description,
          date: this.getCurrentDate(),
          img: this.state.url
        }

        this.props.addNewsAction(obj, this.props.id);
        this.setState({
          ...this.state, 
          isDialogOpened: false, 
          isSuccess: true, 
          title: null, 
          description: null, 
          url: null, 
          fileName: ''
        });
      
    } else {
      this.setState({...this.state, isFormFilled: false});
    }
  };

  displayForm = () => {
    if(this.state.isDialogOpened) {
      return (
        <Dialog open={true} >
          <form onSubmit={this.addNews} className="dialog-form">
            <Typography variant="h5">Додати новину</Typography>
            <div className="dialog-field">
              <TextField
                id="outlined-with-placeholder"
                label="Заголовок"
                variant="outlined"
                onChange={this.updateInput}
                className="dialog-field-input"
              />
            </div>
            <div className="dialog-field">
              <TextField
                id="outlined-with-placeholder"
                label="Вміст новини"
                multiline={true}
                variant="outlined"
                onChange={this.updateTextarea}
                className="dialog-field-input"
                rows="8"
              />
            </div>
            <div className="download-image">
              <Typography color="textSecondary" className="download-image-title">Завантажте світлину</Typography>
              <label className="download-image-btn">
              <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.getFiles}/>
              <Typography>Завантажити</Typography>
              </label>
              <Typography className="file-name">{this.state.fileName}</Typography>
            </div>
            <Typography 
            style={this.displayMessage()} 
            className="form-message" 
            variant="body2"
            >
              Заповніть усі поля
            </Typography>
            <div className="dialog-btns">
              <Button onClick={this.closeDialog} variant="contained" color="secondary">Вийти</Button>
              <Button type="submit" variant="contained" color="primary">Додати</Button>
            </div>
          </form>
        </Dialog>
      );
    }
  }

  handleClick = () => {
    this.setState({ ...this.state, isDialogOpened: true});
  };

  render() {
    if(this.props.users.user !== null) {
    return (
      <div className="add-news">
       
        <Button variant="contained" onClick={this.openDialog}>
          Додати новину
        </Button>
        
        
        {this.displayForm()}
        <CustomizedSnackbars 
          isSuccess={this.state.isSuccess} 
          closeMessage={this.closeMessage.bind(this)}
          is={this.state.isSuccess} 
        />
      </div>
    );
    }else {
      return (
        <div className="add-news"></div>
      )
    }
  }
}

AddNews.propTypes = {
  users: propTypes.object.isRequired,
  addNewsAction: propTypes.func.isRequired,
  id: propTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNews);

