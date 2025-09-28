// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (user) {
        // Đảm bảo user object luôn có trường admin
        const userWithAdmin = {
          ...user,
          admin: user.admin || false
        };
        localStorage.setItem('user', JSON.stringify(userWithAdmin));
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = (userData, token) => {
    const userWithId = {
      ...userData,
      id: userData.id || userData._id // Fallback cho compatibility
    };
    setUser(userWithId);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userWithId));
    localStorage.setItem('token', token);
  };


  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
