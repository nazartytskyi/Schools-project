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

  simpleAction = () => {
    this.props.simpleAction();
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
   </div>
  );
 }
}

App.propTypes = {
  simpleAction: propTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);