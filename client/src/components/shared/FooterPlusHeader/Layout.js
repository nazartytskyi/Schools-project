import Header from '../header/Header'
import Footer from '../footer/Footer'
import React, { Component } from 'react';

class Layout extends Component {
  render () {
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
  )
};
};

export default Layout;