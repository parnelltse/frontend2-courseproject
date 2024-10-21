import React from "react";
import { useNavigate } from "react-router-dom";
import AccountForm from "../components/AccountForm";
import "../App.css"; // Ensure to import your CSS file

const Login = () => {
	const navigate = useNavigate();

	const handleLogin = (data) => {
		console.log("User logged in:", data);
		navigate("/home"); // Redirect to the home page
	};

	return (
		<div className="login-container">
			<header className="login-header">
				<h1>Matching Game</h1>
				<h2>Login</h2>
			</header>
			<AccountForm onSubmit={handleLogin} buttonText="Login" />
		</div>
	);
};

export default Login;
