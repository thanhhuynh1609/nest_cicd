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
    <Container maxWidth="md">
      <Box mt={6}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Đơn hàng của tôi
        </Typography>

        <Stack direction="row" justifyContent="flex-end" mb={3}>
          <Button
            variant="contained"
            component={Link}
            to="/orders/create"
          >
            Tạo đơn hàng mới
          </Button>
        </Stack>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <Stack spacing={3}>
          {orders.map((order) => (
            <Paper key={order.id} elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Tổng tiền: ${order.totalPrice}
              </Typography>

              {/* Hiển thị trạng thái */}
              <Box mb={1}>
                <Typography variant="body2" color="text.secondary" component="span">
                  Trạng thái:{' '}
                </Typography>
                <Chip
                  label={order.trangThai}
                  color={
                    order.trangThai === 'Đã giao'
                      ? 'success'
                      : order.trangThai === 'Đã hủy'
                      ? 'error'
                      : order.trangThai === 'Đang giao hàng'
                      ? 'warning'
                      : 'default'
                  }
                />
              </Box>

              <Typography variant="subtitle1" fontWeight="medium">
                Danh sách sản phẩm:
              </Typography>

              <Box ml={2} mb={1}>
                {order.products.map((p, index) => (
                  <Grid container spacing={2} key={`${order.id}-product-${index}`} alignItems="center" sx={{ mb: 2 }}>
                    {/* Ảnh sản phẩm và thông tin bên trái */}
                    <Grid size={8} container alignItems="center">
                      <Grid size={3}>
                        <Avatar 
                          variant="square" 
                          src={p.product.image || 'https://via.placeholder.com/80'} 
                          sx={{ width: 80, height: 80, objectFit: 'cover' }} 
                        />
                      </Grid>
                      <Grid size={9}>
                        <Typography>
                          <strong>{p.product.title}</strong>
                        </Typography>
                        <Typography>Số lượng: {p.quantity}</Typography>
                        <Typography>Giá: ${p.product.price}</Typography>
                      </Grid>
                    </Grid>

                    {/* Nút Xem và Xóa nằm sát phải */}
                    <Grid size={4} container justifyContent="flex-end">
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="outlined"
                          onClick={() => handleViewOrder(order.id)}
                          sx={{ width: '48%' }}
                        >
                          Xem
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteOrder(order.id)}
                          sx={{ width: '48%' }}
                        >
                          Xóa
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" color="text.secondary">
                Ngày mua: {formatDate(order.created)}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default OrderList;
