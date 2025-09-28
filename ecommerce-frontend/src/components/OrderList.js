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
      {/* Tiêu đề */}
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "primary.main", mb: 4 }}
      >
        🛒 Đơn hàng của tôi
      </Typography>

      {/* Nút tạo đơn hàng */}
      <Stack direction="row" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          component={Link}
          to="/orders/create"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 3,
            py: 1,
            fontWeight: "bold",
            boxShadow: 2,
          }}
        >
          + Tạo đơn hàng mới
        </Button>
      </Stack>

      {/* Thông báo lỗi */}
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Danh sách đơn hàng */}
      <Stack spacing={4}>
        {orders.map((order) => (
          <Paper
            key={order.id}
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
            }}
          >
            {/* Tổng tiền + trạng thái */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Tổng tiền:{" "}
                <span style={{ color: "#d32f2f" }}>${order.totalPrice}</span>
              </Typography>
              <Chip
                label={order.trangThai}
                color={
                  order.trangThai === "Đã giao"
                    ? "success"
                    : order.trangThai === "Đã hủy"
                    ? "error"
                    : order.trangThai === "Đang giao hàng"
                    ? "warning"
                    : "default"
                }
                sx={{ fontWeight: "bold" }}
              />
            </Stack>

            {/* Danh sách sản phẩm */}
            <Typography
              variant="subtitle1"
              fontWeight="medium"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Danh sách sản phẩm:
            </Typography>

            <Stack spacing={2}>
              {order.products.map((p, index) => (
                <Paper
                  key={`${order.id}-product-${index}`}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Thông tin sản phẩm */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={p.product.image || "https://via.placeholder.com/80"}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        border: "1px solid #eee",
                      }}
                    />
                    <Box>
                      <Typography fontWeight="bold">
                        {p.product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Số lượng: {p.quantity}
                      </Typography>
                      <Typography variant="body2" color="primary.main">
                        Giá: ${p.product.price}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Nút hành động */}
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewOrder(order.id)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        px: 2,
                      }}
                    >
                      Xem
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteOrder(order.id)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        px: 2,
                      }}
                    >
                      Xóa
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>

            {/* Ngày mua */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" align="right">
              📅 Ngày mua: {formatDate(order.created)}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  </Container>
);

};

export default OrderList;
