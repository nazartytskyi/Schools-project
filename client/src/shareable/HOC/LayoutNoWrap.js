import React, { Component } from 'react';

class LayoutNoWrap extends Component {
  render () {
    return (
      <>
        {this.props.children}
      </>
  )
};
};

export default LayoutNoWrap;