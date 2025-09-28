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
  <Container maxWidth="xl" sx={{ py: 4 }}>
    <Box mt={2} mb={6}>
      {/* Header Section */}
      <Box 
        sx={{ 
          textAlign: 'center',
          mb: 6,
          p: 4,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 193, 7, 0.1))',
          border: '1px solid rgba(255, 152, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="h3" 
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #FF9800, #FFC107)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            letterSpacing: '1px'
          }}
        >
          📦 Quản Lý Đơn Hàng
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300 }}>
          Theo dõi và cập nhật trạng thái đơn hàng từ khách hàng
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Box
          sx={{
            p: 3,
            mb: 4,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(229, 57, 53, 0.1))',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            textAlign: 'center'
          }}
        >
          <Typography color="error.main" variant="h6" fontWeight={600}>
            ⚠️ {error}
          </Typography>
        </Box>
      )}

      {/* Empty State */}
      {orders.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 4,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(158, 158, 158, 0.1), rgba(117, 117, 117, 0.1))',
            border: '2px dashed rgba(158, 158, 158, 0.3)'
          }}
        >
          <Box
            sx={{
              fontSize: '64px',
              mb: 2,
              opacity: 0.6
            }}
          >
            📭
          </Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Chưa có đơn hàng nào
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Khi có khách hàng đặt hàng, đơn hàng sẽ hiển thị ở đây
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={order.id}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: '24px',
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Order Header */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 3,
                      flexWrap: 'wrap',
                      gap: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '18px'
                        }}
                      >
                        {order.owner?.username?.charAt(0).toUpperCase() || 'A'}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          👤 {order.owner?.username || 'Khách hàng ẩn danh'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Mã đơn: #{String(order.id).slice(-8)}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={`💰 Tổng tiền: $${order.totalPrice}`}
                      sx={{
                        background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '14px',
                        px: 1,
                        height: 36
                      }}
                    />
                  </Box>

                  {/* Status Section */}
                  <Box 
                    sx={{ 
                      mb: 4,
                      p: 3,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.08), rgba(255, 193, 7, 0.08))',
                      border: '1px solid rgba(255, 152, 0, 0.2)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        📊 Trạng thái hiện tại:
                      </Typography>
                      <Chip
                        label={order.trangThai}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          ...(order.trangThai === 'Đã giao' && {
                            background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                            color: 'white'
                          }),
                          ...(order.trangThai === 'Đã hủy' && {
                            background: 'linear-gradient(45deg, #f44336, #d32f2f)',
                            color: 'white'
                          }),
                          ...(order.trangThai === 'Đang giao hàng' && {
                            background: 'linear-gradient(45deg, #FF9800, #F57C00)',
                            color: 'white'
                          }),
                          ...(order.trangThai === 'Chờ xử lý' && {
                            background: 'linear-gradient(45deg, #9E9E9E, #757575)',
                            color: 'white'
                          })
                        }}
                      />
                    </Box>

                    <FormControl fullWidth>
                      <InputLabel 
                        sx={{ 
                          fontWeight: 500,
                          '&.Mui-focused': { color: '#FF9800' }
                        }}
                      >
                        🔄 Cập nhật trạng thái
                      </InputLabel>
                      <Select
                        value={order.trangThai}
                        label="🔄 Cập nhật trạng thái"
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        sx={{
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 152, 0, 0.2)',
                            borderWidth: '2px'
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 152, 0, 0.4)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#FF9800',
                            boxShadow: '0 0 0 3px rgba(255, 152, 0, 0.1)'
                          }
                        }}
                      >
                        <MenuItem value="Chờ xử lý">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            ⏳ Chờ xử lý
                          </Box>
                        </MenuItem>
                        <MenuItem value="Đang giao hàng">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            🚚 Đang giao hàng
                          </Box>
                        </MenuItem>
                        <MenuItem value="Đã giao">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            ✅ Đã giao
                          </Box>
                        </MenuItem>
                        <MenuItem value="Đã hủy">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            ❌ Đã hủy
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Products Section */}
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      🛍️ Sản phẩm của đơn hàng: ({order.products.length} sản phẩm)
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {order.products.map((p, index) => (
                        <Grid item xs={12} sm={6} md={4} key={`${order.id}-product-${index}`}>
                          <Card 
                            elevation={0}
                            sx={{ 
                              display: 'flex',
                              borderRadius: '16px',
                              background: 'rgba(255, 255, 255, 0.7)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              p: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                              }
                            }}
                          >
                            <Box
                              sx={{
                                minWidth: 80,
                                width: 80,
                                height: 80,
                                borderRadius: '12px',
                                overflow: 'hidden',
                                position: 'relative'
                              }}
                            >
                              <CardMedia
                                component="img"
                                sx={{ 
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                                image={p.product.image || 'https://via.placeholder.com/80x80?text=No+Image'}
                                alt={p.product.title}
                              />
                            </Box>
                            
                            <Box sx={{ ml: 2, flex: 1, minWidth: 0 }}>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 600,
                                  mb: 0.5,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {p.product.title}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Typography 
                                  variant="body2" 
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    color: 'text.secondary'
                                  }}
                                >
                                  📦 <strong>SL:</strong> {p.quantity}
                                </Typography>
                                <Typography 
                                  variant="body2"
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    fontWeight: 600,
                                    color: '#FF9800'
                                  }}
                                >
                                  💵 ${p.product.price}
                                </Typography>
                                <Typography 
                                  variant="body2"
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    fontWeight: 600,
                                    color: '#4CAF50'
                                  }}
                                >
                                  💰 Tổng: ${(p.product.price * p.quantity).toFixed(2)}
                                </Typography>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Order Summary */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.08), rgba(69, 160, 73, 0.08))',
                      border: '1px solid rgba(76, 175, 80, 0.2)',
                      textAlign: 'right'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      💎 Tổng giá trị đơn hàng: ${order.totalPrice}
                    </Typography>
                  </Box>
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
