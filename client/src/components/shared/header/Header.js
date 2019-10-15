import React, { Component } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School';
import Login from './Login/Login';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


export class Header extends Component {
  render() {
    return (
      <header>
        <React.Fragment>
          <Container maxWidth="lg" className="header-container">
            <div className="logo">
              <Link to='/app'><SchoolIcon className="material-icons" fontSize="large">school</SchoolIcon></Link>
              <Typography>S_сool_S</Typography>
            </div>
            <div className="menu">
              <nav>
                <ul>
                  <li><Link to='/search' className="nav-link">Знайти школи</Link></li>
                  <li><Link to='/news' className="nav-link">Новини</Link></li>
                  <li><Link to='/hi' className="nav-link">Рейтинги</Link></li>
                  <li><Link to='/vacancies' className="nav-link">Вакансії</Link></li>
                  <li><Link to='/contacts' className="nav-link">Контакти</Link></li>
                  <li><Link to='/about' className="nav-link">Про проект</Link></li>
                </ul>
              </nav>
            </div>
            <Login />
          </Container>
        </React.Fragment>
      </header>
    )
  }
}

export default Header
