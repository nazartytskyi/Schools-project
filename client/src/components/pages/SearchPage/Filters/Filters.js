import React, { Component } from 'react';
//import { connect } from 'react-redux';
import './Filters.scss';
// import propTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import { Link } from 'react-router-dom';
//import MapSearch from './MapSearch/MapSearch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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
        <RangeSlider setFilter={this.props.setFilter} schools={this.props.schools}/>
      </div>
      );
  }
}

export default Filters;



const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

function valuetext(value) {
  return `${value}`;
}

function RangeSlider(props) {
  const classes = useStyles();
  const [value, setRange] = React.useState([100, 200]);

  const handleChange = (event, value) => {
    setRange(value);
    // const filteredSchools = props.schools.filter(school => {
    //   return school.avgZno >= value[0] && school.avgZno <= value[1];
    // });

    props.setFilter({"range": value});
  }

  return (
    <div  className={classes.root}>
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