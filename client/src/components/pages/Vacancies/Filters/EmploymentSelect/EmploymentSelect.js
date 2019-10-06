import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import './EmploymentSelect.scss';
import Typography from '@material-ui/core/Typography';

export default function EmploymentSelect(props) {
  const [age, setAge] = React.useState('Будь-яка');

  const handleChange = event => {
    setAge(event.target.value);
    props.setFilter({employment: event.target.value});
  };

  return (
    <form autoComplete="off">
      <FormControl className="city-select">
        <Typography variant="body2">Пошук за зайнятістю</Typography>
        <Select
          value={age}
          onChange={handleChange}
          className="employment-select"
        > 
          <MenuItem value="Будь-яка">Будь-яка</MenuItem>
          <MenuItem value="Повна зайнятість">Повна зайнятість</MenuItem>
          <MenuItem value="Часткова зайнятість">Часткова зайнятість</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}

EmploymentSelect.propTypes = {
  setFilter: PropTypes.func.isRequired
}