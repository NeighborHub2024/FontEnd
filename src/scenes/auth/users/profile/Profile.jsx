import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Avatar,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../../../utils/hooks/AuthContext';
import api from '../../../../config/axios';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { addTransaction } from '../../../../services/accountService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { payOsService } from '../../../../services/payOsService';

const generateSignature = (dataString, key) => {
  return CryptoJS.HmacSHA256(dataString, key).toString(CryptoJS.enc.Hex);
};

const generateOrderCode = () => {
  return Math.floor(Date.now() / 1000); // Timestamp in seconds
};

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(2000);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/user/getUser/${user.userId}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setAmount('');
    setError('');
  };

  const handleAddPoint = async () => {
    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    setError('');
    const orderCode = generateOrderCode();
    const expirationTimestamp = Math.floor(Date.now() / 1000) + 5 * 60;
    const cancelUrl = `http://34.126.80.91:5173/user/payment-cancel/${orderCode}`;
    const description = `userID-${userInfo.userId}`;
    const returnUrl = `http://34.126.80.91:5173/user/payment-success/${userInfo.userId}`;
    
    // Create data string for signature
    const dataString = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
    
    // Replace with your actual checksum key
    const CHECKSUM_KEY = '1bbb1e6d5fad1d374c947c1158e2762f3a2011fb7c85cfcb85f4f483bd69897b';
    
    // Generate signature
    const signature = generateSignature(dataString, CHECKSUM_KEY);

    try {
      setIsLoading(true);
      // Define the parameters
      const params = {
        orderCode: orderCode.toString(),          
        amount: amount,
        userId: userInfo.userId  
      };

      const requestBodyPayOs = {
          orderCode,
          amount,
          description,
          buyerName: userInfo.username,
          buyerEmail: userInfo.email,
          buyerPhone: userInfo.phone,
          buyerAddress: 'Không có',
          cancelUrl,
          returnUrl,
          expiredAt: expirationTimestamp,
          signature,
        }

      console.log(params);

      const transaction = await addTransaction(params);
      if (transaction.data.code === 200) {
        const response = await payOsService.createPayment(requestBodyPayOs);
        console.log(response.data);
        if (response.data.data.checkoutUrl) {
          window.location.href = response.data.data.checkoutUrl;
        }
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Có Lỗi Xảy Ra! Hãy đăng xuất và đăng nhập lại nhé");
      console.error('Error adding points:', error);
    }
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    setError(value < 2000 ? 'Điểm phải trên hoặc bằng 2000' : '');
  };

  if (!userInfo) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
      <Paper sx={{ padding: 3, marginTop: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginBottom: 3 }}>
          <Avatar sx={{ width: 100, height: 100 }} src="/profile-pic.jpg" alt="User Avatar" />
          <Typography variant="h4" sx={{ marginTop: 1 }}>{userInfo.username}</Typography>
          <Typography variant="body1" color="textSecondary">{userInfo.email}</Typography>
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6">Số điện thoại: {userInfo.phone}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6">Role: {userInfo.role}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6">Điểm: {userInfo.amount.toLocaleString()}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6">Trạng thái: {userInfo.status ? 'Hoạt động' : 'Bị Khóa'}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Button onClick={handleOpenModal} variant="contained" color="primary" sx={{ width: '48%' }}>Nạp Thêm Điểm</Button>
        </Box>
      </Paper>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Nạp Thêm Điểm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Điểm"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={handleAmountChange}
            error={Boolean(error)}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Hủy
          </Button>
          {isLoading ? <Button disabled color='primary'><CircularProgress size={24} /></Button> : <Button onClick={handleAddPoint} color="primary" disabled={Boolean(error)}>
            Nạp Điểm
          </Button>}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
