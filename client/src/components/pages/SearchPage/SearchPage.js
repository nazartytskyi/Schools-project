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
    this.state = {value: 0, schools: this.props.schools.data}; 
  } 
  
  getSchools = event => {
    // in this method we launch action
    this.props.getSchools();
  };
  

  componentDidMount() {
    // this.getSchools().then(() => {
    //   this.setState({...this.state, schools:this.props.schools.data})
    // });
    fetch('http://localhost:3001/api/getData')
      .then(data => {
        return data.json()
      })
      .then(schools => {
        return this.setState({...this.state, schools:schools.data})
      });
  }

  render() {
    const value = this.state.value;  
    const handleChange = (event, newValue) => {
      this.setState({...this.state, value:newValue});
    }
    return (
      <>   
        <main>
          <div className="searchbar">
            <SearchInput schools={this.state.schools}/>
          </div>
         
          <Tabs className="tabs" value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="List" {...a11yProps(0)} />
            <Tab label="Map" {...a11yProps(1)} />
          </Tabs>
          
        
          <div className="search-content-wrapper">
            <Filters className="filtrers"/>

            <TabPanel value={value} index={0}>
             <ListSearch schools={this.state.schools} className="search-results"/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MapSearch className="search-results"/>
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