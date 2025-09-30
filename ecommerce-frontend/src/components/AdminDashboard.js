import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cardItems = [
    {
      title: 'Quản lý Người dùng',
      icon: <PeopleIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
      link: '/admin/users',
    },
    {
      title: 'Quản lý Sản phẩm',
      icon: <InventoryIcon sx={{ fontSize: 50, color: 'success.main' }} />,
      link: '/admin/products',
    },
    {
      title: 'Quản lý Đơn hàng',
      icon: <ShoppingCartIcon sx={{ fontSize: 50, color: 'warning.main' }} />,
      link: '/admin/orders',
    },
  ];

  return (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    <Box mt={2}>
      {/* Hero Header Section */}
      <Box 
        sx={{ 
          textAlign: 'center',
          mb: 6,
          p: 5,
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(229, 57, 53, 0.1))',
          border: '1px solid rgba(244, 67, 54, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #f44336, #e53935, #f44336)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' }
            }
          }
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f44336, #e53935)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            fontSize: '48px',
            boxShadow: '0 15px 50px rgba(244, 67, 54, 0.3)',
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.05)' }
            }
          }}
        >
          👑
        </Box>
        <Typography 
          variant="h2" 
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(45deg, #f44336, #e53935)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            letterSpacing: '2px'
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 300,
            color: 'text.secondary',
            mb: 1
          }}
        >
          Xin chào, <strong style={{ fontWeight: 700 }}>{user?.username}</strong>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý toàn bộ hệ thống từ bảng điều khiển này
        </Typography>
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {cardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '24px',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  background: `linear-gradient(90deg, 
                    ${index % 3 === 0 ? '#667eea, #764ba2' : 
                      index % 3 === 1 ? '#4CAF50, #45a049' : 
                      '#FF9800, #F57C00'})`,
                },
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                  '& .icon-container': {
                    transform: 'scale(1.15) rotate(5deg)',
                  },
                  '& .access-button': {
                    transform: 'scale(1.05)',
                  }
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box 
                  className="icon-container"
                  sx={{ 
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    transition: 'all 0.4s ease',
                    '& > *': {
                      fontSize: '64px',
                      filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))'
                    }
                  }}
                >
                  {item.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: 'text.primary'
                  }}
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  {item.description || 'Quản lý và theo dõi hệ thống'}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'center', pb: 4 }}>
                <Button
                  className="access-button"
                  variant="contained"
                  onClick={() => navigate(item.link)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '16px',
                    fontSize: '15px',
                    fontWeight: 700,
                    textTransform: 'none',
                    background: `linear-gradient(45deg, 
                      ${index % 3 === 0 ? '#667eea 30%, #764ba2 90%' : 
                        index % 3 === 1 ? '#4CAF50 30%, #45a049 90%' : 
                        '#FF9800 30%, #F57C00 90%'})`,
                    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Truy Cập
                    <span style={{ fontSize: '18px' }}>→</span>
                  </Box>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Logout Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: 6
        }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.05), rgba(229, 57, 53, 0.05))',
            border: '1px solid rgba(244, 67, 54, 0.2)',
            textAlign: 'center',
            minWidth: '400px'
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            🔐 Phiên Làm Việc
          </Typography>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 700,
              textTransform: 'none',
              borderColor: 'error.main',
              color: 'error.main',
              borderWidth: '2px',
              '&:hover': {
                borderColor: 'error.dark',
                bgcolor: 'error.main',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(244, 67, 54, 0.3)',
                borderWidth: '2px',
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              Đăng Xuất Khỏi Admin
            </Box>
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Kết thúc phiên quản trị và quay về trang chủ
          </Typography>
        </Box>
      </Box>

      {/* Quick Stats Section (Optional Enhancement) */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          📊 Thống Kê Nhanh
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
                -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Người dùng
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#4CAF50', mb: 1 }}>
                -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sản phẩm
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF9800', mb: 1 }}>
                -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đơn hàng
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
);
};

export default AdminDashboard;
