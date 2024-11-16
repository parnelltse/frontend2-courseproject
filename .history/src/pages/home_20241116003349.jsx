import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure to import your CSS file

export default function Home() {
	const navigate = useNavigate();
	
	return (
		<div className="container">
			<header>
				<h1 className="title">Matching Game</h1>
			</header>

			<div className="home-board">
				<button
					className="play-btn"
					onClick={() => navigate("/gameoptions")}
				>
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
		</div>
	);
}
