import React, { Component } from 'react';
import './Vacancies.scss';
import VacancyList from './VacancyList/VacancyList';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import SpreadSearch from './SpreadSearch/SpreadSearch';
import TextField from '@material-ui/core/TextField';
import CitySelect from './CitySelect/CitySelect';
import SortVacancies from './SortVacancies/SortVacancies';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TemporaryDrawer from './Drawer';



import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';



const mapStateToProps = state => ({
  schools: state.schools
});

// const mapDispatchToProps = dispatch => ({
//   getSchools: () => dispatch(getSchools())
// });


const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }
});

export class Vacancies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      filteredVacancies: [],
      open: false 
      
    };
    this.vacancies = [];
    this.filters = {sortedByDate: true}; 
    this.uniqueCities = [];
    this.uniqueDistricts = [];
    this.isCityChosen = false;
    this.myRef=null;
    this.width = 0;

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
  
    if(filters.city) {
      if(filters.city !== 'Вибрати місто') {
        filteredVacancies = filteredVacancies.filter(vacancy => {
          return vacancy.adress.city === filters.city;
        })
      }
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
       this.width = this.myRef.offsetWidth;
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

  filterBySchool = (e) => {
    this.setFilter({school: e.target.value}); 
  }

  // filterByEmployment = (e) => {
  //   this.setFilter({employment: e.target.value});
  // }

  changeCityStatus = (e) => {
    if(e !== 'Вибрати місто') {
      this.isCityChosen = true;
    }else {
      this.isCityChosen = false;
    }
  }

  handleDrawerOpen = () => {
    this.setState({...this.state, open: true});
  };

  handleDrawerClose = () => {
    this.setState({...this.state, open: false});
  };

  chooseSide = (e) => {
    return e < 800 ? 'top' : 'left'
  }


 

  render() {
    const { classes } = this.props;
    const theme = '';
    return (
      <div ref={ (ref) => this.myRef=ref }>
        

<div className={classes.root}>
        <div className="filter-drawer ">
        <Button
            variant="contained"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, this.state.open && classes.hide)}
          >
            Розширений пошук
          </Button>
        </div>
        
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="top"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon /> 
            </IconButton>
          </div>
          <Divider />
          <SpreadSearch schools={this.state.schools}
                              uniqueDistricts={this.uniqueDistricts}
                              filterByEmployment={this.filterByEmployment} 
                              className="sidebar"
                              setFilter={this.setFilter.bind(this)}
                              //filterByDistrict={this.filterByDistrict}
                              filterBySchool={this.filterBySchool} 
                              isCityChosen={this.isCityChosen}
                />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
         <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
          {/* <TemporaryDrawer 
              width={this.width}
              schools={this.state.schools}
              uniqueDistricts={this.uniqueDistricts}
              filterByEmployment={this.filterByEmployment} 
              className="sidebar"
              setFilter={this.setFilter.bind(this)}
              filterBySchool={this.filterBySchool} 
              isCityChosen={this.isCityChosen}
              vacancies={this.state.filteredVacancies}
            /> */}
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
                </div>
                <div className="main-search">
                <div className="search-input">
                  <TextField
                    className="input"
                    label="Пошук вакансій"
                    type="search"
                    margin="normal"
                    onChange={this.updateInput}
                  />
                </div>
                </div>
                <div className="sort">
                  <SortVacancies setFilter={this.setFilter.bind(this)}/> 
                </div>
              
              </div>
              <div className="main">
                {/* <SpreadSearch schools={this.state.schools}
                              uniqueDistricts={this.uniqueDistricts}
                              filterByEmployment={this.filterByEmployment} 
                              className="sidebar"
                              setFilter={this.setFilter.bind(this)}
                              //filterByDistrict={this.filterByDistrict}
                              filterBySchool={this.filterBySchool} 
                              isCityChosen={this.isCityChosen}
                /> */}
                <VacancyList vacancies={this.state.filteredVacancies} className="list"/>
              </div>
            </div>
          </Container>
        </React.Fragment>
        </main>
      </div>



        
      </div>
     
     
    )
  }
}

Vacancies.propTypes = {
  getSchools: propTypes.func.isRequired,
  schools: propTypes.object.isRequired
};

export default withStyles(styles)(Vacancies);
               connect(mapStateToProps)(Vacancies);
