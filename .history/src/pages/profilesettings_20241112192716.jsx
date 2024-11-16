import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../App.css"; // Ensure to import your CSS file

export default function ProfileSettings() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [submittedUsername, setSubmittedUsername] = useState("");

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmittedUsername(username);
		console.log("Username submitted:", username);
	};

	return (
		<div className="profile-settings-container">
			<h1 className="profile-settings-title">Profile Settings</h1>

			{/* Show the username if it has been submitted */}
			{submittedUsername && (
				<h2 className="submitted-username">Username: {submittedUsername}</h2>
			)}

			<form onSubmit={handleSubmit} className="profile-settings-form">
				<input
					type="text"
					placeholder="Enter your username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="username-input"
				/>
				<button type="submit" className="save-button">
					Save
				</button>
			</form>

			<div className="navigation-buttons">
				<button
					onClick={() => navigate("/gamehistory")}
					className="scores-button"
				>
					View Scores
				</button>
				<BackButton />
			</div>
		</div>
	);
}
