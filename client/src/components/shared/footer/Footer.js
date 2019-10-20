import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Footer.scss';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logo from '../../../img/logo.png';

class Footer extends Component {
  render() {
    return(
      <footer className="footer">
         <React.Fragment>
          <Container maxWidth="lg" className="header-container">
            <div className="footer-items">
              <div className="logo">
                <Link to='/'><img src={logo} alt="logo"/></Link>
              
              </div>
              <div className="footer-copy">
                &copy; Epam Front-end lab, 2019
              </div>
              <div className="footer-nav">
                <Link to="/">GoBack</Link>
              </div>
            </div>
          </Container>
        </React.Fragment>
       
      </footer>  
    )
  }
}
export default Footer