import React, { Component } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School';
// import propTypes from 'prop-types';
import Login from './Login/Login';

export class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <Link to='/app'><SchoolIcon className="material-icons" fontSize="large">school</SchoolIcon></Link>
          <p>Schools</p>
        </div>
        <div className="menu">
          <nav>
            <ul>
              <li><Link to='/search' className="nav-link">Знайти школи</Link></li>
              <li><Link to='/news' className="nav-link">Новини</Link></li>
              <li><Link to='/hi' className="nav-link">Рейтинги</Link></li>
              <li><Link to='/vacancies' className="nav-link">Вакансії</Link></li>
              <li><Link to='/hi' className="nav-link">Контакти</Link></li>
              <li><Link to='/app' className="nav-link">Про проект</Link></li>
            </ul>
          </nav>
        </div>
        <Login />
      </header>
    )
  }
}
Header.propTypes = {
};

export default Header
