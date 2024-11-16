import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'LeBron James',
    email: 'johndoe@example.com',
    avatar: 'https://via.placeholder.com/150',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };


  const handleBackClick = () => {
    navigate(-1); 
  };

  const handleSave = () => {
    alert('Profile saved!');
  
  };

 
  const handleScoresClick = () => {
    navigate('/gamehistory'); 
  };

  return (
    <div className="profile-settings-container">
      <button onClick={handleBackClick} className="back-arrow-button">
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <h1 className="profile-settings-title">Profile Settings</h1>
      
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profile.avatar} alt="Avatar" width={150} height={150} />
        </div>
        <div className="profile-details">
          <label>
            Name:
            <input
              className="username-input"
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              className="username-input"
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

      <div className="navigation-buttons">
        <button className="scores-button" onClick={handleScoresClick}>Scores</button> {/* Link to GameHistory */}
        <button className="scores-button">Logout</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
