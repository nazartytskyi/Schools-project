import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({

  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  }
}));

export default function CitySelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('Всі міста');

  const handleChange = event => {
    setAge(event.target.value);
    props.setFilter({city: event.target.value});
  };
  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          value={age}
    
          onChange={handleChange}
        >
          <MenuItem value="Всі міста">Всі міста</MenuItem>
          <MenuItem value="Львів">Львів</MenuItem>
          <MenuItem value="Івано-Франківськ">Івано-Франківськ</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}