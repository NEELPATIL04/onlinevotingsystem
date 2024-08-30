import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authToken, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;