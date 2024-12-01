import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../App.css";

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

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0); // Score out of 100
  const [matchedPairs, setMatchedPairs] = useState(0); // Keep track of matched pairs

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
  };

  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };
  
  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || cards.find((card) => card.id === cardId).matched) return;

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
            ((matchedPairs + 1) / totalPairs) * 100, // Calculate score as percentage
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
  
  const newScore = Math.min(
    ((matchedPairs + 1) / totalPairs) * 100,
    100
  );
  setScore(newScore);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameEnded(true);
    }
  }, [cards]);

  return (
    <div className="single-game-container">
      <h1>Single Player - Matching Game</h1>
      <div className="gameInfoBox">
        <h2>Grid Size: {gridSize}x{gridSize}</h2>
        <div className="score-display">
          <h3>Score: {score}</h3>
        </div>
      </div>

      {gameEnded ? (
        <div>
          <h2 className="congrat">Congratulations! You've matched all the cards!</h2>
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
            {cards.map((card) =>
              card.matched ? null : (
                <div
                  key={card.id}
                  className="game-item"
                  onClick={() => handleCardClick(card.id)}
                >
                  <img
                    src={card.flipped ? card.image : "/back.png"}
                    alt="Card"
                    className="card-image"
                  />
                </div>
              )
            )}
          </div>
          <BackButton />
        </div>
      )}
    </div>
  );
}
