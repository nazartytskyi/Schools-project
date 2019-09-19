import React, { Component } from 'react';
//import { connect } from 'react-redux';
import './SearchPage.scss';
// import propTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import { Link } from 'react-router-dom';
import MapSearch from './MapSearch/MapSearch';
import Filters from './Filters/Filters';

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        {/*<Header/>*/}
        <main>
         <Filters className="filtrers"/>
         <MapSearch className="search-results"/>
        </main>
        {/*<Footer/>*/}
      </>
      );
  }
}

export default SearchPage;