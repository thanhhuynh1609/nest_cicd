import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Paper,
  Avatar,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/order/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data);
      } catch (err) {
        setError('Không thể tải chi tiết đơn hàng');
      }
    };
    fetchOrder();
  }, [id, token]);

  if (error) {
    return (
      <Container maxWidth="md">
        <Typography color="error" align="center" mt={4}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="md">
        <Typography align="center" mt={4}>
          Đang tải...
        </Typography>
      </Container>
    );
  }

  return (
  <Container maxWidth="lg" sx={{ py: 6 }}>
    {/* Back Button */}
    <Button
      component={Link}
      to="/orders"
      sx={{
        mb: 4,
        color: '#667eea',
        fontWeight: 600,
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(102, 126, 234, 0.1)',
          transform: 'translateX(-4px)',
        },
      }}
    >
      ← Quay lại danh sách đơn hàng
    </Button>

    {/* Header Section */}
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        fontWeight="900"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        Chi tiết đơn hàng #{order.id}
      </Typography>
      <Typography variant="body1" sx={{ color: '#6b7280' }}>
        Xem chi tiết và theo dõi trạng thái đơn hàng của bạn
      </Typography>
    </Box>

    {/* Main Card */}
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #e5e7eb',
        borderRadius: 3,
        p: 4,
        background: '#ffffff',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      {/* Order Summary */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          mb: 4,
          p: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #f9fafb 100%)',
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: '#9ca3af',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              display: 'block',
              mb: 0.5,
            }}
          >
            Tổng giá trị
          </Typography>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {order.tongTien.toLocaleString('vi-VN')} VND
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{
              color: '#9ca3af',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              display: 'block',
              mb: 0.5,
            }}
          >
            Trạng thái
          </Typography>
          <Box
            sx={{
              display: 'inline-block',
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1rem',
              background:
                order.trangThai === 'Đã giao'
                  ? '#ecfdf5'
                  : order.trangThai === 'Đã hủy'
                  ? '#fef2f2'
                  : order.trangThai === 'Đang giao hàng'
                  ? '#fffbeb'
                  : '#f3f4f6',
              color:
                order.trangThai === 'Đã giao'
                  ? '#047857'
                  : order.trangThai === 'Đã hủy'
                  ? '#dc2626'
                  : order.trangThai === 'Đang giao hàng'
                  ? '#d97706'
                  : '#6b7280',
              border:
                order.trangThai === 'Đã giao'
                  ? '2px solid #10b981'
                  : order.trangThai === 'Đã hủy'
                  ? '2px solid #ef4444'
                  : order.trangThai === 'Đang giao hàng'
                  ? '2px solid #fbbf24'
                  : '2px solid #9ca3af',
            }}
          >
            {order.trangThai}
          </Box>
        </Box>
      </Box>

      <Box sx={{ my: 3, height: '1px', background: '#e5e7eb' }} />

      {/* Products Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{
            mb: 3,
            color: '#1f2937',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            fontSize: '0.95rem',
          }}
        >
          📦 Sản phẩm ({order.products.length})
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {order.products.map((p, index) => (
            <Paper
              key={index}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 3,
                p: 3,
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#f3f4f6',
                  borderColor: '#667eea',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.1)',
                },
              }}
            >
              {/* Product Image */}
              <Avatar
                variant="rounded"
                src={p.product.image || 'https://via.placeholder.com/120'}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  border: '2px solid #e5e7eb',
                  flexShrink: 0,
                }}
              />

              {/* Product Info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="h6"
                  fontWeight="700"
                  sx={{
                    mb: 1.5,
                    color: '#1f2937',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {p.product.title}
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, auto)' },
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9ca3af',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        display: 'block',
                        mb: 0.5,
                      }}
                    >
                      Số lượng
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="700"
                      sx={{ color: '#1f2937' }}
                    >
                      {p.quantity}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9ca3af',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        display: 'block',
                        mb: 0.5,
                      }}
                    >
                      Đơn giá
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="700"
                      sx={{ color: '#667eea' }}
                    >
                      {p.product.price.toLocaleString('vi-VN')} VND
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9ca3af',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        display: 'block',
                        mb: 0.5,
                      }}
                    >
                      Thành tiền
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="700"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {(p.product.price * p.quantity).toLocaleString('vi-VN')}{' '}
                      VND
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ my: 3, height: '1px', background: '#e5e7eb' }} />

      {/* Footer Info */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          p: 3,
          background: '#f9fafb',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#6b7280',
            fontStyle: 'italic',
          }}
        >
          📅 Ngày đặt hàng: {new Date(order.created).toLocaleDateString('vi-VN')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              fontWeight: 600,
              borderColor: '#667eea',
              color: '#667eea',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: '#f0f4ff',
                transform: 'scale(1.05)',
              },
            }}
          >
            In đơn hàng
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
              },
            }}
          >
            Liên hệ hỗ trợ
          </Button>
        </Box>
      </Box>
    </Paper>
  </Container>
);
};

export default OrderDetail;

