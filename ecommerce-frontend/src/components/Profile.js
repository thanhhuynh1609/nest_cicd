import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Switch,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    seller: false,
    address: {
      addr1: '',
      city: '',
      state: '',
      country: '',
      zip: '',
    },
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          username: response.data.username,
          seller: response.data.seller,
          address: response.data.address || {
            addr1: '',
            city: '',
            state: '',
            country: '',
            zip: '',
          },
        });
      } catch (err) {
        setError('Failed to load user data');
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...formData };
      if (password) {
        updateData.password = password;
      }

      await api.put('/user', updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess('Profile updated successfully');
      setPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
  <Container maxWidth="md">
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '600px' }}>
        {/* Header Section */}
        <Box 
          sx={{ 
            textAlign: 'center',
            mb: 4,
            p: 4,
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '40px',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
              color: 'white',
              fontWeight: 700
            }}
          >
            {formData.username?.charAt(0).toUpperCase() || '👤'}
          </Box>
          <Typography 
            variant="h3" 
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              letterSpacing: '1px'
            }}
          >
            Thông Tin Cá Nhân
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 300 }}>
            Quản lý thông tin tài khoản và cài đặt của bạn
          </Typography>
        </Box>

        {/* Alert Messages */}
        {error && (
          <Box
            sx={{
              p: 2.5,
              mb: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(229, 57, 53, 0.1))',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              textAlign: 'center',
              animation: 'slideDown 0.3s ease'
            }}
          >
            <Typography color="error.main" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              ⚠️ {error}
            </Typography>
          </Box>
        )}
        
        {success && (
          <Box
            sx={{
              p: 2.5,
              mb: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(69, 160, 73, 0.1))',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              textAlign: 'center',
              animation: 'slideDown 0.3s ease'
            }}
          >
            <Typography color="success.main" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              ✅ {success}
            </Typography>
          </Box>
        )}

        {/* Form Section */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            borderRadius: '24px',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Account Info Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary'
              }}
            >
              👤 Thông Tin Tài Khoản
            </Typography>
            
            <TextField
              label="Tên đăng nhập"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  height: '56px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
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
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#667eea'
                  }
                }
              }}
            />
            
            <Box
              sx={{
                p: 2.5,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(69, 160, 73, 0.05))',
                border: '1px solid rgba(76, 175, 80, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.08), rgba(69, 160, 73, 0.08))',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="seller"
                    checked={formData.seller}
                    onChange={handleChange}
                    sx={{
                      color: 'rgba(76, 175, 80, 0.6)',
                      '&.Mui-checked': {
                        color: '#4CAF50',
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: 28,
                      }
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      🏪 Tài khoản người bán
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bật tính năng này để bán sản phẩm trên nền tảng
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Box>

          {/* Password Section */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary'
              }}
            >
              🔒 Bảo Mật
            </Typography>
            
            <TextField
              label="Mật khẩu mới (để trống nếu không muốn thay đổi)"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  height: '56px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.3s ease',
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
                '& .MuiInputLabel-root': {
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#667eea'
                  }
                }
              }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                flex: 1,
                minWidth: '200px',
                height: '56px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'none',
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                💾 Cập Nhật Thông Tin
              </Box>
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                flex: 1,
                minWidth: '200px',
                height: '56px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'none',
                borderColor: 'error.main',
                color: 'error.main',
                borderWidth: '2px',
                '&:hover': {
                  borderColor: 'error.dark',
                  bgcolor: 'error.main',
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(244, 67, 54, 0.3)',
                  borderWidth: '2px',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🚪 Đăng Xuất
              </Box>
            </Button>
          </Box>

          {/* Security Note */}
          <Box
            sx={{
              mt: 4,
              p: 2.5,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.05), rgba(25, 118, 210, 0.05))',
              border: '1px solid rgba(33, 150, 243, 0.2)'
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <span style={{ fontSize: '16px' }}>ℹ️</span>
              <span>
                <strong>Lưu ý:</strong> Thông tin của bạn được bảo mật và chỉ hiển thị cho bạn. Nếu thay đổi mật khẩu, bạn sẽ cần đăng nhập lại.
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Container>
);
};

export default Profile;
