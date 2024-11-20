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
import { verifyOTP } from '../../../services/accountService';
import { useLocation, useNavigate } from 'react-router-dom';

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

const VerifyOTP = () => {
  const location = useLocation();
  const phoneState = location.state?.phone || '';
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState(phoneState);
  const [otp, setOtp] = React.useState('');
  const [otpError, setOtpError] = React.useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateOtp();
    if (!isValid) return;

    setLoading(true);

    try {
      const res = await verifyOTP(phone, otp, navigate);
      if(res.status === 200) {
        navigate('/signup', { state: { phone: phone } });
      } else {
        toast.error('Không thể xác minh OTP. Vui lòng thử lại.');
      }
    } catch (error) {
      toast.error('Không thể xác minh OTP. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const validateOtp = () => {
    if (!otp || otp.length !== 4) {
      setOtpError(true);
      setOtpErrorMessage('OTP phải có 4 chữ số.');
      return false;
    } else {
      setOtpError(false);
      setOtpErrorMessage('');
      return true;
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Xác minh OTP
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
            <TextField
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              disabled
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="otp">OTP</FormLabel>
            <TextField
              error={otpError}
              helperText={otpErrorMessage}
              id="otp"
              name="otp"
              placeholder="Nhập OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              fullWidth
              variant="outlined"
              color={otpError ? 'error' : 'primary'}
              inputProps={{
                maxLength: 4, // Giới hạn OTP chỉ có 4 chữ số
                pattern: '[0-9]{4}', // Chỉ cho phép nhập chữ số
              }}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Xác minh OTP'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default VerifyOTP;
