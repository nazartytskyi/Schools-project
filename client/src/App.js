import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { getSchools } from './actions/getSchools';
import propTypes from 'prop-types';
//import AppBar from '@material-ui/core/AppBar';
//import { Link }from 'react-router-dom'

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools())
});

class App extends Component {
  getSchools = event => {
    // in this method we launch action 
    this.props.getSchools();
  };

  componentDidMount() {
    //here we launch method getSchools from App
    this.getSchools();
  }

  // componentWillUnmount() {
  // }

  render() {
    const schools = this.props.schools.data || [];
    return (
      <div>
        {this.props.schools &&
          schools.map(school => {
            return (
              <ul key={school.id}>
                {Object.keys(school).map((keyName, keyIndex) => {
                  return (
                    <li key={keyName}>
                      {keyName + ' : ' + JSON.stringify(school[keyName])}
                    </li>
                  );
                })}
              </ul>
            );
          })}
      </div>
    );
  }
}
// props validation
App.propTypes = {
  getSchools: propTypes.func,
  schools: propTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
