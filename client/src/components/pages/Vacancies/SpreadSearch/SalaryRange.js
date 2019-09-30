import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300
  }
});

function valuetext(value) {
  return `${value}грн`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([5000, 20000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setFilter({'range': newValue});
  };
  

  return (
    <div className={classes.root}>
      
        Вкажіть розмір заробітньої плати
   
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