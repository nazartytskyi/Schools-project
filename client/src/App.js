import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { getSchools } from './actions/getSchools';
import propTypes from 'prop-types';
import axios from 'axios';
import Carousel from './components/shared/Carousel/Carousel';
//import AppBar from '@material-ui/core/AppBar';
//import { Link }from 'react-router-dom'

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools())
});

class App extends Component {
  state = {
    idToUpdate: 0,
    key: '',
    keyValue: ''
  };

  getSchools = event => {
    // in this method we launch action
    this.props.getSchools();
  };

  updateSchools = (idToUpdate, keyToUpdate, keyValueToUpdate) => {
    let objIdToUpdate = null;
    let objectUpdate = {};
    objectUpdate[keyToUpdate] = keyValueToUpdate;

    this.props.schools.data.forEach(school => {
      if (school.id === idToUpdate) {
        objIdToUpdate = school._id;
      }
    });
    console.log(this.props.schools.data);
    console.log(objectUpdate);
    console.log(objIdToUpdate);
    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: objectUpdate
    });
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
      <div className='container'>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={e => {
              this.setState({ idToUpdate: parseInt(e.target.value) });
            }}
            placeholder="id"
            style={{ width: '200px' }}
          />
          <input
            type="text"
            onChange={e => {
              this.setState({ keyToUpdate: e.target.value });
            }}
            placeholder="key"
            style={{ width: '200px' }}
          />
          <input
            type="text"
            onChange={e => {
              this.setState({ keyValueToUpdate: e.target.value });
            }}
            placeholder="keyValue"
            style={{ width: '200px' }}
          />
          <button
            onClick={() =>
              this.updateSchools(
                this.state.idToUpdate,
                this.state.keyToUpdate,
                this.state.keyValueToUpdate
              )
            }
          >
            UPDATE
          </button>
          <button
            onClick={() => {
              this.getSchools();
            }}
          >
            Get data
          </button>
        </div>
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
        <Carousel />
      </div>
    );
  }
}
// props validation
App.propTypes = {
  getSchools: propTypes.func,
  schools: propTypes.object,
  updateSchools: propTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
