import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../utils/hooks/AuthContext';
import { IconButton, Menu, MenuItem, Avatar, Drawer, List, ListItem, Divider, useMediaQuery, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { isAuthenticated, isRole, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  
  const isMobile = useMediaQuery('(max-width:600px)');  // Detect if it's a mobile device

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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = (
    <>
      <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>Trang Chủ</Button>
      <Button color="inherit" component={Link} to="/add-point" sx={{ marginRight: 2 }}>Nạp Điểm</Button>
      <Button color="inherit" component={Link} to="/privacy" sx={{ marginRight: 2 }}>Privacy</Button>
      <Button color="inherit" component={Link} to="/terms">Terms and Conditions</Button>
    </>
  );

  const mobileMenu = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
        <List>
          {isAuthenticated() ? (
            <>
              <ListItem button component={Link} to="/user/profile">Thông Tin Cá Nhân</ListItem>
              <ListItem button onClick={handleLogout}>Đăng Xuất</ListItem>
            </>
          ) : (
            <ListItem button component={Link} to="/login">Đăng Nhập</ListItem>
          )}
        </List>
        <Divider />
        {menuItems}
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', boxShadow: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          NeighborHub - Ride Sharing
        </Typography>

        {/* Show mobile menu on small screens */}
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer} sx={{ marginLeft: 2 }}>
              <MenuIcon />
            </IconButton>
            {mobileMenu}
          </>
        ) : (
          <>
            {menuItems}
            {!isAuthenticated() ? (
              <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: 600 }}>
                Đăng Nhập
              </Button>
            ) : (
              <div>
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
                  PaperProps={{
                    sx: { minWidth: 180 },
                  }}
                >
                  <MenuItem onClick={handleMenuClose} 
                    component={Link}
                    to="/user/profile">
                      Thông Tin Cá Nhân
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
                </Menu>
              </div>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
