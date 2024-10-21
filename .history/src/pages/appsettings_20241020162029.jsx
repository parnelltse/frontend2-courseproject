// dark and light mode only works on this page, not sure how to put it on all the pages

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function AppSettings() {
	const navigate = useNavigate();
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	const appStyles = {
		backgroundColor: isDarkMode ? "#121212" : "#ffffff", // Dark mode background / light mode background
		color: isDarkMode ? "#ffffff" : "#000000", // Dark mode text color / light mode text color
		minHeight: "100vh",
		transition: "background-color 0.3s, color 0.3s",
	};

	return (
		<div className="app-settings" style={appStyles}>
			<button className="theme-toggle" onClick={toggleTheme}>
				{isDarkMode ? "Light" : "Dark"} Mode
			</button>
			<BackButton />
			<h1>App Settings</h1>
		</div>
	);
}
