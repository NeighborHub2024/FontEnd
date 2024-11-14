// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import api from '../../config/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

   const login = async (identifier, password) => {
    try {
      const response = await api.post('/auth/login', { phoneOrEmail: identifier, password });
      if(response.status === 200) {
        const { user: userInfo, access_token } = response.data;

        // Store user data and token
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('access_token', access_token);
        setUser(userInfo);  // Set the user state
        if(userInfo.role.toLowerCase() === 'admin') {
          window.location.href = '/admin';
        }
      }
      return response; // Return response for further handling if needed
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow the error to be handled in the Login component
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user || !!localStorage.getItem('user');
  };

  const token = () => localStorage.getItem('access_token');

  const isRole = () => {
    return user.role.toLowerCase();
  } 

  return (
    <AuthContext.Provider value={{ user, token, isRole, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
