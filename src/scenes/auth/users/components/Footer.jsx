import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');  // Detect small screens

  return (
    <Box
      component="footer"
      sx={{
        py: isSmallScreen ? 2 : 3,  // Adjust padding on small screens
        mt: 'auto',
        backgroundColor: '#f5f5f5',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container maxWidth="sm">
        <Typography 
          variant={isSmallScreen ? 'body2' : 'body1'}  // Smaller font size for mobile
          align="center"
          sx={{ fontSize: isSmallScreen ? '0.875rem' : '1rem' }}  // Font size for mobile
        >
          © 2024 NeighborHub - Ride Sharing. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
