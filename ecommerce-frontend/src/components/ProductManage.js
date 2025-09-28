import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
} from '@mui/material';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductManage = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', image: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, [token]);

  const handleOpen = (product = null) => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
      });
      setEditId(product.id); // Đổi từ product._id thành product.id
    } else {
      setForm({ title: '', description: '', price: '', image: '' });
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(
          `/product/${editId}`,
          { ...form, price: parseFloat(form.price) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await api.post(
          '/product',
          { ...form, price: parseFloat(form.price) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      const response = await api.get('/product/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
      handleClose();
    } catch (err) {
      setError('Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id)); // Đổi từ p._id thành p.id
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  return (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    <Box mt={2}>
      {/* Header Section */}
      <Box 
        sx={{ 
          textAlign: 'center',
          mb: 6,
          p: 4,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="h3" 
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            letterSpacing: '1px'
          }}
        >
          🛍️ Quản Lý Sản Phẩm
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300, mb: 3 }}>
          Quản lý và cập nhật danh sách sản phẩm của bạn
        </Typography>
        
        <Button 
          variant="contained"
          onClick={() => handleOpen()}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 700,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            ➕ Thêm Sản Phẩm Mới
          </Box>
        </Button>
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

      {/* Products Grid */}
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.2)',
                }
              }}
            >
              {/* Image Section */}
              <Box
                sx={{
                  width: '100%',
                  height: 0,
                  paddingTop: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
                  alt={product.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
                
                {/* Status Badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'rgba(76, 175, 80, 0.9)',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  ✅ Active
                </Box>
              </Box>
              
              {/* Content Section */}
              <CardContent 
                sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      mb: 1.5,
                      color: 'text.primary'
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'block',
                      color: 'text.secondary',
                      mb: 2
                    }}
                  >
                    {product.description}
                  </Typography>
                  
                  {/* Price */}
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
                
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpen(product)}
                    sx={{
                      flex: 1,
                      borderRadius: '12px',
                      py: 1,
                      fontWeight: 600,
                      fontSize: '14px',
                      textTransform: 'none',
                      background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                        boxShadow: '0 6px 25px rgba(102, 126, 234, 0.4)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ✏️ Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(product.id)}
                    sx={{
                      flex: 1,
                      borderRadius: '12px',
                      py: 1,
                      fontWeight: 600,
                      fontSize: '14px',
                      textTransform: 'none',
                      borderColor: 'error.main',
                      color: 'error.main',
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: 'error.dark',
                        bgcolor: 'error.main',
                        color: 'white',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 25px rgba(244, 67, 54, 0.3)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🗑️ Xóa
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Product Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
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
          }
        }}
      >
        <DialogTitle 
          sx={{
            textAlign: 'center',
            pb: 1,
            pt: 3,
            fontSize: '24px',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {editId ? '✏️ Cập Nhật Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, px: 4 }}>
          <TextField
            label="Tên sản phẩm"
            fullWidth
            margin="normal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.2)',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#667eea'
              }
            }}
          />
          
          <TextField
            label="Mô tả sản phẩm"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.2)',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#667eea'
              }
            }}
          />
          
          <TextField
            label="Giá (USD)"
            type="number"
            fullWidth
            margin="normal"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            InputProps={{
              startAdornment: <Box sx={{ mr: 1, color: 'text.secondary' }}>💰</Box>
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.2)',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#667eea'
              }
            }}
          />
          
          <TextField
            label="URL hình ảnh"
            fullWidth
            margin="normal"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            InputProps={{
              startAdornment: <Box sx={{ mr: 1, color: 'text.secondary' }}>🖼️</Box>
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.2)',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                }
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#667eea'
              }
            }}
          />

          {/* Image Preview */}
          {form.image && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: '12px',
                background: 'rgba(102, 126, 234, 0.05)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                🖼️ Xem trước hình ảnh:
              </Typography>
              <Box
                component="img"
                src={form.image}
                alt="Preview"
                sx={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 4, gap: 2 }}>
          <Button 
            onClick={handleClose}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            ❌ Hủy bỏ
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px',
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                boxShadow: '0 6px 25px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            💾 {editId ? 'Cập Nhật' : 'Tạo Mới'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </Container>
);
};

export default ProductManage; 
