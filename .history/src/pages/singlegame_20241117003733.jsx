import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../App.css";

const cardImages = [
	"/card1.png",
	"/card2.png",
	"/card3.png",
	"/card4.png",
	"/card5.png",
	"/card6.png",
  ]; // Add more images if necessary

export default function SingleGame() {
	const location = useLocation();
	const { gridSize } = location.state || { gridSize: 4 }; // Default to 5x5

	// Total cards = gridSize * gridSize
	const totalCards = gridSize * gridSize;

	// State for cards, flipped cards, and matched cards
	const [cards, setCards] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [matchedCards, setMatchedCards] = useState([]);
	const [gameEnded, setGameEnded] = useState(false);

	useEffect(() => {
		initializeGame();
	  }, [gridSize]);
	
	  // Initialize cards
	  const initializeGame = () => {
		const totalPairs = totalCards / 2;
		const selectedImages = cardImages.slice(0, totalPairs); // Get the required number of unique pairs
		const shuffledCards = shuffleCards([...selectedImages, ...selectedImages]); // Duplicate and shuffle
	
		setCards(
		  shuffledCards.map((image, index) => ({
			id: index,
			image,
			flipped: false,
			matched: false,
		  }))
		);
		setFlippedCards([]);
		setMatchedCards([]);
		setGameEnded(false);
	  };

	  // Shuffle cards
  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5); // Simple random shuffle
  };

  // Handle card click
  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || matchedCards.includes(cardId)) return;

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
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        setFlippedCards([]);
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check if all cards are matched
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameEnded(true);
    }
  }, [matchedCards, cards]);

	return (
		<div className="single-game-container">
			<h1>Single Player - Matching Game</h1>
			<h2>Grid Size: {gridSize}x{gridSize}</h2>

			{gameEnded ? (
				<div>
				<h2>Congratulations! You've matched all the cards!</h2>
				<button onClick={initializeGame}>Play Again</button>
				</div>
			) : (
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
						src={card.flipped || card.matched ? card.image : "/back.png"}
						alt="Card"
						className="card-image"
					/>
					</div>
				))}
				</div>
			)}

			<BackButton />
		</div>
	);
}



