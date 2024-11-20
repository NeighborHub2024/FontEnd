import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Users = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',  // Ensure the page takes up the full height
      }}
    >
      <Navbar />
      <Container
        component="main"
        sx={{
          py: 4,
          flexGrow: 1,  // Makes the content area grow and push the footer to the bottom
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Users;
