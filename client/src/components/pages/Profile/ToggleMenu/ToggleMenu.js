import React from 'react';
import propTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './ToggleMenu.scss';
import MenuIcon from '@material-ui/icons/Menu';

export default function ProfileToggleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let list = props.menuItems.map(item => {
    return <MenuItem key={item.key}>{item} </MenuItem>;
  });
  return (
    <div className="profile-toggle-btn">
      <MenuIcon onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="profile-toggle-menu"
      >
        {list}
      </Menu>
    </div>
  );
}

ProfileToggleMenu.propTypes = {
  menuItems: propTypes.array
};
