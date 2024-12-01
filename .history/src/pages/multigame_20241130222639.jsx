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

export default function MultiGame() {
  const location = useLocation();
  const { gridSize } = location.state || { gridSize: 4 }; // Default to 4x4

  const totalCards = gridSize * gridSize;
  const totalPairs = totalCards / 2; // Total pairs to match

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1); // Player 1 starts
  const [player1Score, setPlayer1Score] = useState(0); // Player 1's score
  const [player2Score, setPlayer2Score] = useState(0); // Player 2's score
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [player1Time, setPlayer1Time] = useState(null); // Time for Player 1
  const [player2Time, setPlayer2Time] = useState(null); // Time for Player 2
  const [startTime, setStartTime] = useState(Date.now()); // Start time for the game

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
    setMatchedPairs(0);
    setStartTime(Date.now()); // Reset start time
  };

  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (cardId) => {
    // Prevent clicking if the card is already flipped or matched or if it's the other player's turn
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
          setMatchedPairs((prev) => prev + 1); // Increment matched pairs

          // Calculate score based on matched pairs, capped at 100
          const newScore = Math.min(
            ((matchedPairs + 1) / totalPairs) * 100,
            100
          );
          if (currentPlayer === 1) {
            setPlayer1Score(newScore); // Update player 1 score
          } else {
            setPlayer2Score(newScore); // Update player 2 score
          }
          setFlippedCards([]); // Clear flipped cards
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
          if (currentPlayer === 1) {
            setPlayer1Score((prevScore) => Math.max(prevScore - 15, 0)); // Prevent negative score for player 1
          } else {
            setPlayer2Score((prevScore) => Math.max(prevScore - 15, 0)); // Prevent negative score for player 2
          }
        }, 1000); // Delay to flip back
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameEnded(true);
      // Capture the time taken by the current player
      if (currentPlayer === 1 && player1Time === null) {
        setPlayer1Time(Math.floor((Date.now() - startTime) / 1000)); // Time in seconds
      } else if (currentPlayer === 2 && player2Time === null) {
        setPlayer2Time(Math.floor((Date.now() - startTime) / 1000)); // Time in seconds
      }
    }
  }, [cards]);

  const switchPlayer = () => {
    if (currentPlayer === 1) {
      setCurrentPlayer(2);
    } else {
      setCurrentPlayer(1);
    }
    initializeGame(); // Restart the game for the next player
  };

  const winner = () => {
    if (player1Time && player2Time) {
      if (player1Time < player2Time) return "Player 1 wins!";
      else if (player2Time < player1Time) return "Player 2 wins!";
      else return "Draw";
    }
    return "";
  };

  return (
    <div className="single-game-container">
      <h1>Multi Player - Matching Game</h1>

      <div className="gameInfoBox">
        <h2>Grid Size: {gridSize}x{gridSize}</h2>

        {/* Show current player */}
        <h3>{`Player ${currentPlayer}'s Turn`}</h3>

        <div className="score-display">
          <h3>Player 1 Score: {player1Score.toFixed(0)}</h3> {/* Display score rounded to 0 decimal places */}
          <h3>Player 2 Score: {player2Score.toFixed(0)}</h3> {/* Display score rounded to 0 decimal places */}
        </div>
      </div>

      {gameEnded ? (
        <div>
          <h2 className="congrat">
            {winner()}
          </h2>
          <div className="game-controls">
            <BackButton />
            <button onClick={switchPlayer}>Switch Player</button>
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



