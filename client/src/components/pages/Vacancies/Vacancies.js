import React, { Component } from 'react';
import './Vacancies.scss';
import VacancyList from './VacancyList/VacancyList';
import { connect } from 'react-redux';
import { getSchools } from '../../../actions/getSchools';
import propTypes from 'prop-types';
import SpreadSearch from './SpreadSearch/SpreadSearch';


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools())
});


export class Vacancies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      filteredVacancies: []
    };
    this.vacancies = [];
    this.filters = {}; 
  }



  filterVacancies = (filters) => {
    let filteredVacancies = [...this.vacancies];
    if(filters.title !== undefined) {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.title.toUpperCase().includes(filters.title.toUpperCase());
      });
    }
    if(filters.range !== undefined) {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.salary >= filters.range[0] && vacancy.salary <= filters.range[1];
      });
    }
    if(filters.employment !== undefined) {
      if(filters.employment !== 'Будь-яка') {
        filteredVacancies = filteredVacancies.filter(vacancy => {
          return vacancy.employment === filters.employment;
        }) 
      }
       
    }
    if(filters.school !== undefined) {
      if(filters.school !== 'Всі школи') {
        filteredVacancies = filteredVacancies.filter(vacancy => {
          return vacancy.school === filters.school;
        })
      }  
    }
    
   
    return filteredVacancies;
  }


  setFilter(filterMixin) {
    this.filters = {...this.filters, ...filterMixin};
    this.setState({...this.state, filteredVacancies: this.filterVacancies(this.filters)});
  }

  createFullVacancyArray = (data) => {
    const fullVacancyArray = [];
      data.forEach(school => {
        school.vacancies.forEach(vacancy => {
          const fullVacancy = {
            title: vacancy.title,
            description: vacancy.description,
            salary: vacancy.salary,
            employment: vacancy.employment,
            school: school.name,
            adress: school.adress,
            phoneNumber: school.phoneNumber,
            date: vacancy.date,
            schoolId: school.id
          }
          fullVacancyArray.push(fullVacancy);
        })
      })
    return fullVacancyArray;
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/getData')
      .then(data => {
        return data.json()
      })
      .then(schools => {
       const fullVacancies = this.createFullVacancyArray(schools.data);
       let sortedVacancies = fullVacancies.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      });
        this.setState({
          ...this.state, 
          schools: schools.data, 
          filteredVacancies: sortedVacancies
        });
        this.vacancies = fullVacancies;
      });
  }

  updateInput = (e) => {
    this.setFilter({title: e.target.value.trim()});
  }

  filterBySchool = (e) => {
    this.setFilter({school: e.target.value});
  }

  filterByEmployment = (e) => {
    this.setFilter({employment: e.target.value});
  }

  sortVacancies = (e) => {
    if(e.target.value === 'byDate') {
      let sortedVacancies = this.state.filteredVacancies.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      });
      this.setState({...this.state, filteredVacancies: sortedVacancies});
    }
    if(e.target.value === 'bySalary') {
      let sortedVacancies = this.state.filteredVacancies.sort((a, b) => {
        return b.salary - a.salary;
      });
      this.setState({...this.state, filteredVacancies: sortedVacancies});
    }
  }


  render() {
    return (
      <div className="vacancies">
        <div className="search">
          <div>
            <label>Оберіть місто</label>
            <select>
              <option value="Lviv">Львів</option>
            </select>
          </div>
          <div>
            <label>Для пошуку введіть назву посади</label>
            <input type="text" className="searchInput" onChange={this.updateInput}/>
          </div>
          <div>
            <select onChange={this.sortVacancies}>
              <option value="byDate">За датою</option>
              <option value="bySalary">За зарплатою</option>
            </select>
          </div>

        </div>
        <div className="main">
          <SpreadSearch schools={this.state.schools} 
                        filterBySchool={this.filterBySchool} 
                        filterByEmployment={this.filterByEmployment} 
                        className="sidebar"
                        setFilter={this.setFilter.bind(this)}
          />
          <VacancyList vacancies={this.state.filteredVacancies} className="list"/>
        </div>
      </div>
    )
  }
}

Vacancies.propTypes = {
  getSchools: propTypes.func.isRequired,
  schools: propTypes.object.isRequired
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vacancies);
