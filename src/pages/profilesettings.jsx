import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from "../components/BackButton";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Name',
    email: 'Email',
    avatar: 'https://via.placeholder.com/150',
  });

  const navigate = useNavigate();

  // Sample game history, this should be fetched from your game state or a context
  const gameHistory = [
    { date: '2024-12-01', score: 50, gameMode: '4x4' },
    { date: '2024-12-02', score: 60, gameMode: '4x4' },
  ];

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle avatar upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfile({ ...profile, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-settings-container">
      <div className="profile-back">
        <BackButton />
      </div>

      {/* Profile Settings Title */}
      <h1 className="profile-settings-title">Profile Settings</h1>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profile.avatar} alt="Avatar" width={150} className="avatar" />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <input
          className="username-input"
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="username-input"
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button className="save-button" onClick={() => alert('Profile saved!')}>
          Save Changes
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          className="scores-button"
          onClick={() => navigate('/gamehistory', { state: { scores: gameHistory } })}
        >
          Scores
        </button>
        <button className="logout-button" onClick={() => navigate('/')}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
