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
import { checkPhone, sendOTP } from '../../../services/accountService';
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

const SendOTP = () => {
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validatePhone();
    if (!isValid) return;

    setLoading(true);

    const isPhoneExisted = await checkPhone(phone);
    console.log(isPhoneExisted);
    if (!isPhoneExisted) {
      const response = await sendOTP(phone);
      if (response != null && response.status === 200) {
        toast.success('OTP đã được xác minh thành công!');
        navigate('/verify-otp', { state: { phone: phone } });
      } else {
        toast.error('Không gửi được OTP. Vui lòng thử lại.');
      }
    } else {
      toast.error('Số điện thoại đã tồn tại. Vui lòng sử dụng số khác để đăng ký.');
    }
    setLoading(false);
  };

  const validatePhone = () => {
    const phonePattern = /^[0-9]{10}$/; // Xác thực số điện thoại 10 chữ số
    if (!phone || !phonePattern.test(phone)) {
      setPhoneError(true);
      setPhoneErrorMessage('Vui lòng nhập một số điện thoại 10 chữ số hợp lệ.');
      return false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
      return true;
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Nhập Số Điện Thoại
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
            <TextField
              error={phoneError}
              helperText={phoneErrorMessage}
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              fullWidth
              variant="outlined"
              color={phoneError ? 'error' : 'primary'}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Gửi OTP'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default SendOTP;
