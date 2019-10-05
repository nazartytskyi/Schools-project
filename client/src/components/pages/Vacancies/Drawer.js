import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SpreadSearch from './SpreadSearch/SpreadSearch';
import './Drawer.scss';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  // root: {
  //   display: 'flex',
  // },
  // appBar: {
  //   transition: theme.transitions.create(['margin', 'width'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  //   transition: theme.transitions.create(['margin', 'width'], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  hide: {
    display: 'none',
  },
  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  //   height: 100
  // },
  // drawerPaper: {
  //   width: drawerWidth,
  // },
  // drawerHeader: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: theme.spacing(0, 1),
  //   ...theme.mixins.toolbar,
  //   justifyContent: 'flex-end',
  // },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   marginLeft: -drawerWidth,
  // },
  // contentShift: {
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log(props.width);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const chooseSide = (e) => {
    return e < 800 ? 'top' : 'left'
  }

  return (
    <div className="filter-drawer">
{/*       
      <AppBar
        position="fixed"
        // className={clsx(classes.appBar, {
        //   [classes.appBarShift]: open,
        // })}
      > */}
        
          <Button
            variant="contained"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            Розширений пошук
          </Button>
        
        
      {/* </AppBar> */}
 
      <Drawer
       
     
        variant="persistent"
        anchor={chooseSide(props.width)}
        open={open}
        // classes={{
        //   paper: classes.drawerPaper,
        // }}
        className="drawer-search"
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <SpreadSearch schools={props.schools}
                              uniqueDistricts={props.uniqueDistricts}
                              filterByEmployment={props.filterByEmployment} 
                              className="sidebar"
                              setFilter={props.setFilter}
                              filterBySchool={props.filterBySchool} 
                              isCityChosen={props.isCityChosen}
                              
                />
      </Drawer>
    </div>
  );
}





// const chooseSide = (e) => {
//   return e < 800 ? 'top' : 'left'
// }