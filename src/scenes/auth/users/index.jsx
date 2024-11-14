import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

const Users = () => {
  return (
    <>
      <Navbar />
      <Container component="main" sx={{ py: 4, minHeight: '80vh' }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Users;
