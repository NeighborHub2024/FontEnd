import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Alert, CircularProgress, Button } from '@mui/material';
import { cancelTransaction } from '../../../../services/accountService';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import { HiOutlineXCircle } from "react-icons/hi2";

const PaymentCancel = () => {
    const navigate = useNavigate();
    const { orderCode } = useParams();
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [payment, setPayment] = useState(null);
    const [isReturn, setIsReturn] = useState(null);
    const [loading, setLoading] = useState(true);  // Add loading state

    useEffect(() => {
        handleCancel();
        getPaymentDetail();
    }, []);

    useEffect(() => {
        if (isReturn === 0) {
            navigate('/user/profile');
        } else if (isReturn > 0) {
            const countdown = setInterval(() => {
                setIsReturn((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [isReturn, navigate]);

    const getPaymentDetail = async () => {
        try {
            const response = await axios.get(`https://api-merchant.payos.vn/v2/payment-requests/${orderCode}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-client-id': 'ac7221c8-dee5-4b59-826f-ee91f20e1421',
                    'x-api-key': '406a04cc-3e36-4569-a810-9db046de527a'
                },
            });
            setPayment(response.data.data);
            if (response.data.data?.status === "EXPIRED") {
                setIsReturn(3);
            }
        } catch (error) {
            setError('Failed to fetch payment details. Please try again.');
        } finally {
            setLoading(false);  // Set loading to false once data is fetched
        }
    };

    const handleCancel = async () => {
        setStatus('Cancelling');
        try {
            const response = await cancelTransaction(orderCode);
            if (response.data.code === 200) {
                setStatus('Cancelled');
                setIsReturn(3);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            setStatus('');
            setError('Failed to cancel payment. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
            sx={{ maxWidth: 600, margin: 'auto', marginTop: 5 }}
        >
            <Typography variant="h3" gutterBottom>
                Cancel Payment
            </Typography>

            {loading ? (
                <CircularProgress size={50} />
            ) : (
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item>
                        {payment?.status === "EXPIRED" ? (
                            <HiOutlineXCircle color="red" style={{ fontSize: 80 }} />
                        ) : (
                            <FaCheckCircle color="green" style={{ fontSize: 80 }} />
                        )}
                    </Grid>
                    <Grid item>
                        {isReturn !== null && (
                            <Typography variant="h5" sx={{ color: 'green' }}>
                                Trang sẽ tự động quay về sau: {isReturn} giây
                            </Typography>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" sx={{ color: 'green' }}>
                            Order ID của bạn: {orderCode || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item>
                        {payment ? (
                            payment.status === "EXPIRED" ? (
                                <Typography variant="h5" sx={{ color: 'red' }}>
                                    Trạng thái: Đã Hết Hạn
                                </Typography>
                            ) : (
                                <Typography variant="h5" sx={{ color: 'green' }}>
                                    Trạng thái: {payment.status === "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}
                                </Typography>
                            )
                        ) : (
                            <Typography variant="h5" sx={{ color: 'red' }}>
                                Trạng thái: Không có dữ liệu
                            </Typography>
                        )}
                    </Grid>

                    <Grid item>
                        <Typography variant="h5" sx={{ color: 'green' }}>
                            Điểm Nạp Yêu Cầu: {payment?.amount ? `${payment.amount} điểm` : "N/A"}
                        </Typography>
                    </Grid>

                    {error && (
                        <Grid item>
                            <Alert severity="error">{error}</Alert>
                        </Grid>
                    )}

                    {status === 'Cancelled' && !error && (
                        <Grid item>
                            <Alert severity="success">Payment successfully cancelled.</Alert>
                        </Grid>
                    )}

                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => navigate('/user/profile')}
                        >
                            Go to Profile
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default PaymentCancel;
