import React from 'react';
//import { connect } from 'react-redux';
import './SearchPage.scss';
import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import { Link } from 'react-router-dom';
import MapSearch from './MapSearch/MapSearch';
import ListSearch from './ListSearch/ListSearch';
import Filters from './Filters/Filters';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0}; 
};

  render() {
    const value = this.state.value;  
    const handleChange = (event, newValue) => {
      this.setState({value:newValue});
    }

    return (
      <>
        {/*<Header/>*/}
        <main>
          <div className="searchbar">

          </div>
         
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="List" {...a11yProps(0)} />
              <Tab label="Map" {...a11yProps(1)} />
            </Tabs>
          
        
          <div className="search-content-wrapper">
            <Filters className="filtrers"/>

            <TabPanel value={value} index={0}>
             <ListSearch className="search-results"/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MapSearch className="search-results"/>
            </TabPanel>
          </div>
        </main>
        {/*<Footer/>*/}
      </>
      );
  }
}

export default SearchPage;