import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/home" />;
  }

  return children;
};

export default AdminRoute;