import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import './SortVacancies.scss'


export default function SortVacancies(props) {

  const [age, setAge] = React.useState('byDate');

  const handleChange = event => {
    setAge(event.target.value);
    props.setFilter({date: event.target.value});
  };
  return (
    <form  autoComplete="off">
      <FormControl className="sort-vacancies">
        <Select
          value={age}
          onChange={handleChange}
         
        >
          <MenuItem value="byDate">За датою</MenuItem>
          <MenuItem value="bySalary">За зарплатою</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}

SortVacancies.propTypes = {
  sortVacancies: PropTypes.func.isRequired
};