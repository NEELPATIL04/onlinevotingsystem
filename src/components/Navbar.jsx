import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { authToken, setAuthToken, currentUser } = useContext(AuthContext);

  console.log('Current User:', currentUser); // Debugging

  const handleLogout = () => {
    setAuthToken(null);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Voting App</Link>
        <div>
          {authToken ? (
            <>
              <Link to="/profile" className="text-white mx-2">Profile</Link>
              <Link to="/candidates" className="text-white mx-2">Candidates</Link>
              <Link to="/vote-count" className="text-white mx-2">Vote Count</Link>
              {currentUser && currentUser.role === 'admin' && (
                <Link to="/admin" className="text-white mx-2">Admin</Link>
              )}
              <button onClick={handleLogout} className="text-white mx-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2">Login</Link>
              <Link to="/signup" className="text-white mx-2">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
