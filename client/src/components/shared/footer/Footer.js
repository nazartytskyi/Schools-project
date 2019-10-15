import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Footer.scss';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Footer extends Component {
  render() {
    return(
      <footer className="footer">
         <React.Fragment>
          <Container maxWidth="lg" className="header-container">
            <div className="footer-items">
              <div className="logo">
                <Link to='/'><SchoolIcon className="material-icons" fontSize="large">school</SchoolIcon></Link>
                <Typography variant="body2">S_cool_S</Typography>
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