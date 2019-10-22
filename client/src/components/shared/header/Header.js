import React, { Component } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import SchoolIcon from '@material-ui/icons/School';
import Login from './Login/Login';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SimpleMenu from './ToggleMenu/ToggleMenu';
import logo from '../../../img/logo.png';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export class Header extends Component {
  render() {
    return (
      <header>
        <React.Fragment>
          <Container maxWidth="lg" className="header-container">
            <div className="header-logo">
              <div>
                <Link to='/'><img src={logo} alt="logo"/></Link>
              </div>
              <SimpleMenu/>
            </div>
            <div className="menu">
              <nav>
                <ul>
                  <li><Link to='/search' className="nav-link">Знайти школи</Link></li>
                  <li><Link to='/news' className="nav-link">Новини</Link></li>
                  <li><Link to='/vacancies' className="nav-link">Вакансії</Link></li>
                  <li><Link to='/contacts' className="nav-link">Контакти</Link></li>
                  <li><Link to='/about' className="nav-link">Про проект</Link></li>
                </ul>
                <Login />
              </nav>
            </div>
          </Container>
        </React.Fragment>
      </header>
    )
  }
}

export default Header
