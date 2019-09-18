import React, { Component } from 'react';
import './Header.scss';

export class Header extends Component {
  render() {
    return (
      <header>
        <div>Logo</div>
        <div className="menu">
          <nav>
            <ul>
              <li><a href="#" className="nav-link">Знайти школи</a></li>
              <li><a href="#" className="nav-link">Новини</a></li>
              <li><a href="#" className="nav-link">Рейтинги</a></li>
              <li><a href="#" className="nav-link">Вакансії</a></li>
              <li><a href="#" className="nav-link">Контакти</a></li>
              <li><a href="#" className="nav-link">Про проект</a></li>
            </ul>
          </nav>
          <div className="sign">
            <div className="sign-btn">Зареєструватись</div>
            <div className="sign-btn">Увійти</div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
