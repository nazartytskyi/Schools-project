import React, { Component } from 'react';
import './AddNews.scss';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { auth } from '../firebase-service/firebase-service';

const mapStateToProps = state => ({
  schools: state.schools,
  users: state.users
});

export class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpened: true, 
      title: null,
      description: null,
      date: null
  
    };
  }


  getCurrentDate = () => {

  }

  addNews = (e) => {
    e.preventDefault();
    this.setState({...this.state, title: e.target.value});
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken()
        .then(idToken => {
          axios.post(
            'http://localhost:3001/api/schools/5d8259d20dafb81f14fc859e/addNews',
            {
              news: {
                img: 'testIMG',
                title: this.state.title,
                description: this.state.title,
                date: 'testDATE'
              }
            },
            { headers: { authorization: idToken } }
          );
        });
    }
  };

  updateInput = (e) => {
    this.setState({...this.state, title: e.target.value});
  }

  updateTextarea = (e) => {
    this.setState({...this.state, description: e.target.value});
  }



  displayForm = () => {
    if(this.state.isDialogOpened) {
      return (
        
        <form onSubmit={this.addNews}>
          <h3>Додати новину</h3>
          <div className="dialog-field">
            <input type="text" placeholder="Введіть заголовок" onChange={this.updateInput}/>
          </div>
          <div className="dialog-field">
            <textarea cols="30" rows="10" placeholder="Введіть текст новини" onChange={this.updateTextarea}></textarea>
          </div> 
          <button type="submit">Додати</button>
        </form>

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
        <Button variant="contained" onClick={this.addNews} >
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

export default connect(mapStateToProps)(AddNews);
