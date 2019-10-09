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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isDialogOpened: false,
  //     message: null,
  //     newsObject: {
  //       title: ''
  //     }
  //   };
  // }
  // state = {
    
  //   id: 0,
  //   message: null,
  //   intervalIsSet: false,
  //   idToDelete: null,
  //   idToUpdate: null,
  //   objectToUpdate: null,
  //   updateToApply: null
  // };



  // updateDB = (idToUpdate, updateToApply) => {
  //   let objIdToUpdate = null;
  //   parseInt(idToUpdate);
  //   this.props.schools.data.forEach((dat) => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat._id;
  //     }
  //   });

  //   axios.post('http://localhost:3001/hi/api/updateData', {
  //     id: objIdToUpdate,
  //     update: { name: updateToApply },
  //   });
  // };


  addNews = () => {
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken()
        .then(idToken => {
          axios.post(
            'http://localhost:3001/api/schools/5d8259d20dafb81f14fc859e/addNews',
            { news: {title: 'test'} },
            { headers: { authorization: idToken } }
          );
        });
    }
    console.log(1);
  };


 

  // setTitle = (e) => {
  //   this.setState({...this.state, ...this.state.newsObject, newsObject: {title: e.target.value}});
  //   console.log(e.target.value);
  // }

  



  // displayForm = () => {
  //   if(this.state.isDialogOpened) {
  //     return (
  //       <div style={{ padding: '10px' }}>
  //         <input
  //           type="text"
  //           style={{ width: '200px' }}
  //           onChange={(e) => this.setState({ idToUpdate: e.target.value })}
  //           placeholder="id of item to update here"
  //         />
  //         <input
  //           type="text"
  //           style={{ width: '200px' }}
  //           onChange={(e) => this.setState({ updateToApply: e.target.value })}
  //           placeholder="put new value of the item here"
  //         />
  //         <button
  //           onClick={this.addNews}
  //         >
  //           UPDATE
  //         </button>
  //       </div>

  //     );
  //   }
   
  // }

  handleClick = () => {
    this.setState({...this.state, isDialogOpened: true})
  }
  
 
  render() {
    // if(this.props.users.user !== null) {
      return (
        <div className="add-news">
        <Button variant="contained" onClick={this.addNews}>Додати новину</Button>
       {/* {this.displayForm()} */}
        </div> 
      );
    // }else {
    //   return (
    //     <div className="add-news">
          
    //     </div>
    //   )

  }
}

export default connect(mapStateToProps)(AddNews);
