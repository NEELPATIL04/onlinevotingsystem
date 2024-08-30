import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { currentUser, handleLogout } = useAuth();

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Voting System</h1>
      {currentUser ? (
        <>
          <nav>
            <ul className="space-y-4">
              <li><Link to="/profile" className="text-blue-500 hover:underline">View Profile</Link></li>
              <li><Link to="/vote" className="text-blue-500 hover:underline">Cast Your Vote</Link></li>
              <li><Link to="/vote-count" className="text-blue-500 hover:underline">View Vote Count</Link></li>
              {currentUser.role === 'admin' && (
                <li><Link to="/admin" className="text-blue-500 hover:underline">Admin Panel</Link></li>
              )}
            </ul>
          </nav>
          <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </>
      ) : (
        <nav>
          <ul className="space-y-4">
            <li><Link to="/login" className="text-blue-500 hover:underline">Login</Link></li>
            <li><Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Home;