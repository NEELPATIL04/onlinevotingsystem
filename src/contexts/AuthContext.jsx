import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (authToken) {
        try {
          const userData = await getProfile();
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error verifying token:', error);
          handleLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    verifyToken();
  }, [authToken]);

  const handleLogout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const value = {
    authToken,
    setAuthToken,
    currentUser,
    setCurrentUser,
    loading,
    handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);