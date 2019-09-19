import React, { Component } from 'react';
import './Header.scss';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School';


export class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <Link to='/hi'><SchoolIcon className="material-icons" fontSize="large">school</SchoolIcon></Link>
          <p>Schools</p>
        </div>
        
        <div className="menu">
          <nav>
            <ul>
              <li><Link to='/search' className="nav-link">Знайти школи</Link></li>
              <li><Link to='/news' className="nav-link">Новини</Link></li>
              <li><Link to='/hi' className="nav-link">Рейтинги</Link></li>
              <li><Link to='/hi' className="nav-link">Вакансії</Link></li>
              <li><Link to='/hi' className="nav-link">Контакти</Link></li>
              <li><Link to='/hi' className="nav-link">Про проект</Link></li>
            </ul>
          </nav>
          <div className="sign">
            <Button variant="outlined" className="sign-btn">
              Зареєструватися
            </Button>
            <Button variant="outlined" className="sign-btn">
              Увійти
            </Button>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
