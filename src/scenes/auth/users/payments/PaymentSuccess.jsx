import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaFontAwesome } from 'react-icons/fa';
import api from '../../../../config/axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../utils/hooks/AuthContext';

const PaymentSuccessPage = () => {
 // Get the path parameter (userId) from the URL
  const { userId } = useParams();  
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { token } = useAuth();

  // Extract query parameters
  const code = queryParams.get('code');
  const id = queryParams.get('id');
  const cancel = queryParams.get('cancel');
  const status = queryParams.get('status');
  const orderCode = queryParams.get('orderCode');

  console.log("userid: " + userId);
  useEffect(() => {
    handleAddPoint();
  }, []);

  const handleAddPoint = async () => {
    try {
      setIsLoading(true);
  // Handle the add point logic here
      const access_token = token();
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      const payment = await api.get(`https://api-merchant.payos.vn/v2/payment-requests/${orderCode}`);
      const transaction = await api.get(`/transaction/getTransactionByDetail/${orderCode}`);
      if(payment.data.desc === "success" || transaction.data.code === 200) {
        if(payment.data.data.status === "PAID" && transaction.data.data.status === "completed") {
          if(transaction.data.data.details === orderCode) {
            const response = await api.post(`/transaction/addAmountIntoAccountUser?amount=${transaction.data.data.transactionAmount}&userId=${userId}`);
            if(response.data.code === 200) {
              toast.success("Thanh toan thanh cong");
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5, marginTop: 20 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <FaFontAwesome name="check-circle" color="success" sx={{ fontSize: 80 }} />
        </Box>
         {isLoading ? (
           <Typography variant="h4" sx={{ marginBottom: 2, color: 'green' }}>
            Bạn vui lòng đợi xíu để hệ thống add điểm cho bạn.
          </Typography>
         ) : (
           <Typography variant="h4" sx={{ marginBottom: 2, color: 'green' }}>
            Đã add thành công vào tài khoản của bạn
          </Typography>
         )}
        <Typography variant="h4" sx={{ marginBottom: 2, color: 'green' }}>
          Order ID của bạn: {orderCode}
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 2, color: 'green' }}>
          Trạng thái: {status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 2, color: 'green' }}>
          Thanh Toán Thành Công!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Thanh toán của bạn đã được xử lý thành công.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToHome}
          sx={{ marginTop: 2 }}
        >
          Quay về Trang Chủ
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentSuccessPage;
