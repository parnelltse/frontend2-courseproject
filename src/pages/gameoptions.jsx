import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../App.css"; // Ensure to import your CSS file
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function GameOptions() {
	const navigate = useNavigate();

	return (
		<div>
			<Header />

			<div className="game-options-container">
				<header>
					<h1 className="game-options-title">Select Game Mode</h1>
				</header>

				<div className="game-options-buttons">
					<button
						onClick={() => navigate("/singleplayer")}
						className="game-option-button"
					>
						Single Player
					</button>
					<button
						onClick={() => navigate("/multiplayer")}
						className="game-option-button"
					>
						Multi Player
					</button>
					<button
						onClick={() => navigate("/resumegame")}
						className="game-option-button"
					>
						Resume Game
					</button>
				</div>

				<BackButton />
				<Footer />
			</div>
		</div>
	);
}
