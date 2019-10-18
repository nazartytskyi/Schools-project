import React, { Component } from 'react';
//import { connect } from 'react-redux';
import './Filters.scss';
// import propTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import { Link } from 'react-router-dom';
//import MapSearch from './MapSearch/MapSearch';
import LocationSearchInput from './LocationSearchInput/LocationSearchInput'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { Select, InputLabel, FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


class Filters extends Component {
  constructor(props) {
    super(props);
    this.onlyFree = false;
  }


  render() {
    return (
      <div className="filters-wrapper">
        <h3 className="filters-heading">Вкажіть фільтри</h3>

        <FormControlLabel
          control={
            <Checkbox
              value={this.onlyFree}
              color="primary"
              onChange={() => {
                this.onlyFree = !this.onlyFree;
                this.props.setFilter({onlyFree: this.onlyFree})
              }}
            />
          }
          label="Тільки з вільними місцями"
        />

        <FormControl>
         <InputLabel htmlFor="age-native-simple">Оберіть мову</InputLabel>
          <Select
            native
            onChange={(e) => {
              const selectedValue = e.target.options[e.target.selectedIndex].value;
              e.target.value = selectedValue
             this.props.setFilter({language: selectedValue});
            }}
            inputProps={{
              name: 'lang'
           }}
          >
            <option value={''}></option>
            <option value={'ua'}>Українська</option>
            <option value={'ru'}>Російська</option>
            <option value={'pl'}>Польська</option>
          </Select>
       </FormControl>

        <ZnoRangeSlider setFilter={this.props.setFilter} schools={this.props.schools}/>
        <FeedbackRangeSlider setFilter={this.props.setFilter} schools={this.props.schools}/>
        <LocationSearchInput setUserCoordinates={this.props.setUserCoordinates}/>
       
      </div>
      );
  }
}

export default Filters;



function valuetext(value) {
  return `${value}`;
}

function ZnoRangeSlider(props) {
  const [value, setRange] = React.useState([100, 200]);

  const handleChange = (event, value) => {
    setRange(value);
    // const filteredSchools = props.schools.filter(school => {
    //   return school.avgZno >= value[0] && school.avgZno <= value[1];
    // });

    props.setFilter({"znoRange": value});
  }

  return (
    <div  className="filters-slider">
      <Typography id="range-slider" gutterBottom>
        Бал ЗНО
      </Typography>
      <Slider
        min={100}
        max={200}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}

function FeedbackRangeSlider(props) {
  const [value, setRange] = React.useState([0, 10]);

  const handleChange = (event, value) => {
    setRange(value);
    // const filteredSchools = props.schools.filter(school => {
    //   return school.avgZno >= value[0] && school.avgZno <= value[1];
    // });

    props.setFilter({"feedbackRange": value});
  }

  return (
    <div  className="filters-slider">
      <Typography id="range-slider" gutterBottom>
        Рейтинг відгуків
      </Typography>
      <Slider
        min={0}
        max={10}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
