import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../../img/logoSchools.png';
import './Footer.scss';
class Footer extends Component {
  render() {
    return(
      <footer className="footer">
        <div className="footer-items">
          <div className='logo'>
            <Link to='/hi'><img src={logo} alt='' /></Link>
          </div>
          <div className="footer-copy">
            &copy; Epam Front-end lab, 2019
          </div>
          <div className="footer-nav">
            <Link to="/">GoBack</Link>
          </div>
        </div>
      </footer>  
    )
  }

}
export default Footer