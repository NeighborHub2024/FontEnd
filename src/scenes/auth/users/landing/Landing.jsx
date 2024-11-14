import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaCar, FaUsers, FaShieldAlt } from 'react-icons/fa'; // Example icons for features
import landingImage from "../../../../assets/images/ride-sharing-image.jpg";


const LandingPage = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${landingImage})`, // Your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
            zIndex: 1,
          }}
        />
        <Box sx={{ maxWidth: '600px',
            textAlign: 'center',
            position: 'relative', // To ensure the content stays above the overlay
            zIndex: 2,
            color: 'white', }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            Share Rides, Save Time, Save Money
          </Typography>
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            Connect with neighbors for affordable, reliable, and eco-friendly rides.
          </Typography>
          <Box sx={{ marginTop: '2rem' }}>
            <Link to="/signup">
              <Button 
                variant="contained" 
                sx={{
                  backgroundColor: '#FF7F50',
                  padding: '1rem 3rem',
                  fontSize: '1.25rem',
                  borderRadius: '25px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: '#FF5722',
                  },
                }}
              >
                Join Us Now
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ padding: '4rem 2rem' }}>
        <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Why Choose NeighborHub?
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 4,
            marginTop: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <FaCar size={50} color="#FF7F50" />
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
              Affordable Rides
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              Get to your destination at a fraction of the cost.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <FaUsers size={50} color="#FF7F50" />
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
              Community-Driven
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              Share rides with your neighbors and save money.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <FaShieldAlt size={50} color="#FF7F50" />
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
              Safe & Secure
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              Ride with peace of mind knowing safety is our priority.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
