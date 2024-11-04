// Login.js
import React, { useState } from 'react';
import { useAuth } from '../../utils/hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify'; // Import toast

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // For phone or email
  const [password, setPassword] = useState(''); // For password
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before API call
    try {
      const response = await login(identifier, password); // Pass identifier and password to login function
      if (response.status === 200) {
        toast.success('Login successful!'); // Show success message
        navigate('/'); // Navigate to the desired page on successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.'); // Show error message
    } finally {
      setLoading(false); // Reset loading state after API call
    }
  };

  return (
    <Container maxWidth="sm" style={{ height: '100vh', overflow: 'auto' }}>
      <Box 
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={8}
        p={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Phone or Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging In...' : 'Log In'} {/* Change button text while loading */}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
