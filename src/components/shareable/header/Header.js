import React, { Component } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom'
import logo from '../../../img/logoSchools.png';
import { Button } from '@material-ui/core';

export class Header extends Component {
  render() {
    return (
      <header>
        <div className='logo'>
            <Link to='/hi'><img src={logo} alt='' /></Link>
          </div>
        <div className="menu">
          <nav>
            <ul>
              <li><Link to='/app' className="nav-link">Знайти школи</Link></li>
              <li><Link to='/hi' className="nav-link">Новини</Link></li>
              <li><Link to='/hi' className="nav-link">Рейтинги</Link></li>
              <li><Link to='/hi' className="nav-link">Вакансії</Link></li>
              <li><Link to='/hi' className="nav-link">Контакти</Link></li>
              <li><Link to='/hi' className="nav-link">Про проект</Link></li>
            </ul>
          </nav>
          <div className="sign">
            <Button variant="contained" color="primary" className="sign-btn">
              Зареєструватись
            </Button>
            <Button variant="contained" color="secondary" className="sign-btn">
              Увійти
            </Button>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
