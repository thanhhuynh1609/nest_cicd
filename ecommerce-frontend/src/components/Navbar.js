import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  TextField,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import AppRegistration from '@mui/icons-material/AppRegistration';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
    navigate('/');
  };

  return (
  <AppBar 
    position="static" 
    elevation={0}
    sx={{ 
      width: '100%',
      background: 'white',
      backdropFilter: 'blur(10px)',
      // borderBottom: '1px solid black'
    }}
  >
    <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
      {/* Logo Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 700,
            background: 'black',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          ShopVibe
        </Typography>

        <Tooltip title="Trang chủ" arrow>
          <IconButton 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{
              bgcolor: 'black',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                bgcolor: 'orange',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Search Section */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        flex: 1,
        justifyContent: 'center',
        maxWidth: 600,
        mx: 3
      }}>
        <TextField
          size="small"
          placeholder="Tìm kiếm sản phẩm, thương hiệu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          InputProps={{
            sx: { 
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '25px',
              height: '44px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
              },
              '&.Mui-focused': {
                bgcolor: 'rgba(255, 255, 255, 1)',
                border: '2px solid rgba(102, 126, 234, 0.5)',
                boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
              },
              transition: 'all 0.3s ease'
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ 
                    cursor: 'pointer', 
                    color: 'primary.main',
                    '&:hover': {
                      color: 'primary.dark',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                  onClick={handleSearch}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* User Actions Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {user ? (
          <>
            {user.admin && (
              <Tooltip title="Quản trị" arrow>
                <IconButton 
                  color="inherit" 
                  component={Link} 
                  to="/admin"
                  sx={{
                    bgcolor: 'black',
                    '&:hover': {
                      bgcolor: 'orange',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Tooltip>
            )}

            {user.seller && (
              <>
                <Tooltip title="Quản lý sản phẩm" arrow>
                  <IconButton 
                    color="inherit" 
                    component={Link} 
                    to="/products/manage"
                    sx={{
                      bgcolor: 'black',
                      '&:hover': {
                        bgcolor: 'orange',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <InventoryIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Đơn đặt hàng" arrow>
                  <IconButton 
                    color="inherit" 
                    component={Link} 
                    to="/seller-orders"
                    sx={{
                      bgcolor: 'black',
                      position: 'relative',
                      '&:hover': {
                        bgcolor: 'orange',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ShoppingBasketIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}

            <Tooltip title="Tài khoản" arrow>
              <IconButton 
                onClick={handleOpenMenu} 
                color="inherit"
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 38, 
                    height: 38, 
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    fontSize: '16px',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {user.username?.charAt(0).toUpperCase() || <AccountCircle />}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minWidth: 200
                }
              }}
            >
              <MenuItem 
                onClick={handleCloseMenu} 
                component={Link} 
                to="/profile"
                sx={{
                  borderRadius: '8px',
                  mx: 1,
                  my: 0.5,
                  '&:hover': {
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                    transform: 'translateX(4px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <AccountCircle sx={{ mr: 2, color: 'primary.main' }} />
                Hồ sơ
              </MenuItem>
              <MenuItem 
                onClick={handleCloseMenu} 
                component={Link} 
                to="/orders"
                sx={{
                  borderRadius: '8px',
                  mx: 1,
                  my: 0.5,
                  '&:hover': {
                    bgcolor: 'rgba(255, 152, 0, 0.1)',
                    transform: 'translateX(4px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <ShoppingBasketIcon sx={{ mr: 2, color: 'warning.main' }} />
                Đơn hàng
              </MenuItem>
              <MenuItem 
                onClick={handleLogout}
                sx={{
                  borderRadius: '8px',
                  mx: 1,
                  my: 0.5,
                  '&:hover': {
                    bgcolor: 'rgba(244, 67, 54, 0.1)',
                    transform: 'translateX(4px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <Logout sx={{ mr: 2, color: 'error.main' }} />
                Đăng xuất
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Tooltip title="Đăng nhập" arrow>
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{
                  bgcolor: 'black',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: 'orange',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Login />
              </IconButton>
            </Tooltip>
            <Tooltip title="Đăng ký" arrow>
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/register"
                sx={{
                  bgcolor: 'black',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: 'orange',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <AppRegistration />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </Toolbar>
  </AppBar>
);
};

export default Navbar;
