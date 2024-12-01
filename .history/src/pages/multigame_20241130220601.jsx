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
  const [player1StartTime, setPlayer1StartTime] = useState(null); // Track Player 1 start time
  const [player2StartTime, setPlayer2StartTime] = useState(null); // Track Player 2 start time
  const [player1Time, setPlayer1Time] = useState(0); // Player 1's time taken
  const [player2Time, setPlayer2Time] = useState(0); // Player 2's time taken
  const [matchedPairs, setMatchedPairs] = useState(0); // Matched pairs counter

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
  };

  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (cardId) => {
    // Prevent clicking if the card is already flipped or matched or if it's the other player's turn
    if (flippedCards.length === 2 || cards.find((card) => card.id === cardId).matched || (currentPlayer === 1 && player1StartTime === null) || (currentPlayer === 2 && player2StartTime === null)) return;

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
          const updatedCards = cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, matched: true }
              : card
          );
          setCards(updatedCards);
          setMatchedPairs((prev) => prev + 1);

          // Update score for the current player based on time
          if (currentPlayer === 1) {
            setPlayer1Score((prevScore) => prevScore + 100);
          } else {
            setPlayer2Score((prevScore) => prevScore + 100);
          }
          setFlippedCards([]); // Clear flipped cards
        }, 500); // Delay to show match
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: false }
              : card
          );
          setCards(updatedCards);
          setFlippedCards([]); // Clear flipped cards
        }, 1000); // Delay to flip back
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameEnded(true);
    }
  }, [cards]);

  useEffect(() => {
    if (gameEnded) {
      // Calculate time for each player after game ends
      if (currentPlayer === 1 && player1StartTime) {
        setPlayer1Time(Math.floor((Date.now() - player1StartTime) / 1000)); // Calculate time taken by Player 1
      }
      if (currentPlayer === 2 && player2StartTime) {
        setPlayer2Time(Math.floor((Date.now() - player2StartTime) / 1000)); // Calculate time taken by Player 2
      }
    }
  }, [gameEnded]);

  const startTimerForPlayer1 = () => {
    setPlayer1StartTime(Date.now()); // Start timer for Player 1 when they begin the game
  };

  const startTimerForPlayer2 = () => {
    setPlayer2StartTime(Date.now()); // Start timer for Player 2 when they begin the game
  };

  const switchPlayer = () => {
    if (currentPlayer === 1) {
      setCurrentPlayer(2);
      startTimerForPlayer2(); // Start timer for Player 2 when they begin
    } else {
      setCurrentPlayer(1);
      startTimerForPlayer1(); // Start timer for Player 1 when they begin
    }
    initializeGame(); // Restart the game for the next player
  };

  const winner = player1Time < player2Time ? "Player 1" : player2Time < player1Time ? "Player 2" : "Draw";

  return (
    <div className="single-game-container">
      <h1>Multi Player - Matching Game</h1>
      <h2>Grid Size: {gridSize}x{gridSize}</h2>

      {/* Show current player */}
      <h3>{`Player ${currentPlayer}'s Turn`}</h3>

      <div className="score-display">
        <h3>Player 1 Score: {player1Score}</h3>
        <h3>Player 2 Score: {player2Score}</h3>
      </div>

      {gameEnded ? (
        <div>
          <h2 className="congrat">
            {winner} wins! 
            {winner !== "Draw" && (
              <span>
                {winner === "Player 1" ? player1Score : player2Score} points!
              </span>
            )}
          </h2>
          <div className="game-controls">
            <BackButton />
            <button onClick={initializeGame}>Play Again</button>
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


