import React, { useState } from "react";

export default function AccountForm({ onSubmit, buttonText }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ username, password }); // Pass both username and password to the parent
	};

	return (
		<form onSubmit={handleSubmit} className="account-form">
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit">{buttonText}</button>
		</form>
	);
}
