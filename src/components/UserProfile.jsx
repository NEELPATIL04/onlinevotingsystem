import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ChangePasswordForm from './ChangePasswordForm';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { authToken, currentUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile. Please try logging in again.');
      }
    };

    if (authToken && !currentUser) {
      fetchProfile();
    } else if (currentUser) {
      setProfile(currentUser);
    }
  }, [authToken, currentUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handlePasswordChangeSuccess = () => {
    setIsEditing(false);
    // You might want to show a success message here
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Aadhar Card Number:</strong> {profile.aadharcardNumber}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Mobile:</strong> {profile.mobile}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      
      {!isEditing && (
        <button
          onClick={handleEditClick}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Change Password
        </button>
      )}

      {isEditing && (
        <ChangePasswordForm
          onCancel={handleCancelEdit}
          onSuccess={handlePasswordChangeSuccess}
        />
      )}
    </div>
  );
}

export default UserProfile;