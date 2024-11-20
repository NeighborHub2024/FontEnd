import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Button, CircularProgress } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaFontAwesome } from 'react-icons/fa';
import api from '../../../../config/axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../utils/hooks/AuthContext';
import axios from 'axios';

const PaymentSuccessPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentOs, setPaymentOs] = useState({});
  const [transaction, setTransaction] = useState({});
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // Extract query parameters
  const code = queryParams.get('code');
  const id = queryParams.get('id');
  const cancel = queryParams.get('cancel');
  const status = queryParams.get('status');
  const orderCode = queryParams.get('orderCode');

  useEffect(() => {
    handleCheckPayment();
  }, []);

  useEffect(() => {
    handleAddPoint();
  }, [transaction]);

  const handleCheckPayment = async () => {
    try {
      const payment = await axios.get(`https://api-merchant.payos.vn/v2/payment-requests/${orderCode}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-client-id': 'ac7221c8-dee5-4b59-826f-ee91f20e1421',
          'x-api-key': '406a04cc-3e36-4569-a810-9db046de527a',
        },
      });
      if (payment.data.desc === "success") {
        setPaymentOs(payment);
      }
      const transactionBe = await api.get(`/transaction/getTransactionByDetail/${payment.data.data.orderCode}`);
      if (transactionBe.data.code === 200) {
        setTransaction(transactionBe);
      }
    } catch (error) {
      toast.error("Có lỗi gì đó!");
    }
  };

  const handleAddPoint = async () => {
    try {
      setIsLoading(true);
      if (paymentOs.data.desc === "success" && transaction.data.code === 200) {
        if (paymentOs.data.data.status === "PAID" && transaction.data.data.status === "Pending") {
          if (transaction.data.data.details === orderCode) {
            const response = await api.post(`/transaction/addAmountIntoAccountUser?amount=${transaction.data.data.transactionAmount}&userId=${userId}&orderCode=${orderCode}`);
            if (response.data.code === 200) {
              toast.success("Thanh toán thành công");
            }
          }
        } else {
          toast.error("Thanh toán thất bại");
          setIsLoading(false);
          setIsPaid(true);
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Đã xảy ra lỗi khi xử lý thanh toán.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5, marginTop: 5 }}>
      <Paper sx={{ padding: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <FaFontAwesome name="check-circle" color={isPaid ? 'red' : 'green'} sx={{ fontSize: 80 }} />
        </Box>

        {isLoading ? (
          <Typography variant="h5" sx={{ marginBottom: 2, color: 'green' }}>
            Bạn vui lòng đợi xíu để hệ thống add điểm cho bạn.
            <CircularProgress sx={{ marginLeft: 2 }} size={24} />
          </Typography>
        ) : (
          <Typography variant="h4" sx={{ marginBottom: 2, color: isPaid ? 'red' : 'green' }}>
            {isPaid ? 'Bạn đã thanh toán rồi!' : 'Đã add thành công vào tài khoản của bạn'}
          </Typography>
        )}

        <Typography variant="h6" sx={{ marginBottom: 2, color: 'green' }}>
          Order ID của bạn: {orderCode}
        </Typography>

        <Typography variant="h6" sx={{ marginBottom: 2, color: 'green' }}>
          Trạng thái: {status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Thanh toán của bạn đã được xử lý thành công.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToHome}
          sx={{ padding: '10px 20px', borderRadius: 3 }}
        >
          Quay về Trang Chủ
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentSuccessPage;
