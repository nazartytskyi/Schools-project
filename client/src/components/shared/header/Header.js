import React, { Component } from 'react';
import './Header.scss';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School';
import {auth} from '../Authentication/firebase-service';
import propTypes from 'prop-types';


export class Header extends Component {
  logout = () => {
    auth().signOut();
  };
  render() {
    let sign;
    if(this.props.username){
      sign = <div className="sign">
      <span className="userGreeting" > Вітаю, {this.props.username}</span>
      <Button onClick={this.logout} variant="outlined" className="sign-btn">
        Вийти
      </Button>
    </div>
    } else {
      sign = <div className="sign">
      <span className="userGreeting" >  </span>
      <Button variant="outlined" className="sign-btn">
        <Link to='/auth' className="btn-link">Увійти</Link>
      </Button>
    </div>
    }
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
          {sign}
        </div>
      </header>
    )
  }
}
Header.propTypes = {
  username: propTypes.string
};

export default Header
