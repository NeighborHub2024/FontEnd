import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaCar, FaUsers, FaShieldAlt } from 'react-icons/fa'; // Biểu tượng ví dụ cho các tính năng
import landingImage from "../../../../assets/images/ride-sharing-image.jpg";
import { useAuth } from '../../../../utils/hooks/AuthContext';

const LandingPage = () => {
  const {isAuthenticated} = useAuth();
  return (
    <Box sx={{ width: '100%' }}>
      {/* Phần Hero */}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${landingImage})`, // Đường dẫn ảnh của bạn
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ tối giúp văn bản dễ nhìn hơn
            zIndex: 1,
          }}
        />
        <Box sx={{
          maxWidth: '600px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          color: 'white',
          padding: { xs: '2rem', sm: '3rem' }, // Khoảng cách đáp ứng
        }}>
          <Typography variant="h2" sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // Kích thước phông chữ đáp ứng
          }}>
            Chia Sẻ Chuyến Đi, Tiết Kiệm Thời Gian, Tiết Kiệm Chi Phí
          </Typography>
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            Kết nối với hàng xóm để có chuyến đi tiết kiệm, đáng tin cậy và thân thiện với môi trường.
          </Typography>
          <Box sx={{ marginTop: '2rem' }}>
            <Link to="https://drive.google.com/uc?export=download&id=1fbhk0tbz8GCitb2lLnrp_U2dOvjB36Eq">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FF7F50',
                  padding: '1rem 3rem',
                  fontSize: '1.25rem',
                  borderRadius: '25px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: '#FF5722',
                  },
                }}
              >
                Tải Ngay
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Phần Tính Năng */}
      <Container sx={{ padding: { xs: '2rem', sm: '4rem 2rem' } }}>
        <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Tại Sao Chọn NeighborHub?
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, // Bố cục lưới đáp ứng
            gap: 4,
            marginTop: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <FaCar size={50} color="#FF7F50" />
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
              Chi Phí Hợp Lý
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              Đến đích với chi phí thấp hơn nhiều.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <FaUsers size={50} color="#FF7F50" />
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
              Cộng Đồng Định Hướng
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              Chia sẻ chuyến đi với hàng xóm và tiết kiệm chi phí.
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <FaShieldAlt size={50} color="#FF7F50" />
            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>
              An Toàn & Bảo Mật
            </Typography>
            <Typography sx={{ marginTop: 1 }}>
              Đi lại an toàn với sự ưu tiên hàng đầu của chúng tôi.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
