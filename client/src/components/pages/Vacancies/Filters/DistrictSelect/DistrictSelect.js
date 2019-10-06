import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import './DistrictSelect.scss';
import Typography from '@material-ui/core/Typography';

export default function DistrictSelect(props) {
  const [age, setAge] = React.useState('Вибрати район');
  const districts = props.uniqueDistricts;

  const handleChange = event => {
    setAge(event.target.value);
    props.setFilter({district: event.target.value});
  };

  const displayDistricts = () => {
    return {display: props.isCityChosen ? 'block' : 'none'}
  }

  return (
    <form autoComplete="off" style={displayDistricts()}>
      <FormControl className="city-select">
        <Typography variant="body2">Пошук за районом</Typography>
        <Select
          value={age}
          onChange={handleChange}
          className="district-select"
        > 
          <MenuItem value="Вибрати район">Вибрати район</MenuItem>
          {districts.map((district, index) => (
            <MenuItem 
              key={index} 
              value={district}
            >
              {district}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

DistrictSelect.propTypes = {
  setFilter: PropTypes.func.isRequired,
  uniqueDistricts: PropTypes.array.isRequired,
  isCityChosen: PropTypes.bool.isRequired
};

