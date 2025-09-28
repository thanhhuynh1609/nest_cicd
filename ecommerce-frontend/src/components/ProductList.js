import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/product');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" align="center" fontWeight="bold">
          Sản phẩm
        </Typography>
        {error && (
          <Typography color="error" align="center" mt={2}>
            {error}
          </Typography>
        )}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
              <Card sx={{ 
                width: "200px",
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                minHeight: '400px'
              }}>
                {/* Phần ảnh */}
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image || 'https://via.placeholder.com/200'}
                  alt={product.title}
                  sx={{ objectFit: 'cover' }}
                />
                
                {/* Phần nội dung */}
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block'
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" mt={1}>
                      ${product.price}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/product/${product.id}`}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Xem chi tiết
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
