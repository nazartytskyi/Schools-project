import React, { Component } from 'react';
import './AddNews.scss';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { auth } from '../firebase-service/firebase-service';
import propTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
//import TitleInput from './TitleInput/TitleInput';
import TextField from '@material-ui/core/TextField';


const mapStateToProps = state => ({
  schools: state.schools,
  users: state.users
});

export class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpened: false, 
      title: null,
      description: null,
      date: null,
      url: null
    };
  }

  openDialog = () => {
    this.setState({...this.state, isDialogOpened: true});
  }

  closeDialog = () => {
    this.setState({...this.state, isDialogOpened: false});
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

  addNews = (e) => {
    e.preventDefault();
    this.setState({...this.state});

      if (auth().currentUser && 
                  this.state.title !== null && 
                  this.state.description !== null && 
                  this.state.url !== null) {
        auth()
          .currentUser.getIdToken()
          .then(idToken => {
            axios.post(
              'http://localhost:3001/api/schools/5d8259d20dafb81f14fc859e/addNews',
              {
                news: {
                  img: this.state.url,
                  title: this.state.title,
                  description: this.state.title,
                  date: this.getCurrentDate()
                }
              },
              { headers: { authorization: idToken } }
            );
          });
          alert('Новина додана');
          this.closeDialog();
   
    } else {
      alert('Введіть усі поля')
    }
    
  };

  updateInput = (e) => {
    this.setState({...this.state, title: e.target.value, date: new Date()});
  }

  updateTextarea = (e) => {
    this.setState({...this.state, description: e.target.value});
    console.log(this.getCurrentDate());
  }

  getFiles = (e) => {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(e.target.files[0]);
    let self = this;
    oFReader.onload = function (oFREvent) {
      self.setState({...this.state, url: oFREvent.target.result});
  };
  }

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
            />
           </div>
           <div>
            <Typography color="textSecondary">Завантажте світлину</Typography>
            <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.getFiles}/>
           </div>
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
    this.setState({ ...this.state, isDialogOpened: true });
  };

  render() {
    if(this.props.users.user !== null) {
    return (
      <div>
        <div className="add-news">
        <Button variant="contained" onClick={this.openDialog}>
          Додати новину
        </Button>
        </div>
        
        {this.displayForm()}
      </div>
    );
    }else {
      return (
        <div className="add-news">

        </div>
      )
    }
  }
}

AddNews.propTypes = {
  users: propTypes.object.isRequired
};

export default connect(mapStateToProps)(AddNews);
