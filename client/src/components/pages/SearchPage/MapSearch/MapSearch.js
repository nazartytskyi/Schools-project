import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import React, { Component } from 'react';
//import { connect } from 'react-redux';
import './MapSearch.scss';
// import propTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom'

import { InfoWindow } from 'google-maps-react'
import ReactDOM from 'react-dom'
import { relative } from 'path';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';


class InfoWindowEx extends Component {
    constructor(props) {
        super(props)
        this.infoWindowRef = React.createRef()
        this.contentElement = document.createElement(`div`)
    }

    componentDidUpdate(prevProps) {
        if (this.props.children !== prevProps.children) {
            ReactDOM.render(
                React.Children.only(this.props.children),
                this.contentElement
            )
            this.infoWindowRef.current.infowindow.setContent(
                this.contentElement
            )
        }
    }

    render() {
        return <InfoWindow ref={this.infoWindowRef} {...this.props} />
    }
}


class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.initialCenter = {lat: 49.833, lng: 24.006};
    this.state = {
      data: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      redirect: false,
      redirectId: 0
   }
  }
  
  componentDidMount(){
    //this.setState({initialCenter:{lat: 49.8, lng: 24.0}});

  }

  onMarkerClick = (props, marker) => {
    this.setState({
        activeMarker: marker,
        showingInfoWindow: true,
    })
  }
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    };

    const homeMarker = this.props.userCoordinates && (
      <Marker 
        key={'homeMarker'}       
        position={this.props.userCoordinates}
      />
    )
  

    const markersArr = this.props.schools && this.props.schools.map(school => {
      return <Marker 
        key={school.id}
        onClick={this.onMarkerClick} 
        name={school.name} 
        free={school.firstGrade.free}
       
 
        position={school.coordinates}
      />
    });
 
    return (
      <div className="map-wrapper">
        {/*<Header/>*/}
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={this.initialCenter}
        >
          {markersArr}
          {homeMarker}
          <InfoWindowEx marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              {/* <Link to='/app'>{this.state.activeMarker.name}</Link>  */}
              <h2>{this.state.activeMarker.name}</h2>
              <p>{this.state.activeMarker.adress}</p>
             <p>Вільні місця: {this.state.activeMarker.free}</p>  
            </div>                
          
          </InfoWindowEx>
        </Map>
        {/*<Footer/>*/}
      </div>
      );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBHomne1KPE5WDiE8kzxEt9p2Ue5xM1Fkg'
})(MapSearch);
