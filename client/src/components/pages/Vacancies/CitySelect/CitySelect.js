import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import './CitySelect.scss'




export default function CitySelect(props) {
  const [age, setAge] = React.useState('Вибрати місто');

  const handleChange = event => {
    setAge(event.target.value);
    props.createUniqueDistricts(event.target.value);
    props.changeCityStatus(event.target.value);
  
    
    props.setFilter({city: event.target.value, district: ''});
    
  };
  return (
    <form autoComplete="off">
      <FormControl className="city-form">
        <Select
          value={age}
          className="city-select"
          onChange={handleChange}
        > 
        <MenuItem value="Вибрати місто">Вибрати місто</MenuItem>
          {props.uniqueCities.map((city, index) => (
              <MenuItem key={index} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

CitySelect.propTypes = {
  createUniqueDistricts: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  uniqueCities: PropTypes.array.isRequired
};