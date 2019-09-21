import React, { Component } from 'react';
//import { connect } from 'react-redux';
import './Filters.scss';
// import propTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import { Link } from 'react-router-dom';
//import MapSearch from './MapSearch/MapSearch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Filters extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
          <h3>Вкажіть фільтри</h3>

          <FormControlLabel
        control={
          <Checkbox
            value="checkedB"
            color="primary"
          />
        }
        label="value 1"
      />
      </div>
      );
  }
}

export default Filters;