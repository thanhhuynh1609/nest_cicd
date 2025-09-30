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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminUsers = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Không thể tải người dùng');
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== userId)); // Đổi từ user._id thành user.id
    } catch (err) {
      setError('Xóa người dùng thất bại');
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
          👥 Quản Lý Người Dùng
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300 }}>
          Quản lý tài khoản và phân quyền người dùng trong hệ thống
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

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              textAlign: 'center'
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
              {users.length}
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              👤 Tổng người dùng
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(69, 160, 73, 0.1))',
              border: '1px solid rgba(76, 175, 80, 0.2)',
              textAlign: 'center'
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#4CAF50', mb: 1 }}>
              {users.filter(u => u.seller).length}
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              🏪 Người bán
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(229, 57, 53, 0.1))',
              border: '1px solid rgba(244, 67, 54, 0.2)',
              textAlign: 'center'
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#f44336', mb: 1 }}>
              {users.filter(u => u.admin).length}
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              👑 Quản trị viên
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Users Table */}
      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          borderRadius: '24px',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                '& th': {
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'text.primary',
                  py: 2.5,
                  borderBottom: '2px solid rgba(102, 126, 234, 0.2)'
                }
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  👤 Tên Đăng Nhập
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  🏪 Người Bán
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  👑 Quản Trị
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  ⚙️ Hành Động
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow 
                key={user.id}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                    transform: 'scale(1.01)',
                  },
                  '& td': {
                    py: 2.5,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                  }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: `linear-gradient(45deg, 
                          ${index % 3 === 0 ? '#667eea, #764ba2' : 
                            index % 3 === 1 ? '#4CAF50, #45a049' : 
                            '#FF9800, #F57C00'})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '16px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {user.username?.charAt(0).toUpperCase()}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {user.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {String(user.id).slice(-8)}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 0.75,
                      borderRadius: '12px',
                      background: user.seller 
                        ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(69, 160, 73, 0.15))'
                        : 'linear-gradient(135deg, rgba(158, 158, 158, 0.15), rgba(117, 117, 117, 0.15))',
                      border: `1px solid ${user.seller ? 'rgba(76, 175, 80, 0.3)' : 'rgba(158, 158, 158, 0.3)'}`,
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    {user.seller ? (
                      <>
                        <span style={{ fontSize: '16px' }}>✅</span>
                        <span style={{ color: '#4CAF50' }}>Có</span>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '16px' }}>❌</span>
                        <span style={{ color: '#9E9E9E' }}>Không</span>
                      </>
                    )}
                  </Box>
                </TableCell>
                
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 0.75,
                      borderRadius: '12px',
                      background: user.admin 
                        ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.15), rgba(229, 57, 53, 0.15))'
                        : 'linear-gradient(135deg, rgba(158, 158, 158, 0.15), rgba(117, 117, 117, 0.15))',
                      border: `1px solid ${user.admin ? 'rgba(244, 67, 54, 0.3)' : 'rgba(158, 158, 158, 0.3)'}`,
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    {user.admin ? (
                      <>
                        <span style={{ fontSize: '16px' }}>👑</span>
                        <span style={{ color: '#f44336' }}>Admin</span>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: '16px' }}>❌</span>
                        <span style={{ color: '#9E9E9E' }}>User</span>
                      </>
                    )}
                  </Box>
                </TableCell>
                
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(user.id)}
                    sx={{
                      borderRadius: '12px',
                      px: 2.5,
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
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(244, 67, 54, 0.3)',
                        borderWidth: '2px',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Empty State */}
      {users.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 4,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(158, 158, 158, 0.1), rgba(117, 117, 117, 0.1))',
            border: '2px dashed rgba(158, 158, 158, 0.3)',
            mt: 4
          }}
        >
          <Box sx={{ fontSize: '64px', mb: 2, opacity: 0.6 }}>
            👥
          </Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Chưa có người dùng nào
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Danh sách người dùng sẽ hiển thị ở đây
          </Typography>
        </Box>
      )}
    </Box>
  </Container>
);
};

export default AdminUsers;
