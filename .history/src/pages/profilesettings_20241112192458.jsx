import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSettings.css'; // Custom CSS for the profile page

function ProfileSettings() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="profile-settings">
      <button onClick={handleBackClick} className="back-arrow-button">
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <h1>Profile Settings</h1>
      {/* Add your profile settings form or content here */}
      <div className="settings-form">
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettings;
