import React from 'react';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';
import './SalaryRange.scss';
import Typography from '@material-ui/core/Typography';

function valuetext(value) {
  return `${value}грн`;
}

export default function RangeSlider(props) {
  const [value, setValue] = React.useState([5000, 20000]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setFilter({'range': newValue});
  };
  
  return (
    <div className="salary-range">
      <Typography variant="body2">Пошук за зарплатою</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={40000}
        step={100}
      />
    </div>
  );
}

RangeSlider.propTypes = {
  setFilter: PropTypes.func.isRequired
};