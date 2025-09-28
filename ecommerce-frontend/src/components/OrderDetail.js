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
    <Container maxWidth="md">
      <Box mt={4}>
        <Button component={Link} to="/orders" sx={{ mb: 2 }}>
          ← Quay lại danh sách đơn hàng
        </Button>
        
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Chi tiết đơn hàng #{order.id}
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            Tổng tiền: ${order.totalPrice}
          </Typography>
          
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

          <Typography variant="h6" gutterBottom>
            Sản phẩm:
          </Typography>
          
          {order.products.map((p, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
              <Grid size={3}>
                <Avatar 
                  variant="square" 
                  src={p.product.image || 'https://via.placeholder.com/100'} 
                  sx={{ width: 100, height: 100 }} 
                />
              </Grid>
              <Grid size={9}>
                <Typography variant="h6">{p.product.title}</Typography>
                <Typography>Số lượng: {p.quantity}</Typography>
                <Typography>Giá: ${p.product.price}</Typography>
                <Typography>Thành tiền: ${p.product.price * p.quantity}</Typography>
              </Grid>
            </Grid>
          ))}
          
          <Typography variant="body2" color="text.secondary" mt={2}>
            Ngày đặt: {new Date(order.created).toLocaleDateString('vi-VN')}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default OrderDetail;

