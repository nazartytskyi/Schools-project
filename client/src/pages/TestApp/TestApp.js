// /client/App.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSchools } from '../../actions/getSchools'
//import axios from 'axios';

const mapStateToProps = state => ({
  ...state
 });

 const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools())
 })

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  getSchools = (event) => {
    this.props.getSchools();
  }

  componentDidMount() {
    this.getSchools();
  }

  // componentWillUnmount() {
  // }

  render() {
    const schools = this.props.schools.data || [];
    return (
      <div>
        <p>{JSON.stringify(this.props)}</p>
        <ul>
          {
            (this.props.schools) && schools.map((school) => (
              <li>{school.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);