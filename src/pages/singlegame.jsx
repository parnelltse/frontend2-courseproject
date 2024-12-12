import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import GameHistory from "./gamehistory"; // Import the GameHistory component
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

export default function SingleGame() {
	const location = useLocation();
	const { gridSize } = location.state || { gridSize: 4 }; // Default to 4x4

	const totalCards = gridSize * gridSize;
	const totalPairs = totalCards / 2; // Total pairs to match

	const [cards, setCards] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [gameEnded, setGameEnded] = useState(false);
	const [score, setScore] = useState(0); // Score out of 100
	const [matchedPairs, setMatchedPairs] = useState(0); // Keep track of matched pairs
	const [gameStarted, setGameStarted] = useState(false); // To track if game has started
	const [gameHistory, setGameHistory] = useState([]); // New state for storing game history
	const [startTime, setStartTime] = useState(Date.now()); // Start time to track game duration

	useEffect(() => {
		initializeGame();
	}, [gridSize]);

	const initializeGame = () => {
		const selectedImages = cardImages.slice(0, totalPairs); // Get unique pairs
		const shuffledCards = shuffleCards([...selectedImages, ...selectedImages]);

		setCards(
			shuffledCards.map((image, index) => ({
				id: index,
				image,
				flipped: false,
				matched: false,
			}))
		);
		setFlippedCards([]);
		setGameEnded(false);
		setScore(0); // Reset score on new game
		setMatchedPairs(0); // Reset matched pairs
		setGameStarted(false); // Reset the game start flag
		setStartTime(Date.now()); // Reset the start time

		// Reveal all cards for 5 seconds
		setTimeout(() => {
			setCards((prevCards) =>
				prevCards.map((card) => ({ ...card, flipped: true }))
			);
			setTimeout(() => {
				setCards((prevCards) =>
					prevCards.map((card) => ({ ...card, flipped: false }))
				);
				setGameStarted(true); // Game officially starts after cards are hidden again
			}, 5000); // Wait 5 seconds before hiding cards again
		}, 1000); // Brief delay before starting the reveal
	};

	const shuffleCards = (cards) => {
		return cards.sort(() => Math.random() - 0.5);
	};

	const handleCardClick = (cardId) => {
		if (
			flippedCards.length === 2 ||
			cards.find((card) => card.id === cardId).matched ||
			!gameStarted
		)
			return;

		const updatedCards = cards.map((card) =>
			card.id === cardId ? { ...card, flipped: true } : card
		);
		setCards(updatedCards);
		setFlippedCards((prev) => [...prev, cardId]);

		if (flippedCards.length === 1) {
			const firstCard = cards.find((card) => card.id === flippedCards[0]);
			const secondCard = cards.find((card) => card.id === cardId);

			if (firstCard.image === secondCard.image) {
				// Match found
				setTimeout(() => {
					setCards((prev) =>
						prev.map((card) =>
							card.id === firstCard.id || card.id === secondCard.id
								? { ...card, matched: true }
								: card
						)
					);
					setFlippedCards([]);
					setMatchedPairs((prev) => prev + 1); // Increment matched pairs
					const newScore = Math.min(
						score + 25, // Add 25 points for each match
						100
					);
					setScore(newScore); // Update score based on matched pairs
				}, 500); // Delay to show match
			} else {
				// No match
				setTimeout(() => {
					setCards((prev) =>
						prev.map((card) =>
							card.id === firstCard.id || card.id === secondCard.id
								? { ...card, flipped: false }
								: card
						)
					);
					setFlippedCards([]);
					// Penalize score on mismatch
					setScore((prevScore) => Math.max(prevScore - 15, 0)); // Prevent negative score
				}, 1000); // Delay to flip back
			}
		}
	};

	useEffect(() => {
		if (cards.length > 0 && cards.every((card) => card.matched)) {
			setGameEnded(true);
			const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate time taken to finish game

			// Save the game history once the game ends
			const gameResult = {
				date: new Date().toLocaleString(),
				score,
				gameMode: `${gridSize}x${gridSize}`,
				timeTaken: elapsedTime,
			};

			setGameHistory((prevHistory) => [...prevHistory, gameResult]);
		}
	}, [cards]);

	return (
		<div>
			<Header />
			<div className="single-game-container">
				<h1>Single Player - Matching Game</h1>

				<div className="gameInfoBox">
					<h2>
						Grid Size: {gridSize}x{gridSize}
					</h2>
					<h3>Score: {score}</h3>
					<h3>{gameStarted ? "Game Started" : "Game is About to Start"}</h3>
				</div>

				{gameEnded ? (
					<div>
						<h2 className="congrat">You Win!</h2>
						<div className="game-controls">
							<BackButton />
							<button onClick={initializeGame}>Play Again</button>
						</div>
					</div>
				) : (
					<div>
						<div
							className="game-grid"
							style={{
								gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
								gridTemplateRows: `repeat(${gridSize}, 1fr)`,
							}}
						>
							{cards.map((card) => (
								<div
									key={card.id}
									className={`game-item ${card.matched ? "matched" : ""}`}
									onClick={() => handleCardClick(card.id)}
								>
									<img
										src={
											card.flipped || card.matched ? card.image : "/back.png"
										}
										alt="Card"
										className="card-image"
									/>
								</div>
							))}
						</div>
					</div>
				)}
				<GameHistory scores={gameHistory} />
				<BackButton />
			</div>
			<Footer />
		</div>
	);
}
