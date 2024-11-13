import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProfileSettings = () => {
  // Initial profile information state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://via.placeholder.com/150', // Placeholder image
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Handle the back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  // Handle form submission (or save profile)
  const handleSave = () => {
    alert('Profile saved!');
    // Add actual save logic here (e.g., API call to update profile)
  };

  return (
    <div className="profile-settings">
      <button onClick={handleBackClick} className="back-arrow-button">
        <i className="fas fa-arrow-left"></i> Back
      </button>

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

      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;
