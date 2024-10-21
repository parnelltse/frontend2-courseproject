import React from "react";
import BackButton from "../components/BackButton";
import "./App.css";

export default function SingleGame() {
	return (
		<div className="game-grid">
			{/* Add your game items here, for example: */}
			<div className="game-item">Game 1</div>
			<div className="game-item">Game 2</div>
			<div className="game-item">Game 3</div>
			<div className="game-item">Game 4</div>
			<div className="game-item">Game 5</div>
			<BackButton />
		</div>
	);
}
