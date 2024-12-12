import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../App.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const cardImages = [
	"/card-1.png",
	"/card-2.png",
	"/card-3.png",
	"/card-4.png",
	"/card-5.png",
	"/card-6.png",
];

interface Card {
	id: number;
	image: string;
	flipped: boolean;
	matched: boolean;
}

interface GameState {
	cards: Card[];
	score: number;
	matchedPairs: number;
	currentGrid: number;
}

export default function ResumeGame() {
	const location = useLocation();
	const navigate = useNavigate();
	const { gridSize } = location.state || { gridSize: 4 };
	const totalCards = gridSize * gridSize;
	const totalPairs = totalCards / 2;
	const [gameState, setGameState] = useState<GameState>(() => {
		const savedState = localStorage.getItem("singlePlayerGameState");
		return savedState
			? JSON.parse(savedState)
			: {
					cards: [],
					score: 0,
					matchedPairs: 0,
					currentGrid: gridSize,
			  };
	});
	const [cardsRevealed, setCardsRevealed] = useState(false);

	useEffect(() => {
		if (gameState.cards.length === 0) {
			initializeGame();
		}
	}, [gridSize]);

	const initializeGame = () => {
		const selectedImages = cardImages.slice(0, totalPairs);
		const shuffledCards = [...selectedImages, ...selectedImages]
			.sort(() => Math.random() - 0.5)
			.map((image, index) => ({
				id: index,
				image,
				flipped: false,
				matched: false,
			}));
		setGameState((prev) => ({
			...prev,
			cards: shuffledCards,
			score: 0,
			matchedPairs: 0,
			currentGrid: gridSize,
		}));
	};

	useEffect(() => {
		localStorage.setItem("singlePlayerGameState", JSON.stringify(gameState));
	}, [gameState]);

	const resetGame = () => {
		localStorage.removeItem("singlePlayerGameState");
		initializeGame();
	};

	const resumeGame = () => {
		const savedState = localStorage.getItem("singlePlayerGameState");
		if (savedState) {
			const parsedState: GameState = JSON.parse(savedState);
			if (parsedState.currentGrid === gridSize) {
				setGameState(parsedState);
				setCardsRevealed(true);
				setTimeout(() => setCardsRevealed(false), 2000);
			}
		}
	};

	const startNewGame = () => {
		navigate("/singleplayer", { state: { gridSize } });
	};

	return (
		<div>
			<Header />
			<div className="single-game-container">
				<h1>Single Player - Matching Game</h1>
				{gameState.cards.length > 0 && (
					<div className="resume-section">
						<h2>Resume Your Last Game?</h2>
						<div className="button-container">
							<button className="profile-button" onClick={resumeGame}>
								Resume
							</button>
							<button className="profile-button" onClick={startNewGame}>
								Start New Game
							</button>
						</div>
					</div>
				)}
				<h2>
					Grid Size: {gridSize}x{gridSize}
				</h2>
				<div className="game-controls"></div>
				<div
					className="game-grid"
					style={{
						gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
						gridTemplateRows: `repeat(${gridSize}, 1fr)`,
					}}
				>
					{gameState.cards.map((card) => (
						<div
							key={card.id}
							className={`game-item ${card.matched ? "matched" : ""}`}
						>
							<img
								src={
									card.matched || card.flipped || cardsRevealed
										? card.image
										: "/back.png"
								}
								alt="Card"
								className="card-image"
							/>
						</div>
					))}
				</div>
			</div>
			<BackButton />
			<Footer />
		</div>
	);
}
