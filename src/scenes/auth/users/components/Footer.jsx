import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => (
  <Box position={'fixed'} component="footer" sx={{ py: 3, mt: 'auto', backgroundColor: '#f5f5f5', bottom: 0, left: 0, right: 0 }}>
    <Container maxWidth="sm">
      <Typography variant="body1" align="center">
        © 2024 NeighborHub - Ride Sharing. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
