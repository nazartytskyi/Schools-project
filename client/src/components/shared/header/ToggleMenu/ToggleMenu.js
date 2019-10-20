import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './ToggleMenu.scss';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="toggle-btn">
      <MenuIcon onClick={handleClick}/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="toggle-menu"
      >
        <Link to='/search' className="toggle-menu-link">
          <MenuItem onClick={handleClose}>
            <Typography color="textPrimary">
              Знайти школи
            </Typography>
          </MenuItem>
        </Link>
        <Link to='/news' className="toggle-menu-link">
          <MenuItem onClick={handleClose}>
            <Typography color="textPrimary">
              Новини
            </Typography>
          </MenuItem>
        </Link>
        <Link to='/hi' className="toggle-menu-link">
          <MenuItem onClick={handleClose}>
            <Typography color="textPrimary">
              Рейтинги
            </Typography>
          </MenuItem>
        </Link>
        <Link to='/vacancies' className="toggle-menu-link">
          <MenuItem onClick={handleClose}>
            <Typography color="textPrimary">
              Вакансії
            </Typography>
          </MenuItem>
        </Link>
        <Link to='/contacts' className="toggle-menu-link">
          <MenuItem onClick={handleClose}>
            <Typography color="textPrimary">
              Контакти
            </Typography>
          </MenuItem>
        </Link>
        <Link to='/about' className="toggle-menu-link">
          <MenuItem onClick={handleClose}>
            <Typography color="textPrimary">
              Про проект
            </Typography>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}