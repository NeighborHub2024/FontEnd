// src/config/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isRole } = useAuth();
  return (
    (isAuthenticated() && allowedRoles.includes(isRole()))
      ? children 
      : <Navigate to="/unauthorized" />
  );
};

export default ProtectedRoute;
