import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Footer.scss';
import SchoolIcon from '@material-ui/icons/School';
class Footer extends Component {
  render() {
    return(
      <footer className="footer">
        <div className="footer-items">
          <div className="logo">
            <Link to='/app'><SchoolIcon className="material-icons" fontSize="large">school</SchoolIcon></Link>
            <p>Schools</p>
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