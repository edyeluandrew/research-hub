import React from 'react';
import { Navigate } from 'react-router-dom';

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('adminToken');
  const loginTime = sessionStorage.getItem('adminLoginTime');

  const isExpired =
    !loginTime || Date.now() - parseInt(loginTime, 10) > SESSION_TTL_MS;

  if (!isAuthenticated || isExpired) {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminLoginTime');
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
