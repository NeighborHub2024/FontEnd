// src/pages/UnauthorizedPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        You do not have permission to view this page.
      </Typography>
      <Box mt={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          sx={{ ml: 2 }}
          onClick={() => navigate('/logout')}
        >
          Logout to Login again!
        </Button>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
