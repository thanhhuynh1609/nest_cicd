import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  Paper,
  Avatar,
  CircularProgress,
} from '@mui/material';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminOrders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/order/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data || []);
        setError('');
      } catch (err) {
        if (err.response?.status === 404) {
          setError('API không tồn tại, vui lòng kiểm tra server backend');
        } else if (err.response?.status === 403) {
          setError('Bạn không có quyền truy cập (yêu cầu quyền admin)');
        } else if (err.response?.status === 401) {
          setError('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
        } else {
          setError('Không thể tải danh sách đơn hàng: ' + (err.message || 'Lỗi không xác định'));
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setError('Vui lòng đăng nhập để xem đơn hàng');
      setLoading(false);
    }
  }, [token]);

  const handleDelete = async (orderId) => {
    try {
      await api.delete(`/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      setError('Xóa đơn hàng thất bại: ' + (err.message || 'Lỗi không xác định'));
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box mt={5} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
  <Container maxWidth="lg" sx={{ py: 6 }}>
    {/* Header Section */}
    <Box sx={{ mb: 8, textAlign: 'center' }}>
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
        🎯 Quản lý Đơn hàng
      </Typography>
      <Typography variant="body1" sx={{ color: '#6b7280' }}>
        Theo dõi và quản lý toàn bộ đơn hàng của khách hàng
      </Typography>
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
          textAlign: 'center',
        }}
      >
        <Typography sx={{ color: '#dc2626', fontWeight: 500 }}>
          ⚠️ {error}
        </Typography>
      </Paper>
    )}

    {/* Empty State */}
    {orders.length === 0 && !error && (
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
          📭 Không có đơn hàng nào
        </Typography>
        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
          Hiện tại chưa có đơn hàng để hiển thị
        </Typography>
      </Paper>
    )}

    {/* Orders Grid */}
    {orders.length > 0 && (
      <Grid container spacing={3}>
        {orders.map((order, idx) => (
          <Grid item xs={12} md={6} lg={4} key={order.id}>
            <Card
              sx={{
                p: 0,
                borderRadius: 3,
                border: '1px solid #e5e7eb',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: '#ffffff',
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
              {/* Card Header */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  p: 3,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Đơn hàng #{order.id}
                  </Typography>
                  <Box
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdrop: 'blur(10px)',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                      }}
                    >
                      {order.trangThai}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="700"
                  sx={{ color: '#ffffff' }}
                >
                  {order.tongTien.toLocaleString('vi-VN')} VND
                </Typography>
              </Box>

              {/* Card Content */}
              <CardContent
                sx={{
                  p: 3,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {/* Buyer Info */}
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
                    👤 Người mua
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="700"
                    sx={{ color: '#1f2937' }}
                  >
                    {order.owner?.username || 'Ẩn danh'}
                  </Typography>
                </Box>

                {/* Date Info */}
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
                    📅 Ngày mua
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#6b7280' }}
                  >
                    {new Date(order.created).toLocaleDateString('vi-VN')}
                  </Typography>
                </Box>

                {/* Products */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#9ca3af',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      display: 'block',
                      mb: 1,
                    }}
                  >
                    📦 Sản phẩm ({order.products.length})
                  </Typography>
                  <Stack spacing={1}>
                    {order.products.map((p) =>
                      p.product ? (
                        <Paper
                          key={p.product.id}
                          sx={{
                            p: 1.5,
                            background: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: '#f3f4f6',
                              borderColor: '#667eea',
                            },
                          }}
                        >
                          <Avatar
                            variant="rounded"
                            src={p.product.image || 'https://via.placeholder.com/50'}
                            sx={{
                              width: 50,
                              height: 50,
                              border: '1px solid #e5e7eb',
                              flexShrink: 0,
                            }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              variant="body2"
                              fontWeight="700"
                              sx={{
                                color: '#1f2937',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {p.product.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: '#667eea', fontWeight: 600 }}
                            >
                              SL: {p.quantity}
                            </Typography>
                          </Box>
                        </Paper>
                      ) : null,
                    )}
                  </Stack>
                </Box>
              </CardContent>

              {/* Card Actions */}
              <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: '#667eea',
                    color: '#667eea',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: '#f0f4ff',
                      borderColor: '#667eea',
                    },
                  }}
                >
                  Xem chi tiết
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleDelete(order.id)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    background: '#ef4444',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: '#dc2626',
                    },
                  }}
                >
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
);
};

export default AdminOrders;
