import React, { Component } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from 'material-ui';
import DashboardIcon from 'material-ui-icons/Dashboard';

import Logged from './Logged';

const MAP_TITLE_PATH = [
  {
    pathname: '/',
    title: 'Login'
  },
  {
    pathname: '/home',
    title: 'Home'
  },
  {
    pathname: '/loan',
    title: 'Loan Application'
  },
  {
    pathname: '/add-user',
    title: 'Add New User'
  }
];

class Header extends Component {
  render() {
    const {
      pathname,
      isAuthenticated,
      history,
      setIsAuthenticated
    } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{
              marginLeft: -12,
              marginRight: 20
            }}
            color="inherit"
            aria-label="Dashboard">
            <DashboardIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={{ flex: 1 }}>
            {MAP_TITLE_PATH.find(path => path.pathname === pathname).title}
          </Typography>
          {isAuthenticated && (
            <Logged history={history} setIsAuthenticated={setIsAuthenticated} />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
