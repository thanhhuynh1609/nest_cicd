import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showDialog, setShowDialog] = useState(false);


  const [openSnackbar, setOpenSnackbar] = useState(false);


  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(value);
  };

  const totalPrice = product ? product.price * quantity : 0;

  const handleAddToCart = () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    setShowDialog(true);
  };

  const handleConfirmAdd = async () => {
    try {
      const orderData = {
        products: [{
          productId: parseInt(id),
          quantity: quantity
        }]
      };
      
      await api.post(
        '/order',
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setShowDialog(false);
      navigate('/orders');
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Không thể tạo đơn hàng');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Không thể tải sản phẩm');
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <Typography align="center">Đang tải...</Typography>;

  return (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    <Box mt={2}>
      <Card 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' }
            }
          }
        }}
      >
        <Grid container spacing={0}>
          {/* Product Image Section */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '500px',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
                  alt={product.title}
                  sx={{
                    objectFit: 'cover',
                    width: '400px',
                    maxWidth: '100%'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 15,
                    left: 15,
                    bgcolor: 'rgba(76, 175, 80, 0.9)',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Có sẵn
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Product Info Section */}
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4, height: '100%' }}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h3" 
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    background: 'linear-gradient(45deg, #2c3e50, #34495e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2
                  }}
                >
                  {product.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    mb: 3,
                    fontSize: '16px'
                  }}
                >
                  {product.description}
                </Typography>

                {/* Price Section */}
                <Box 
                  sx={{ 
                    mb: 3,
                    p: 3,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}
                  >
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giá đã bao gồm VAT
                  </Typography>
                </Box>

                {/* Seller Info */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: '12px',
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    mb: 4
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '16px'
                    }}
                  >
                    {product.owner?.username?.charAt(0).toUpperCase() || 'S'}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Người bán
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {product.owner?.username || 'Chưa có thông tin'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {user && token ? (
                <Box sx={{ mt: 'auto' }}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: '20px',
                      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.8))',
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      mb: 3
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Chọn số lượng
                    </Typography>
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      inputProps={{ min: 1 }}
                      fullWidth
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          bgcolor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(102, 126, 234, 0.2)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(102, 126, 234, 0.4)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          }
                        }
                      }}
                    />
                    
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        Tổng tiền:
                      </Typography>
                      <Typography 
                        variant="h5" 
                        sx={{
                          fontWeight: 700,
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        ${totalPrice}
                      </Typography>
                    </Box>
                  </Box>

                  <Button 
                    variant="contained"
                    fullWidth
                    onClick={handleAddToCart}
                    sx={{
                      py: 2,
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'none',
                      background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      🛒 Thêm vào giỏ hàng
                    </Box>
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    mt: 'auto',
                    textAlign: 'center',
                    p: 3,
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1))',
                    border: '1px solid rgba(255, 193, 7, 0.3)'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    🔐 Cần đăng nhập để mua hàng
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Đăng nhập để có thể thêm sản phẩm vào giỏ hàng và thanh toán
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/login"
                    sx={{
                      py: 2,
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'none',
                      background: 'linear-gradient(45deg, #FF9800 30%, #F57C00 90%)',
                      boxShadow: '0 8px 32px rgba(255, 152, 0, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #F57C00 30%, #E65100 90%)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Đăng nhập ngay
                  </Button>
                </Box>
              )}

              {/* Error Display */}
              {error && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: '12px',
                    bgcolor: 'error.light',
                    border: '1px solid',
                    borderColor: 'error.main'
                  }}
                >
                  <Typography color="error.dark" align="center">
                    ⚠️ {error}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog 
        open={showDialog} 
        onClose={() => setShowDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            minWidth: '400px'
          }
        }}
      >
        <DialogTitle 
          sx={{
            textAlign: 'center',
            pb: 1,
            fontSize: '20px',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          🛒 Xác nhận thêm vào giỏ hàng
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
              border: '1px solid rgba(102, 126, 234, 0.1)'
            }}
          >
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
              📦 Sản phẩm: {product.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              📊 Số lượng: {quantity}
            </Typography>
            <Typography variant="body1" gutterBottom>
              💰 Đơn giá: ${product.price}
            </Typography>
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: '1px solid rgba(102, 126, 234, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Tổng tiền:
              </Typography>
              <Typography 
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ${totalPrice}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => setShowDialog(false)}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleConfirmAdd} 
            variant="contained"
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                boxShadow: '0 6px 25px rgba(102, 126, 234, 0.4)',
              }
            }}
          >
            ✅ Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            p: 2,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
        >
          ✅ Đã thêm sản phẩm vào giỏ hàng thành công!
        </Box>
      </Snackbar>
    </Box>
  </Container>
);
};

export default ProductDetail;
