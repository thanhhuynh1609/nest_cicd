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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CardMedia,
} from '@mui/material';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const SellerOrders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const response = await api.get('/order/seller-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load seller orders');
      }
    };
    fetchSellerOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await api.patch(
        `/order/seller-orders/${orderId}/status`,
        { trangThai: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, trangThai: response.data.trangThai } : order
        )
      );
    } catch (err) {
      setError('Cập nhật trạng thái thất bại: ' + (err.message || 'Lỗi không xác định'));
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={5} mb={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Đơn đặt từ sản phẩm của Shop
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {orders.length === 0 ? (
          <Typography align="center" color="textSecondary">
            Không tìm thấy đơn hàng nào
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid xs={12} key={order.id}>
                <Card elevation={3} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">
                        Đặt bởi: {order.owner?.username || 'Ẩn danh'}
                      </Typography>
                      <Chip
                        label={`Tổng tiền: $${order.totalPrice}`}
                        color="primary"
                        variant="outlined"
                      />
                    </Box>

                    {/* Trạng thái đơn hàng */}
                    <Box mb={2}>
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

                    {/* Cập nhật trạng thái */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Trạng thái đơn hàng</InputLabel>
                      <Select
                        value={order.trangThai}
                        label="Trạng thái đơn hàng"
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <MenuItem value="Chờ xử lý">Chờ xử lý</MenuItem>
                        <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
                        <MenuItem value="Đã giao">Đã giao</MenuItem>
                        <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                      </Select>
                    </FormControl>

                    <Divider sx={{ mb: 2 }} />

                    <Typography variant="subtitle1" color="textSecondary" mb={1}>
                      Sản Phẩm:
                    </Typography>
                    <Grid container spacing={2}>
                      {order.products.map((p, index) => (
                        <Grid xs={12} sm={6} md={4} key={`${order.id}-product-${index}`}>
                          <Card elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                              image={p.product.image || 'https://via.placeholder.com/80'}
                              alt={p.product.title}
                            />
                            <Box sx={{ ml: 2, flex: 1 }}>
                              <Typography variant="body1" fontWeight="bold">
                                {p.product.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Số lượng: {p.quantity}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Giá: ${p.product.price}
                              </Typography>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default SellerOrders;
