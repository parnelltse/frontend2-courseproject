import React from "react";
import { useNavigate } from "react-router-dom";
import AccountForm from "../components/AccountForm";
import BackButton from "../components/BackButton";
import "../App.css"; // Ensure to import your CSS file

export default function Create() {
	const navigate = useNavigate();

	const handleAccountCreation = (data) => {
		console.log("Account created:", data);
		navigate("/home");
	};

	return (
		<div className="create-container">
			<header className="create-header">
				<h1>Matching Game</h1>
				<h2>Account Creation</h2>
			</header>
			<AccountForm
				onSubmit={handleAccountCreation}
				buttonText="Create Account"
			/>
			<BackButton />
		</div>
	);
}
