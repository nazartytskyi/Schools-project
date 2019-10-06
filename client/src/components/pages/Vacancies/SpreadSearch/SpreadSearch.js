import React, { Component } from 'react';
import './SpreadSearch.scss';
import RangeSlider from './SalaryRange/SalaryRange';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DistrictSelect from './DistrictSelect/DistrictSelect'




import Typography from '@material-ui/core/Typography';
import EmploymentSelect from './EmploymentSelect/EmploymentSelect';

export class SpreadSearch extends Component {
  render() {
    return (
      <div>

            <div>
              <DistrictSelect
                uniqueDistricts={this.props.uniqueDistricts}
                setFilter={this.props.setFilter}
                isCityChosen={this.props.isCityChosen}
              />
            </div>
            <RangeSlider filterBySalary={this.filterBySalary} setFilter={this.props.setFilter}/>
            <div className="search-school">
              <Typography variant="body2">Пошук за назвою школи</Typography>
              <TextField
                className="search-school-input"
                label="Введіть школу"
                type="search"
                margin="normal"
                onChange={(e) => {this.props.setFilter({school: e.target.value})}}
              />
            </div>
            <div>
              <EmploymentSelect
                setFilter={this.props.setFilter}
              />
            </div>

      
      </div>
    )
  }
}

SpreadSearch.propTypes = {
  setFilter: propTypes.func,
  filterByEmployment: propTypes.func,
  filterByDistrict: propTypes.func,
  schools: propTypes.array,
  uniqueDistricts: propTypes.array
};

export default SpreadSearch
