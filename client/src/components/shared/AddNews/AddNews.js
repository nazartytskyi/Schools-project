import React, { Component } from 'react';
import './AddNews.scss';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  schools: state.schools,
  users: state.users
});






export class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpened: false,
      newsObject: {
        title: ''
      }
    };
  }

 

  setTitle = (e) => {
    this.setState({...this.state, ...this.state.newsObject, newsObject: {title: e.target.value}});
    console.log(e.target.value);
  }

  addNews = (e) => {
    e.preventDefault();
    let obj = this.state.newsObject
    console.log(obj);
  }




  displayForm = () => {
    if(this.state.isDialogOpened) {
      return (
        <div>  
          <form onSubmit={this.addNews}>
            <h3>Додати новину</h3>
            <div className="add-news-input">
              <input type="text" placeholder="Введіть заголовок новини" onChange={this.setTitle}/>
            </div>
            <div className="add-news-input">
              <textarea type="text" rows="8" cols="30" placeholder="Введіть заголовок новини"></textarea>
            </div>
            <button type="submit">Додати</button>
          </form>
        </div>
      );
    }
    
    
   
  }

  handleClick = () => {
    this.setState({...this.state, isDialogOpened: true})
  }
  
 
  render() {
    if(this.props.users.user !== null) {
      return (
        <div className="add-news">
        <Button variant="contained" onClick={this.handleClick}>Додати новину</Button>
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
