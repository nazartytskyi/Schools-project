import React, { Component } from 'react';
import propTypes from 'prop-types';
import './List.scss';






export class List extends Component {
  render() {
    const vacancies = this.props.vacancies;
    return (
      <div className="list">
        <ul>
          {vacancies.map(vacancy => (
            <li>
              <h4>{vacancy.title}</h4>
              <div>{vacancy.description}</div>
              <div>{vacancy.salary}</div>
              <div>{vacancy.school}</div>
              <div>{vacancy.phoneNumber}</div>
              <div>{vacancy.date}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}



List.propTypes = {
  vacancies: propTypes.array
};


export default List
