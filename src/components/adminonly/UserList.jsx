import React from 'react';

function UserList({ users }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {users.map((user) => (
        <div key={user._id} className="mb-4 p-2 border-b">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Aadhar Card Number:</strong> {user.aadharcardNumber}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;