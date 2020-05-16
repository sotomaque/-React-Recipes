import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Signout from './Auth/Signout';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ session }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
                <MenuIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            eRecipes
          </Typography>
          {
            session && session.getCurrentUser ? <NavBarAuth /> : <NavBarUnAuth />
          }          
        </Toolbar>
      </AppBar>
    </div>
  );
}

const NavBarUnAuth = () => (
    <Link to='/signin' style={{color: 'inherit', textDecoration: 'none'}}>
        <Button color="inherit">Login</Button>
    </Link>
)

const NavBarAuth = () => (
    <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
        <Signout />
    </Link>
)

export default Navbar;