import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import ForgotPassword from './components/ForgotPassword';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/AuthContext';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const LoginPage = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Loading state
  const {login} = useAuth();

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission before validation

    const isValid = validateInputs();
    if (!isValid) return;

    const emailOrPhoneValue = document.getElementById('email-or-phone').value;
    const passwordValue = document.getElementById('password').value;

    setLoading(true); // Set loading to true before API call

    try {
      // Pass emailOrPhone and password to the login function
      const response = await login(emailOrPhoneValue, passwordValue);
      if (response.status === 200) {
        toast.success('Login successful!'); // Show success message
        navigate('/'); // Navigate to the home page on successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.'); // Show error message
    } finally {
      setLoading(false); // Reset loading state after API call
    }
  };

  const validateInputs = () => {
    const emailOrPhone = document.getElementById('email-or-phone');
    const password = document.getElementById('password');

    let isValid = true;
    const emailOrPhoneValue = emailOrPhone.value;

    // Validate email or phone format
    const isValidEmail = /\S+@\S+\.\S+/.test(emailOrPhoneValue);
    const isValidPhone = /^[0-9]{10}$/.test(emailOrPhoneValue);

    if (!emailOrPhoneValue || (!isValidEmail && !isValidPhone)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email or phone number.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '97vh' }}>
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="email-or-phone">Email or Phone</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email-or-phone"
              name="email-or-phone"
              placeholder="your@email.com / 0123456789"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'baseline' }}>
                Forgot your password?
              </Link>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button type="submit" fullWidth variant="contained">
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign in'}
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <span>
              <Link href="/material-ui/getting-started/templates/sign-in/" variant="body2" sx={{ alignSelf: 'center' }}>
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;