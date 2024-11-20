import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import { FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../utils/hooks/AuthContext';

const AddPoint = () => {
  const navigate = useNavigate();
  const {token} = useAuth();

  const handleAddPoints = () => {
    if(token() == null)
      navigate('/login', { state: { from: '/add-point' } });
    else
    navigate('/user/profile');
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 5, marginTop: 8 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60 }}>
            <FaCreditCard color="white" size={30} />
          </Avatar>
        </Box>

        <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Chào mừng đến với dịch vụ của chúng tôi!
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: 3, color: 'gray' }}>
          Bạn có thể thêm điểm vào tài khoản của mình để nhận nhiều ưu đãi hấp dẫn. 
          Cảm ơn bạn đã chọn dịch vụ của chúng tôi.
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Cộng điểm ngay hôm nay và tận hưởng những ưu đãi đặc biệt!
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 3, color: 'gray' }}>
          Chỉ với một vài bước thanh toán, bạn sẽ nhận được điểm vào tài khoản của mình để sử dụng.
        </Typography>

        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ backgroundColor: '#e3f2fd', padding: 2, borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="h6">Điểm Là Gì?</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Điểm sẽ tương đương với tiền VNĐ khi add vào tài khoản của bạn sẽ sử dụng được trong App NeighborHub của chúng mình
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ backgroundColor: '#e8f5e9', padding: 2, borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="h6">Số điểm bạn sẽ nhận:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                2000 điểm sẽ tương đương với 2000 đồng, hay còn gọi là hai nghìn đồng, giúp bạn có thể bắt đầu các cuốc xe ngay lập tức.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, padding: '12px 24px' }}
          onClick={handleAddPoints}
        >
          Thêm điểm vào tài khoản
        </Button>
      </Paper>
    </Container>
  );
};

export default AddPoint;
