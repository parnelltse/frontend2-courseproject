import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className="container">
			<header>
				<h1>Matching Game</h1>
				<div>
					<button onClick={() => navigate("/profilesettings")}>Profile</button>
				</div>
			</header>
			<button onClick={() => navigate("/gameoptions")}>Play</button>
			<button onClick={() => navigate("/appsettings")}>Settings</button>
		</div>
	);
}
