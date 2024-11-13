// src/pages/ProfileSettings.jsx
import React, { useState } from 'react';

const ProfileSettings = () => {
  // Initial profile information state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://via.placeholder.com/150', // Placeholder image
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Render the profile settings page
  return (
    <div className="profile-settings">
      <h1>Profile Settings</h1>
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profile.avatar} alt="Avatar" width={150} height={150} />
        </div>
        <div className="profile-details">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <button className="save-button" onClick={() => alert('Profile saved!')}>
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;
