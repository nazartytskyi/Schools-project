import Header from '../header/Header';
import Footer from '../footer/Footer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getSchools } from '../../../actions/getSchools';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  getSchools: () => dispatch(getSchools())
});

class Layout extends Component {
  getSchools = () => {
    this.props.getSchools();
  };

  componentDidMount() {
    this.getSchools();
  }

  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  getSchools: propTypes.func,
  children: propTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
