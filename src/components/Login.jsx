import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [credentials, setCredentials] = useState({ aadharcardNumber: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setAuthToken, setCurrentUser } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      if (response && response.token && response.user) {
        setAuthToken(response.token);
        setCurrentUser(response.user);
        localStorage.setItem('authToken', response.token);
        navigate(response.user.role === 'admin' ? '/admin' : '/home');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Invalid Aadhar card number or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadharcardNumber">
            Aadhar Card Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="aadharcardNumber"
            type="text"
            name="aadharcardNumber"
            value={credentials.aadharcardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
