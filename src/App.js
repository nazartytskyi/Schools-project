import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { simpleAction } from './actions/simpleAction';
import propTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { Link }from 'react-router-dom'

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
      <AppBar color="primary" position="static">
        <h1>Hello World</h1>
      </AppBar>
     <div className="nav">
      <button className="btn" onClick={this.simpleAction}>Test redux action</button>
      <Link to="/hi">HelloWorld</Link>
      <Link to="/">GoBack</Link>
     </div>
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
