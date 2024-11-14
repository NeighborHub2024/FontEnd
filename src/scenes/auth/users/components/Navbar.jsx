import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../utils/hooks/AuthContext';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = () => {
  const {isAuthenticated, isRole, user, logout} = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null); // Close the menu after logout
  };

  return (
  <AppBar position="fixed">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        NeighborHub - Ride Sharing
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/privacy">Privacy</Button>
      <Button color="inherit" component={Link} to="/terms">Terms and Conditions</Button>
      {!isAuthenticated() ? <Button color="inherit" component={Link} to="/login">Login</Button> : <div>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <Avatar alt={user?.name} src={user?.avatar || ''}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/user/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>}
    </Toolbar>
  </AppBar>)
};

export default Navbar;
