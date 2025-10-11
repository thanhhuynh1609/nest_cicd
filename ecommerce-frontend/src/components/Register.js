import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [seller, setSeller] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', {
        username,
        password,
        seller,
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
  <Container maxWidth="sm">
    <Box 
      sx={{ 
        // minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        py: 4
      }}
    >
      <Paper 
        elevation={0}
        sx={{ 
          padding: 5,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            // background: 'linear-gradient(90deg, #4CAF50, #45a049, #4CAF50)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' }
            }
          }
        }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {/* <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #4CAF50, #45a049)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '32px',
              boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)'
            }}
          >
            ✨
          </Box> */}
          <Typography 
            variant="h3" 
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2c3e50, #34495e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Đăng Ký
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tạo tài khoản mới để bắt đầu hành trình mua sắm
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Tên đăng nhập"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  height: '56px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    borderColor: 'rgba(76, 175, 80, 0.2)',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(76, 175, 80, 0.4)',
                    transform: 'scale(1.02)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)'
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#4CAF50'
                  }
                }
              }}
            />
            
            <TextField
              label="Mật khẩu"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  height: '56px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    borderColor: 'rgba(76, 175, 80, 0.2)',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(76, 175, 80, 0.4)',
                    transform: 'scale(1.02)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.1)'
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#4CAF50'
                  }
                }
              }}
            />

            {/* Seller Checkbox */}
            <Box
              sx={{
                p: 2,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(69, 160, 73, 0.05))',
                border: '1px solid rgba(76, 175, 80, 0.2)',
                mb: 2
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={seller}
                    onChange={(e) => setSeller(e.target.checked)}
                    sx={{
                      color: 'rgba(76, 175, 80, 0.6)',
                      '&.Mui-checked': {
                        color: '#4CAF50',
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: 24,
                      }
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      🏪 Đăng ký với tư cách người bán
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bán sản phẩm của bạn trên nền tảng
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Box>

          {error && (
            <Box
              sx={{
                p: 2,
                mb: 3,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(229, 57, 53, 0.1))',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                textAlign: 'center'
              }}
            >
              <Typography color="error.main" fontWeight={500}>
                ⚠️ {error}
              </Typography>
            </Box>
          )}

          <Button 
            type="submit" 
            fullWidth 
            sx={{
              height: '56px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 700,
              textTransform: 'none',
              // background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
              boxShadow: '0 8px 32px rgba(46, 51, 46, 0.4)',
              color: 'black',
              mb: 2,
              '&:hover': {
                background: 'linear-gradient(45deg, #45a049 30%, #388e3c 90%)',
                boxShadow: '0 12px 40px rgba(76, 175, 80, 0.5)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            ✨ Tạo Tài Khoản
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Đã có tài khoản?{' '}
              <Typography
                component={Link}
                to="/login"
                sx={{
                  color: '#4CAF50',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '#45a049'
                  }
                }}
              >
                Đăng nhập ngay
              </Typography>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  </Container>
);
};

export default Register;
