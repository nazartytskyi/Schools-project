import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
//import { connect } from 'react-redux';
import './MapSearch.scss';
// import propTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import { Link }from 'react-router-dom'


class MapSearch extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    };

    return (
      <div className="map-wrapper">
        {/*<Header/>*/}
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
        {/*<Footer/>*/}
      </div>
      );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBHomne1KPE5WDiE8kzxEt9p2Ue5xM1Fkg'
})(MapSearch);