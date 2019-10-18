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
      filteredVacancies: [] ,
      isFiltered: false
    };
    this.vacancies = [];
    this.filters = { sortedByDate: true };
    this.uniqueCities = [];
    this.uniqueDistricts = [];
    this.isCityChosen = false;
  }


  static getDerivedStateFromProps(props, state) {

    const createFullVacancyArray = (data) => {
      const fullVacancyArray = [];
        data.forEach(school => {
          school.vacancies.forEach(vacancy => {
            const fullVacancy = {
              id: vacancy._id,
              schoolId: school._id,
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
              schoolIdSimple: school.id
            }
            fullVacancyArray.push(fullVacancy);
          })
        })
      return fullVacancyArray;
    }
    
 
    if (props.schools !== state.schools) {
      return {
        schools: props.schools.data || [],
        filteredVacancies: createFullVacancyArray(props.schools.data || [])
      };
    }
    return null;
  }

  createUniqueCities = () => {
    const uniqueCities = this.state.schools.map(school => {
      return school.adress.city;
    });
    return [...new Set(uniqueCities)];
  };

  createUniqueDistricts = (choose) => {
    let vacancies = this.state.filteredVacancies;
    let vacanciesByCity = [];
    vacancies.forEach(vacancy => {
      if(choose === vacancy.adress.city) {
        vacanciesByCity.push(vacancy);
      }
    });
    let uniqueDistricts = vacanciesByCity.map(vacancy => {
      return vacancy.adress.district;
    });
    this.uniqueDistricts = [...new Set(uniqueDistricts)];
  };

 
  filterVacancies = (filters) => {

    const createFullVacancyArray = (data) => {
      const fullVacancyArray = [];
        data.forEach(school => {
          school.vacancies.forEach(vacancy => {
            const fullVacancy = {
              id: vacancy._id,
              schoolId: school._id,
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
              schoolIdSimple: school.id
            }
            fullVacancyArray.push(fullVacancy);
          })
        })
      return fullVacancyArray;
    }

    let filteredVacancies = createFullVacancyArray(this.props.schools.data || [])
    if(filters.city && filters.city !== 'Вибрати місто') {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.adress.city === filters.city;
      });
    }

    if (filters.district && filters.district !== 'Вибрати район') {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return filters.district === vacancy.adress.district;
      });
    }

    if (filters.school) {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.school
          .toUpperCase()
          .includes(filters.school.toUpperCase());
      });
    }

    if (filters.title) {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.title
          .toUpperCase()
          .includes(filters.title.toUpperCase());
      });
      console.log('Im here');
      console.log(filteredVacancies);
    }

    if (filters.range) {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return (
          vacancy.salary >= filters.range[0] &&
          vacancy.salary <= filters.range[1]
        );
      });
    }

    if (filters.employment && filters.employment !== 'Будь-яка') {
      filteredVacancies = filteredVacancies.filter(vacancy => {
        return vacancy.employment === filters.employment;
      });
    }

    if (filters.sortedByDate || filters.date === 'byDate') {
      filteredVacancies = filteredVacancies.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      });
    }

    if (filters.date === 'bySalary') {
      filteredVacancies = filteredVacancies.sort((a, b) => {
        return b.salary - a.salary;
      });
    }
    return filteredVacancies;
  };

  setFilter(filterMixin) {
    this.filters = {...this.filters, ...filterMixin};
    this.setState({filteredVacancies: this.filterVacancies(this.filters), isFiltered: true});
    console.log(this.filterVacancies(this.filters));
     console.log(this.state.filteredVacancies);
    console.log(this.state.isFiltered);
  }

  updateInput = (e) => {
    this.setFilter({title: e.target.value.trim()});
    console.log(this.state.filteredVacancies);
  }

  changeCityStatus = e => {
    if (e !== 'Вибрати місто') {
      this.isCityChosen = true;
    } else {
      this.isCityChosen = false;
    }
  };

  generateVacancyMessage = () => {
    let message = ''
    let lastDigit = this.chooseVacancies().length % 10
    switch (lastDigit) {
      case 1:
        message = `Знайдено ${this.chooseVacancies().length} вакансію`;
        break;
      case 2:
      case 3:
      case 4:
        message = `Знайдено ${this.chooseVacancies().length} вакансії`;
        break;
      default:
        message = `Знайдено ${this.chooseVacancies().length} вакансій`;
    }
    return message;
  };



  chooseVacancies = () => {
   let vacancies = this.state.filteredVacancies;
   let sortedVacancies = vacancies.sort((a, b) => {
    return +new Date(b.date) - +new Date(a.date);
  });
   this.vacancies = sortedVacancies
    if(this.state.isFiltered){
      return this.state.filteredVacancies;
    }else {
      return sortedVacancies;
    }
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
                    schools={this.props.schools}
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
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="vacancy-amount-text"
                >
                  {this.generateVacancyMessage()}
                </Typography>
              </div>
              <div className="sort">
                <SortVacancies setFilter={this.setFilter.bind(this)} />
              </div>
            </div>
            <div className="main">
              <div className="sidebar">
                <Card>
                  <CardContent>
                  <Filters 
                    schools={this.props.schools}
                    uniqueDistricts={this.uniqueDistricts}
                    filterByEmployment={this.filterByEmployment} 
                    setFilter={this.setFilter.bind(this)}
                    isCityChosen={this.isCityChosen}
                  />
                  </CardContent>
                </Card>
              </div>
              <VacancyList
                vacancies={this.state.filteredVacancies}
                className="list"
              />
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

Vacancies.propTypes = {
  schools: propTypes.object.isRequired
};

export default connect(mapStateToProps)(Vacancies);
