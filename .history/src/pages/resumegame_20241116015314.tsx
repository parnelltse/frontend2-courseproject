import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../App.css";

export default function SingleGame() {
	const location = useLocation();
	const navigate = useNavigate();

	// Load grid size from location or default to 4
	const { gridSize } = location.state || { gridSize: 4 };
	const totalCards = gridSize * gridSize;

	// Game state
	const [gameState, setGameState] = useState(() => {
		// Load from localStorage if available
		const savedState = localStorage.getItem("gameState");
		return savedState ? JSON.parse(savedState) : { matched: [], currentGrid: gridSize };
	});

	// Save state to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("gameState", JSON.stringify(gameState));
	}, [gameState]);

	// Reset game
	const resetGame = () => {
		setGameState({ matched: [], currentGrid: gridSize });
		localStorage.removeItem("gameState");
	};

	// Resume from saved state
	const resumeGame = () => {
		const savedState = JSON.parse(localStorage.getItem("gameState"));
		if (savedState && savedState.currentGrid === gridSize) {
			setGameState(savedState);
		}
	};

	return (
		<div className="single-game-container">
			<h1>Single Player - Matching Game</h1>

			{gameState.matched.length > 0 && (
				<div className="resume-section">
					<h2>Resume Your Last Game?</h2>
					<button onClick={resumeGame} className="resume-btn">Resume</button>
				</div>
			)}

			<h2>Grid Size: {gridSize}x{gridSize}</h2>

			<div
				className="game-grid"
				style={{
					gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
					gridTemplateRows: `repeat(${gridSize}, 1fr)`,
				}}
			>
				{Array.from({ length: totalCards }).map((_, index) => (
					<div
						className={`game-item ${gameState.matched.includes(index) ? "matched" : ""}`}
						key={index}
					>
						Card {index + 1}
					</div>
				))}
			</div>

			<div className="game-controls">
				<button onClick={resetGame} className="reset-btn">Start New Game</button>
				<BackButton />
			</div>
		</div>
	);
}




