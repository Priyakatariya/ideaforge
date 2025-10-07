import React from 'react';
import './Profile.css';

const Profile: React.FC = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: 'January 2024',
    status: 'Active',
  };

  return (
    <div className="page-container profile-container">
      <h1>User Profile</h1>
      <div className="profile-card">
        <div className="profile-detail">
          <strong>Name:</strong>
          <span>{user.name}</span>
        </div>
        <div className="profile-detail">
          <strong>Email:</strong>
          <span>{user.email}</span>
        </div>
        <div className="profile-detail">
          <strong>Member Since:</strong>
          <span>{user.memberSince}</span>
        </div>
        <div className="profile-detail">
          <strong>Status:</strong>
          <span>{user.status}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;