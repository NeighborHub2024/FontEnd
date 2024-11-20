import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const NotFound = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');  // Detect small screens

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 4,
      }}
    >
      <Typography
        variant={isSmallScreen ? 'h5' : 'h4'}
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: 'error.main',
        }}
      >
        404 - Page Not Found
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: isSmallScreen ? '0.875rem' : '1rem',
          color: 'textSecondary',
        }}
      >
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            padding: '10px 20px',
            fontSize: isSmallScreen ? '0.875rem' : '1rem',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
