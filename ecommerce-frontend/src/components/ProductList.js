import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  return (
  <Container maxWidth="xl" sx={{ py: 2 }}>
    <Box mt={1}>
      {/* Hero Banner Section */}
      <Box 
        sx={{ 
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          mb: 6,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            zIndex: 1
          }
        }}
      >
        <img
          src="https://img.pikbest.com/origin/06/39/82/40WpIkbEsTaBv.jpg!w700wp"
          alt="Best Seller Banner"
          style={{ 
            width: "100%", 
            height: "400px",
            objectFit: "cover",
            display: "block"
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            left: 50,
            zIndex: 2,
            color: 'white'
          }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 1
            }}
          >
            Khám Phá
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 300,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Sản Phẩm Hot Nhất
          </Typography>
        </Box>
      </Box>

      {/* Section Title */}
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            letterSpacing: '1px'
          }}
        >
          Sản Phẩm Nổi Bật
        </Typography>
        <Box
          sx={{
            width: 80,
            height: 4,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            borderRadius: 2,
            mx: 'auto',
            mb: 1
          }}
        />
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300 }}>
          Những sản phẩm chất lượng được tuyển chọn
        </Typography>
      </Box>

      {error && (
        <Box
          sx={{
            p: 3,
            mb: 4,
            borderRadius: '12px',
            bgcolor: 'error.light',
            border: '1px solid',
            borderColor: 'error.main',
            textAlign: 'center'
          }}
        >
          <Typography color="error.dark" variant="h6">
            {error}
          </Typography>
        </Box>
      )}

      {/* Products Grid */}
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 1
                },
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.25)',
                  '&::before': {
                    opacity: 1
                  }
                }
              }}
            >
              {/* Image Section với Overlay */}
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={product.image || 'https://via.placeholder.com/300x240?text=No+Image'}
                  alt={product.title}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    p: 1,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #4CAF50, #8BC34A)'
                    }}
                  />
                </Box>
              </Box>
              
              {/* Content Section */}
              <CardContent 
                sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3,
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <Box sx={{ mb: 2 }}>
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
                      mb: 1,
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
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      color: 'text.secondary',
                      lineHeight: 1.4,
                      mb: 2
                    }}
                  >
                    {product.description}
                  </Typography>
                  
                  {/* Price Section */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 2
                    }}
                  >
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
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        bgcolor: 'success.main',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      HOT
                    </Box>
                  </Box>
                </Box>
                
                {/* Action Button */}
                <Button
                  variant="contained"
                  component={Link}
                  to={`/product/${product.id}`}
                  fullWidth
                  sx={{
                    borderRadius: '15px',
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Xem Chi Tiết
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}
                    >
                      →
                    </Box>
                  </Box>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>
);
};

export default ProductList;
