import React from 'react';
//import { connect } from 'react-redux';
import './SearchPage.scss';
// import propTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import MapSearch from './MapSearch/MapSearch';
import Filters from './Filters/Filters';
import ListSearch from './ListSearch/ListSearch';
import SearchInput from './SearchInput/SearchInput';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getSchools } from './../../../actions/getSchools';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools())
});


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={2}>{children}</Box>
    </Typography>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.filters = {};
    this.state = {
      drawerOpen:false,
      value: 0,
      schools: this.props.schools.data,
      userCoordinates: {}
    }; 
    this.toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      this.setState({drawerOpen: open });
    };
  } 
  
  

  componentDidMount() {
    // this.getSchools().then(() => {
    //   this.setState({...this.state, schools:this.props.schools.data})
    // });
    fetch('http://localhost:3001/api/getData')
      .then(data => {
        return data.json()
      })
      .then(schools => {
        this.schools = schools.data;
        this.setState({...this.state, filteredSchools:schools.data})
      });
    //this.setState({...this.state, filteredSchools:this.props.schools.data})
  }

  setFilter(filterMixin) {
    this.filters = {...this.filters, ...filterMixin};
    this.setState({filteredSchools: this.filterSchools(this.filters)});
  }

  filterSchools(filters) {
    let filteredSchools = [...this.props.schools.data];

    //name (search) filter
    if(filters.name) {
      filteredSchools = filteredSchools.filter(school => {
        return school.name.toUpperCase().includes(filters.name.toUpperCase());
      })
    }

    //zno range filter
    if(filters.znoRange !== undefined) {
      filteredSchools = filteredSchools.filter(school => {
        return school.avgZno >= filters.znoRange[0] && school.avgZno <= filters.znoRange[1];
      })
    }

    //feedback range filter
    if(filters.feedbackRange ) {
      filteredSchools = filteredSchools.filter(school => {
        return this._getAvgFeedbackRate(school) >= filters.feedbackRange[0] && this._getAvgFeedbackRate(school) <= filters.feedbackRange[1];
      })
    }


    //onlyFree filter
    if(filters.onlyFree) {
      filteredSchools = filteredSchools.filter(school => {
        return school.firstGrade.free > 0;
      })
    }

    //language filter
    if(filters.language) {
      filteredSchools = filteredSchools.filter(school => {
        return school.language.toUpperCase().includes(filters.language.toUpperCase());
      })
    }


    //... other filters

    return filteredSchools;
  }

  _getAvgFeedbackRate(school) {
    let rateSum = 0;
    school.feedbacks.forEach(feedback => {
      rateSum += feedback.rate;
    })
   
    return Math.round(10 * rateSum / school.feedbacks.length) / 10;
  }

  setFilteredSchools(schools) {
    this.setState({...this.state, filteredSchools:schools})
  }

  setUserCoordinates(coordinates) {
    this.setState({...this.state, userCoordinates: coordinates});
  }

  render() {
    const value = this.state.value;  
    const handleChange = (event, newValue) => {
      this.setState({...this.state, value:newValue});
    }

    return (
      <>   
        <main>
          <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer('left', false)}>
            <Filters setFilter={this.setFilter.bind(this)} setUserCoordinates={this.setUserCoordinates.bind(this)} schools={this.schools} className="filtrers"/>      
          </Drawer>
          
          <div className="searchbar">
            <SearchInput setFilter={this.setFilter.bind(this)} schools={this.schools} />
            <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
          </div>
         
          <Tabs className="tabs" value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="List" {...a11yProps(0)} />
            <Tab label="Map" {...a11yProps(1)} />
          </Tabs>
          
        
          <div className="search-content-wrapper">
            <Filters setFilter={this.setFilter.bind(this)} setUserCoordinates={this.setUserCoordinates.bind(this)} schools={this.schools} className="filtrers"/>

            <TabPanel value={value} index={0}>
             <ListSearch userCoordinates={this.state.userCoordinates} schools={this.state.filteredSchools} className="search-results"/>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <MapSearch schools={this.state.filteredSchools} className="search-results"/>
            </TabPanel>
          </div>
        </main>
        
      </>
      );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);