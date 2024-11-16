import React from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../App.css";

export default function SingleGame() {
	const location = useLocation();
	const { gridSize } = location.state || { gridSize: 5 }; // Default to 5x5

	// Total cards = gridSize * gridSize
	const totalCards = gridSize * gridSize;

	return (
		<div className="single-game-container">
			<h1>Single Player - Matching Game</h1>
			<h2>Grid Size: {gridSize}x{gridSize}</h2>

			<div
				className="game-grid"
				style={{
					gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
					gridTemplateRows: `repeat(${gridSize}, 1fr)`,
				}}
			>
				{Array.from({ length: totalCards }).map((_, index) => (
					<div className="game-item" key={index}>
						Card {index + 1}
					</div>
				))}
			</div>

			<BackButton />
		</div>
	);
}



