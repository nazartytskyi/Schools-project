import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
// import propTypes from 'prop-types';
// import axios from 'axios';
import Carousel from './components/shared/Carousel/Carousel';

//import AppBar from '@material-ui/core/AppBar';
//import { Link }from 'react-router-dom'

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  // getSchools: () => dispatch(getSchools())
});

class App extends Component {
  render() {
    return (
      <div className='container'>
        <Carousel />
      </div>
    );
  }
}
// props validation
App.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
