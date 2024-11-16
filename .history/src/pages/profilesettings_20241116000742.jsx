import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'LeBron James',
    email: 'gavinpahal2003@gmail.com',
    avatar: 'https://via.placeholder.com/150',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfile({ ...profile, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-settings">
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Profile Settings</h1>
      <div className="avatar">
        <img src={profile.avatar} alt="Avatar" width={100} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button onClick={() => alert('Profile saved!')}>Save</button>
      <button onClick={() => navigate('/gamehistory')}>Scores</button>
      <button>Logout</button>
    </div>
  );
};

export default ProfileSettings;
