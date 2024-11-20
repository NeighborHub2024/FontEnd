import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { checkPhone, register } from '../../services/accountService';


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

const SignUp = () => {
  const location = useLocation();
  const phoneState = location.state?.phone || '';
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission before validation

    const isValid = validateInputs();
    if (!isValid) return;

    const emailValue = document.getElementById('email').value;
    const passwordValue = document.getElementById('password').value;
    const usernameValue = document.getElementById('username').value;

    setLoading(true); // Set loading to true before API call

    try {
      const response = await register({ email: emailValue, phone: phoneState, password: passwordValue, username: usernameValue });
      console.log(response);
      if (response.data === "User registered successfully!") {
        toast.success('Đăng ký thành công!'); // Show success message
        navigate('/login'); // Navigate to the login page after successful registration
      } else {
        toast.error('Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Đăng ký thất bại. Vui lòng thử lại.'); // Show error message
    } finally {
      setLoading(false); // Reset loading state after API call
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const username = document.getElementById('username');

    let isValid = true;

    // Validate email format
    const isValidEmail = /\S+@\S+\.\S+/.test(email.value);
    if (!email.value || !isValidEmail) {
      setEmailError(true);
      setEmailErrorMessage('Vui lòng nhập mail đúng!.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // Validate password length
    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password ít nhất 6 ký tự.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    // Validate username (non-empty)
    if (!username.value) {
      setUsernameError(true);
      setUsernameErrorMessage('Username là Họ Và Tên của bạn.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '97vh' }}>
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              name="email"
              placeholder="youremail@example.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">SĐT</FormLabel>
            <TextField
              id="phone"
              name="phone"
              placeholder={phoneState}
              autoComplete="tel"
              required
              fullWidth
              variant="outlined"
              color={'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="username">Họ và Tên</FormLabel>
            <TextField
              error={usernameError}
              helperText={usernameErrorMessage}
              id="username"
              name="username"
              placeholder="Họ và Tên"
              required
              fullWidth
              variant="outlined"
              color={usernameError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              id="password"
              name="password"
              placeholder="••••••"
              type="password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Bạn đã có tài khoản?{' '}
            <span>
              <Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
                Đăng Nhập
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUp;
