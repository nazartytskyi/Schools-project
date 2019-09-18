// /client/App.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from './actions/simpleAction'
import axios from 'axios';

const mapStateToProps = state => ({
  ...state
 });

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
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
    objectToUpdate: null,
  };

  simpleAction = (event) => {
    this.props.simpleAction();
  }

  componentDidMount() {
    this.simpleAction();
  }

  componentWillUnmount() {
  }

  render() {
    const { data } = this.state;
    // console.log(store.getState());
    return (
      <div>
        <p>{JSON.stringify(this.props)}</p>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li>{JSON.stringify(dat)}</li>
              ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);