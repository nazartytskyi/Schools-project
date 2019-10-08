import React from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {GoogleApiWrapper} from 'google-maps-react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import './LocationSearchInput.scss'

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({address});
        this.props.setUserCoordinates(latLng);
        //console.log('Success', latLng)
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search-wrapper">
            <TextField
              {...getInputProps({
                placeholder: 'Введіть вашу адресу',
                className: 'location-search-input',
              })}
            />
            <List className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <ListItem
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBHomne1KPE5WDiE8kzxEt9p2Ue5xM1Fkg'
  })(LocationSearchInput);
  