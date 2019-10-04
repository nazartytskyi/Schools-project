import Header from '../header/Header';
import Footer from '../footer/Footer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { auth } from '../firebase-service/firebase-service';
import { getSchools } from '../../../actions/getSchools';
import { setUser } from '../../../actions/setUser';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools()),
  setUser: user => {
    return dispatch(setUser(user));
  }
});

class Layout extends Component {
  getSchools = () => {
    this.props.getSchools();
    auth().onAuthStateChanged(this.setUser);
  };

  setUser = user => {
    this.props.setUser(user);
  };

  componentDidMount() {
    this.getSchools();
  }

  render() {
    let username = '';
    if (Object.keys(this.props.users).length !== 0) {
      if (this.props.users.user !== null) {
        username = this.props.users.user.displayName;
      }
    }
    return (
      <>
        <Header username={username} />
        {this.props.children}
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  getSchools: propTypes.func,
  setUser: propTypes.func,
  children: propTypes.array,
  users: propTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
