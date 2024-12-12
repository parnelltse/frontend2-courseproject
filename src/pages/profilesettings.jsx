import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
const ProfileSettings = () => {
	const [profile, setProfile] = useState({
		name: "Name",
		email: "Email",
		avatar: "https://via.placeholder.com/150",
	});

	const navigate = useNavigate();

	const gameHistory = [
		{ date: "2024-12-01", score: 50, gameMode: "4x4" },
		{ date: "2024-12-02", score: 60, gameMode: "4x4" },
	];

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
		<div className="profile-settings-container">
			<Header />
			<div className="profile-back"></div>

			<h1 className="profile-settings-title">Profile Settings</h1>

			<div className="profile-info">
				<div className="profile-avatar">
					<img
						src={profile.avatar}
						alt="Avatar"
						width={150}
						className="avatar"
					/>
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
				<button className="save-button" onClick={() => alert("Profile saved!")}>
					Save Changes
				</button>
			</div>
			<BackButton />
			<Footer />
		</div>
	);
};

export default ProfileSettings;
