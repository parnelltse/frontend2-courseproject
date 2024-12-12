import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure to import your CSS file

export default function Header() {
	const navigate = useNavigate();

	return (
		<header className="header">
			<h1 className="title" onClick={() => navigate("/")}>
				Matching Game
			</h1>
		</header>
	);
}
