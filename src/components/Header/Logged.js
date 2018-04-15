import React, { PureComponent } from 'react';
import { IconButton, Menu, MenuItem } from 'material-ui';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import CreditCardIcon from 'material-ui-icons/CreditCard';
import PowerIcon from 'material-ui-icons/PowerSettingsNew';

class Logged extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { history, setIsAuthenticated } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit">
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleClose}>
          <MenuItem
            onClick={() => {
              this.handleClose();
              history.push('/home');
            }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText inset primary="Home" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose();
              history.push('/loan');
            }}>
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText inset primary="Loan Application" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose();
              localStorage.clear();
              setIsAuthenticated(false);
              history.push('/');
            }}>
            <ListItemIcon>
              <PowerIcon />
            </ListItemIcon>
            <ListItemText inset primary="Logout" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default Logged;
