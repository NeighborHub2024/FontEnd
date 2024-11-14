import React, { useState } from 'react';
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
} from '@mui/material';
import { useAuth } from '../../../../utils/hooks/AuthContext';
import api from '../../../../config/axios';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { addTransaction } from '../../../../services/accountService';

const generateSignature = (dataString, key) => {
  return CryptoJS.HmacSHA256(dataString, key).toString(CryptoJS.enc.Hex);
};

const Profile = () => {
  const { user, token } = useAuth();
  const [userInfo, setUserInfo] = useState(user);
  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState(2000);
  const [error, setError] = useState('');

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setAmount('');
    setError('');
  };

  const generateOrderCode = () => {
    return Math.floor(Date.now() / 1000); // Timestamp in seconds
  };

  const handleAddPoint = async () => {
    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    setError('');

    const expirationTimestamp = Math.floor(Date.now() / 1000) + 5 * 60;
    const cancelUrl = "http://localhost:5173/user/payment-success";
    const description = `userID-${userInfo.userId}`;
    const orderCode = generateOrderCode();
    const returnUrl = `http://localhost:5173/user/payment-success/${userInfo.userId}`;
    
    // Create data string for signature
    const dataString = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
    
    // Replace with your actual checksum key
    const CHECKSUM_KEY = '1bbb1e6d5fad1d374c947c1158e2762f3a2011fb7c85cfcb85f4f483bd69897b';
    
    // Generate signature
    const signature = generateSignature(dataString, CHECKSUM_KEY);

    try {
      // Define the parameters
      const params = {
        orderCode: orderCode.toString(),          
        amount: amount,
        userId: userInfo.userId  
      };

      console.log(params);

        const transaction = await addTransaction(params);
        if(transaction.data.code === 200) {
          const response = await axios.post('https://api-merchant.payos.vn/v2/payment-requests', {
          orderCode,
          amount: amount,
          description,
          buyerName: userInfo.username,
          buyerEmail: userInfo.email,
          buyerPhone: userInfo.phone,
          buyerAddress: "Không có",
          cancelUrl,
          returnUrl,
          expiredAt: expirationTimestamp,
          signature,
        }, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-client-id': 'ac7221c8-dee5-4b59-826f-ee91f20e1421',
            'x-api-key': '406a04cc-3e36-4569-a810-9db046de527a'
          },
        } );
        console.log(response.data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error adding points:', error);
    }
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    setError(value < 2000? 'Điểm phải trên hoặc bằng 2000' : '');
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
            label="Amount"
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
          <Button onClick={handleAddPoint} color="primary" disabled={Boolean(error)}>
            Nạp Điểm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
