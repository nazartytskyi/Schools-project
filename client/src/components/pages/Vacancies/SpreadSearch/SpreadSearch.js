import React, { Component } from 'react';
import './SpreadSearch.scss';
import RangeSlider from './SalaryRange';
import propTypes from 'prop-types';



export class SpreadSearch extends Component {
  render() {
    let schools = this.props.schools;
    return (
      <div className="sidebar">
        <h3>Розширений пошук</h3>
        <RangeSlider filterBySalary={this.filterBySalary} setFilter={this.props.setFilter}/>
        <div>
        <label>За школою</label>
         <select onClick={this.props.filterBySchool.bind(this)}>
           <option>Всі школи</option>
           {schools.map(school => (
            <option key={school.id} value={school.name}>
             {school.name}
            </option>
           ))}
         </select>
        </div>
        <div>
          <label>Зайнятість</label>
          <select onChange={this.props.filterByEmployment.bind(this)}>
            <option value="Будь-яка">Будь-яка</option>
            <option value="Повна зайнятість">Повна зайнятість</option>
            <option value="Часткова зайнятість">Часткова зайнятість</option>
          </select>
        </div>
      </div>
    )
  }
}

SpreadSearch.propTypes = {
  filterBySchool: propTypes.func,
  schools: propTypes.object
};

export default SpreadSearch
