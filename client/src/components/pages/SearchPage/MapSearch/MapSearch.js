import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import React, { Component } from 'react';
import './MapSearch.scss';
import { Link } from 'react-router-dom'
import { InfoWindow } from 'google-maps-react'
import ReactDOM from 'react-dom'

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
        label="Ви"
      />
    )
  

    const markersArr = this.props.schools && this.props.schools.map(school => {
      return <Marker 
        key={school.id}
        onClick={this.onMarkerClick} 
        name={school.name} 
        free={school.firstGrade.free}
        adress={school.adress}
        position={school.coordinates}
      />
    });
 
    return (
      <div className="map-wrapper">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={this.initialCenter}
        >
          {markersArr}
          {homeMarker}
          <InfoWindowEx marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div className="map-marker">
               {/* <Link to='/app'>{this.state.activeMarker.name}</Link>   */}
              <h2>{this.state.activeMarker.name}</h2>
              <p>{this.state.activeMarker.adress && `${this.state.activeMarker.adress.city} ${this.state.activeMarker.adress.street} ${this.state.activeMarker.adress.building}`}</p>
              <p>Вільні місця: {this.state.activeMarker.free || '-'}</p>  
            </div>                
          
          </InfoWindowEx>
        </Map>

      </div>
      );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBHomne1KPE5WDiE8kzxEt9p2Ue5xM1Fkg'
})(MapSearch);
