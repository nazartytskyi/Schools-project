import React, { Component } from 'react';
//import { connect } from 'react-redux';
import './SearchPage.scss';
// import propTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import { Link } from 'react-router-dom';
import MapSearch from './MapSearch/MapSearch';

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        {/*<Header/>*/}
        <MapSearch/>
        {/*<Footer/>*/}
      </>
      );
  }
}

export default SearchPage;