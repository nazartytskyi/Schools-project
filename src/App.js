import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './actions/simpleAction';
import propTypes  from 'prop-types';


 const mapStateToProps = state => ({
  ...state
 })
 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {'schools': []};
  }

  simpleAction = () => {
    this.props.simpleAction();
  }

  setSchoolsArr(data) {
    this.setState({'schools': data.target.response});
  }

  getFilesFromServer = () => {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:1234/schools');
    request.responseType = 'json';
    request.onload = (data) => {
      this.setSchoolsArr(data);
    }
    request.send();
  }

 render() {
 
  return (
   <div className="App">
     <h1>Hello World</h1>
     <button onClick={this.simpleAction}>Test redux action</button>
     <pre>
      {
        JSON.stringify(this.props)
      }
     </pre>

     <button onClick={this.getFilesFromServer}>Test server</button>
     <div>{JSON.stringify(this.state.schools)}</div>
   </div>
  );
 }
}

App.propTypes = {
  simpleAction: propTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);