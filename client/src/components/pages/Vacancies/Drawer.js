import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SpreadSearch from './SpreadSearch/SpreadSearch';
import './Drawer.scss';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton)}
      >
        Фільтр
      </Button>
      <Drawer
        variant="persistent"
        anchor='left'
        open={open}
        className="drawer-search"
      >
        <CardContent className="filter-drawer">
          <div className={classes.drawerHeader} >
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider/>
          <SpreadSearch 
            schools={props.schools}
            uniqueDistricts={props.uniqueDistricts}
            filterByEmployment={props.filterByEmployment} 
            setFilter={props.setFilter}
            isCityChosen={props.isCityChosen}                  
          />
        </CardContent>
      </Drawer>
    </div>
  );
}