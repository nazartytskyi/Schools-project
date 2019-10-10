import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import './ButtonBases.scss'
import SearchIcon from '@material-ui/icons/Search';
import WorkIcon from '@material-ui/icons/Work';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Link } from 'react-router-dom'

export default class ButtonBases extends React.Component {
  render() {
    return (
      <div className="buttons-wrapper">
        <Link to="/search">
          <div className="button">
            <div className="button__icon"><SearchIcon color="primary"/></div>
            <h3 className="button__text">Знайти школу</h3>
          </div>
        </Link>

        <Link to="/vacancies">
          <div className="button">
            <div className="button__icon"><WorkIcon color="primary"/></div>
            <h3 className="button__text">Вакансії</h3>
          </div>
        </Link>

        <Link to="/search">  
          <div className="button">
            <div className="button__icon"><TrendingUpIcon color="primary"/></div>
            <h3 className="button__text">Рейтинги шкіл</h3>
          </div>
        </Link>
      </div>
    );
  }
}