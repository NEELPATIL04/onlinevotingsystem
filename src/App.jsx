import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminPanel from './components/AdminPanel';
import Profile from './components/UserProfile';
import Vote from './components/Votes';
import VoteCount from './components/VoteCount';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/vote" element={<PrivateRoute><Vote /></PrivateRoute>} />
          <Route path="/vote-count" element={<PrivateRoute><VoteCount /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;