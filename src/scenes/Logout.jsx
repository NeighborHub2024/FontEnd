// src/pages/LogoutPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth } from '../utils/hooks/AuthContext';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Logout logic: Clear authentication data and redirect
  useEffect(() => {
    logout();
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Redirect after 2 seconds to show logout message
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Logging Out...
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        You have been logged out successfully. Redirecting to the login page...
      </Typography>
      <Box mt={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/login')}
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default LogoutPage;
