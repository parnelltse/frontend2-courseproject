import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './rofileSettings.css'; // Custom CSS for the profile page

function ProfileSettings() {
  const navigate = useNavigate();
  
  // State to hold the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle back click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save logic here, for example, updating the user's profile
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="profile-settings">
      <button onClick={handleBackClick} className="back-arrow-button">
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <h1>Profile Settings</h1>
      <div className="settings-form">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettings;
