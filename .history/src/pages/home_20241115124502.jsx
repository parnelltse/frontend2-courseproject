import { useNavigate } from "react-router-dom";
import "../App.css"; 

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="container">
			<header>
				<h1 className="title">Matching Game</h1>
				<button
					className="profile-button"
					onClick={() => navigate("/profilesettings")}
				>
					Profile
				</button>
			</header>
			<div className="button-container">
				<button
					className="play-button"
					onClick={() => navigate("/gameoptions")}
				>
					Play
				</button>
				<button
					className="settings-button"
					onClick={() => navigate("/appsettings")}
				>
					Settings
				</button>
			</div>
		</div>
	);
}
