import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');  // Detect small screens

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, py: 4 }}>
      <Typography 
        variant={isSmallScreen ? 'h5' : 'h4'} 
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'error.main' }}
      >
        Unauthorized Access
      </Typography>
      <Typography 
        variant="body1" 
        color="textSecondary" 
        paragraph
        sx={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}
      >
        You do not have permission to view this page.
      </Typography>
      <Box mt={4} sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/')}
          sx={{
            padding: '10px 20px',
            fontSize: isSmallScreen ? '0.875rem' : '1rem',
            marginBottom: isSmallScreen ? '10px' : 0,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Go to Home
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          sx={{
            marginLeft: isSmallScreen ? 0 : 2,
            padding: '10px 20px',
            fontSize: isSmallScreen ? '0.875rem' : '1rem',
            '&:hover': {
              backgroundColor: 'secondary.light',
            },
          }}
          onClick={() => navigate('/logout')}
        >
          Logout to Login again!
        </Button>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
