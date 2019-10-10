import React, { Component } from 'react';
import './Vacancies.scss';
import VacancyList from './VacancyList/VacancyList';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Filters from './Filters/Filters';
import TextField from '@material-ui/core/TextField';
import CitySelect from './CitySelect/CitySelect';
import SortVacancies from './SortVacancies/SortVacancies';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TemporaryDrawer from './Drawer/Drawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
  schools: state.schools
});

export class Vacancies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      filteredVacancies: []
    };
    this.vacancies = [];
    this.filters = {sortedByDate: true}; 
    this.uniqueCities = [];
    this.uniqueDistricts = [];
    this.isCityChosen = false;
  }

  createUniqueCities = () => {
    const uniqueCities = this.state.schools.map(school => {
      return school.adress.city;
    });
    return [...new Set(uniqueCities)];
  }

  createUniqueDistricts = (choose) => {
    let vacanciesByCity = [];
    this.vacancies.forEach(vacancy => {
      if(choose === vacancy.adress.city) {
        vacanciesByCity.push(vacancy);
      }
    });
    let uniqueDistricts = vacanciesByCity.map(vacancy => {
      return vacancy.adress.district
    });
    this.uniqueDistricts = [...new Set(uniqueDistricts)]
  }

 
  filterVacancies = (filters) => {
    let filteredVacancies = [...this.vacancies];
    if(filters.city && filters.city !== 'Вибрати місто') {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.adress.city === filters.city;
      })
    }
    
    if(filters.district && filters.district !== 'Вибрати район') {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return filters.district === vacancy.adress.district;
      });
    }
    
    if(filters.school) {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.school.toUpperCase().includes(filters.school.toUpperCase());
      });
    }

    if(filters.title) {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.title.toUpperCase().includes(filters.title.toUpperCase());
      });
    }

    if(filters.range) {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.salary >= filters.range[0] && vacancy.salary <= filters.range[1];
      });
    }

    if(filters.employment && filters.employment !== 'Будь-яка') {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.employment === filters.employment;
      })  
    }
  
    if(filters.sortedByDate || filters.date === 'byDate') {
      filteredVacancies = filteredVacancies.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      });
    }

    if(filters.date === 'bySalary') {
      filteredVacancies = filteredVacancies.sort((a, b) => {
        return b.salary - a.salary;
      });
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
            adress: {
              city: school.adress.city,
              district: school.adress.district,
              street: school.adress.street,
              building: school.adress.building
            },
            email: school.email,
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
      
       this.vacancies = fullVacancies;
        this.setState({
          ...this.state, 
          schools: schools.data, 
          filteredVacancies: this.filterVacancies(this.filters)
        });
      });
  }

  updateInput = (e) => {
    this.setFilter({title: e.target.value.trim()});
  }

  changeCityStatus = (e) => {
    if(e !== 'Вибрати місто') {
      this.isCityChosen = true;
    }else {
      this.isCityChosen = false;
    }
  }

  generateVacancyMessage = () => {
    let message = ''
    let lastDigit =this.state.filteredVacancies.length % 10
    switch (lastDigit) {
      case 1:
        message = `Знайдено ${this.state.filteredVacancies.length} вакансію`;
        break;
      case 2:
      case 3:
      case 4:
        message = `Знайдено ${this.state.filteredVacancies.length} вакансії`;
        break;
      default:
        message = `Знайдено ${this.state.filteredVacancies.length} вакансій`;
    }
    return message;
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <div className="vacancies">
            <div className="search">
              <div className="city">
                <CitySelect 
                  className="city-form"
                  setFilter={this.setFilter.bind(this)}
                  uniqueCities={this.createUniqueCities()}
                  createUniqueDistricts={this.createUniqueDistricts.bind(this)}
                  changeCityStatus={this.changeCityStatus.bind(this)}
                />
                <div className="filter-btn">
                  <TemporaryDrawer 
                    schools={this.state.schools}
                    uniqueDistricts={this.uniqueDistricts}
                    filterByEmployment={this.filterByEmployment} 
                    setFilter={this.setFilter.bind(this)}
                    isCityChosen={this.isCityChosen}
                    vacancies={this.state.filteredVacancies}
                  />
                </div>
              </div>
              <div className="main-search">
                <TextField
                  className="input"
                  label="Пошук вакансій"
                  type="search"
                  margin="normal"
                  onChange={this.updateInput}
                />
              </div>
            </div>
            <div className="vacancy-amount">
              <div className="amount-output">
                <Typography variant="body1" 
                  color="textSecondary"
                  className="vacancy-amount-text"
                >{this.generateVacancyMessage()}</Typography>
              </div>
              <div className="sort">
                <SortVacancies setFilter={this.setFilter.bind(this)}/> 
              </div>
            </div>
            <div className="main">
              <div className="sidebar">
                <Card>
                  <CardContent>
                  <Filters 
                    schools={this.state.schools}
                    uniqueDistricts={this.uniqueDistricts}
                    filterByEmployment={this.filterByEmployment} 
                    setFilter={this.setFilter.bind(this)}
                    isCityChosen={this.isCityChosen}
                  />
                  </CardContent>
                </Card>
              </div>
              <VacancyList vacancies={this.state.filteredVacancies} className="list"/>
            </div>
          </div>
        </Container>
      </React.Fragment>  
    )
  }
}

Vacancies.propTypes = {
  schools: propTypes.object.isRequired
};

export default connect(mapStateToProps)(Vacancies);
