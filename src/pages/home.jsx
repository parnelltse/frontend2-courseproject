import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div>
			<Header />

			<div className="container">
				<div className="home-board">
					<button className="play-btn" onClick={() => navigate("/gameoptions")}>
						Play
					</button>
					<div className="button-container">
						<button
							className="profile-button"
							onClick={() => navigate("/profilesettings")}
						>
							Profile
						</button>
						<button
							className="settings-button"
							onClick={() => navigate("/appsettings")}
						>
							Settings
						</button>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
