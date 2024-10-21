import React from "react";
import BackButton from "../components/BackButton";
import "./MultiGame.css"; // Make sure to create this CSS file

export default function MultiGame() {
	return (
		<div className="game-grid">
			{/* Add your game items here, for example: */}
			<div className="game-item">Game A</div>
			<div className="game-item">Game B</div>
			<div className="game-item">Game C</div>
			<div className="game-item">Game D</div>
			<div className="game-item">Game E</div>
			<BackButton />
		</div>
	);
}
