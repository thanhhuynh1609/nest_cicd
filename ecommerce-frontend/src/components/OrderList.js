import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  Divider,
  Grid,
  Avatar,
  Chip, // Thêm Chip để hiển thị trạng thái
} from '@mui/material';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const OrderList = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Không thể tải danh sách đơn hàng');
      }
    };
    fetchOrders();
  }, [token]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      try {
        const response = await api.delete(`/order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Cập nhật state để remove order khỏi list
        setOrders(orders.filter((order) => order.id !== orderId));
        
        // Hiển thị thông báo thành công
        console.log('Đơn hàng đã được xóa thành công');
        
      } catch (err) {
        console.error('Error deleting order:', err.response?.data || err.message);
        setError(`Không thể xóa đơn hàng: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
  <Container 
    maxWidth="lg" 
    sx={{ 
      py: 6,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}
  >
    <Box sx={{ mb: 8 }}>
      {/* Header Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 6, 
          gap: 2, 
          flexWrap: 'wrap' 
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            🛒 Đơn Hàng
          </Typography>
          <Typography variant="body1" sx={{ color: '#6b7280' }}>
            Quản lý và theo dõi đơn hàng của bạn
          </Typography>
        </Box>

        <Button
          variant="contained"
          component={Link}
          to="/orders/create"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            textTransform: 'none',
            px: 4,
            py: 1.5,
            fontWeight: 600,
            fontSize: '1rem',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          + Tạo đơn hàng mới
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Paper
          sx={{
            p: 2,
            mb: 4,
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 2,
            animation: 'slideDown 0.3s ease-out',
            '@keyframes slideDown': {
              from: { opacity: 0, transform: 'translateY(-10px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Typography sx={{ color: '#dc2626', fontWeight: 500 }}>
            ⚠️ {error}
          </Typography>
        </Paper>
      )}
    </Box>

    {/* Orders List */}
    {orders.length === 0 && !error ? (
      <Paper
        sx={{
          textAlign: 'center',
          py: 12,
          px: 4,
          borderRadius: 3,
          border: '2px dashed #e5e7eb',
          background: '#fafbfc',
        }}
      >
        <Typography variant="h5" fontWeight="700" sx={{ color: '#6b7280', mb: 2 }}>
          Chưa có đơn hàng nào
        </Typography>
        <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3 }}>
          Hãy tạo đơn hàng đầu tiên của bạn ngay
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/orders/create"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            textTransform: 'none',
            px: 4,
            py: 1,
            fontWeight: 600,
          }}
        >
          Tạo đơn hàng
        </Button>
      </Paper>
    ) : (
      <Stack spacing={3}>
        {orders.map((order, idx) => {
          const getStatusColor = (status) => {
            switch (status) {
              case 'Đã giao':
                return { bg: '#ecfdf5', text: '#047857', border: '#10b981' };
              case 'Đã hủy':
                return { bg: '#fef2f2', text: '#dc2626', border: '#ef4444' };
              case 'Đang giao hàng':
                return { bg: '#fffbeb', text: '#d97706', border: '#fbbf24' };
              default:
                return { bg: '#f3f4f6', text: '#6b7280', border: '#9ca3af' };
            }
          };

          const statusColor = getStatusColor(order.trangThai);

          return (
            <Paper
              key={order.id}
              elevation={0}
              sx={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 3,
                p: 4,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
                '&:hover': {
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
                  borderColor: '#667eea',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              {/* Order Header */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                mb={3}
                spacing={2}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#9ca3af',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Đơn hàng #{order.id}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="700"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mt: 0.5,
                    }}
                  >
                    {order.tongTien.toLocaleString('vi-VN')} VND
                  </Typography>
                </Box>

                <Box
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    background: statusColor.bg,
                    border: `2px solid ${statusColor.border}`,
                  }}
                >
                  <Typography
                    sx={{
                      color: statusColor.text,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                    }}
                  >
                    {order.trangThai}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 3, borderColor: '#f3f4f6' }} />

              {/* Products Section */}
              <Typography
                variant="subtitle2"
                fontWeight="700"
                sx={{
                  mb: 2,
                  color: '#374151',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.85rem',
                }}
              >
                📦 Sản phẩm ({order.products.length})
              </Typography>

              <Stack spacing={2} mb={3}>
                {order.products.map((p, index) => (
                  <Paper
                    key={`${order.id}-product-${index}`}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: '#f3f4f6',
                        borderColor: '#667eea',
                      },
                      flexWrap: 'wrap',
                      gap: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      flex={1}
                      minWidth={0}
                    >
                      <Avatar
                        variant="rounded"
                        src={
                          p.product.image ||
                          'https://via.placeholder.com/80'
                        }
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: 2,
                          border: '2px solid #e5e7eb',
                          flexShrink: 0,
                        }}
                      />
                      <Box minWidth={0} flex={1}>
                        <Typography
                          fontWeight="700"
                          sx={{
                            color: '#1f2937',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {p.product.title}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={3}
                          mt={0.5}
                          sx={{ flexWrap: 'wrap' }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: '#6b7280' }}
                          >
                            Số lượng:{' '}
                            <span style={{ fontWeight: 600, color: '#1f2937' }}>
                              {p.quantity}
                            </span>
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: '#667eea', fontWeight: 600 }}
                          >
                            ${p.product.price}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5}>
                      <Button
                        variant="outlined"
                        onClick={() => handleViewOrder(order.id)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          px: 2.5,
                          py: 0.75,
                          borderColor: '#667eea',
                          color: '#667eea',
                          fontWeight: 600,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: '#f0f4ff',
                            borderColor: '#667eea',
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        Xem
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteOrder(order.id)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          px: 2.5,
                          py: 0.75,
                          background: '#ef4444',
                          fontWeight: 600,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: '#dc2626',
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        Xóa
                      </Button>
                    </Stack>
                  </Paper>
                ))}
              </Stack>

              {/* Order Date */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  pt: 2,
                  borderTop: '1px solid #f3f4f6',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: '#9ca3af', fontStyle: 'italic' }}
                >
                  📅 {formatDate(order.created)}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    )}
  </Container>
);

};

export default OrderList;
