import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import GameHistory from "./gamehistory";
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
  const { gridSize } = location.state || { gridSize: 4 };
  const totalCards = gridSize * gridSize;
  const totalPairs = totalCards / 2;
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [player1Time, setPlayer1Time] = useState(null);
  const [player2Time, setPlayer2Time] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [cardsRevealed, setCardsRevealed] = useState(true);
  const [gameHistory, setGameHistory] = useState([]);
  const [player1Finished, setPlayer1Finished] = useState(false);
  const [player2Finished, setPlayer2Finished] = useState(false);
  useEffect(() => {
    initializeGame();
  }, [gridSize]);
  const initializeGame = () => {
    const selectedImages = cardImages.slice(0, totalPairs);
    const shuffledCards = shuffleCards([...selectedImages, ...selectedImages]);
    const initialCards = shuffledCards.map((image, index) => ({
      id: index,
      image,
      flipped: false,
      matched: false,
    }));
    setCards(initialCards);
    setFlippedCards([]);
    setGameEnded(false);
    setMatchedPairs(0);
    setStartTime(Date.now());
    setCardsRevealed(true);
    setTimeout(() => {
      setCardsRevealed(false);
    }, 5000);
  };
  const shuffleCards = (cards) => cards.sort(() => Math.random() - 0.5);
  const handleCardClick = (cardId) => {
    if (
      cardsRevealed ||
      flippedCards.length === 2 ||
      cards.find((card) => card.id === cardId).matched
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
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, matched: true, flipped: true }
                : card
            )
          );
          setMatchedPairs((prev) => prev + 1);
          currentPlayer === 1
            ? setPlayer1Score((prev) => prev + 25)
            : setPlayer2Score((prev) => prev + 25);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
          currentPlayer === 1
            ? setPlayer1Score((prev) => Math.max(prev - 15, 0))
            : setPlayer2Score((prev) => Math.max(prev - 15, 0));
        }, 1000);
      }
    }
  };
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      
      if (currentPlayer === 1) {
        setPlayer1Time(elapsedTime);
        setPlayer1Finished(true);
      } else {
        setPlayer2Time(elapsedTime);
        setPlayer2Finished(true);
      }
      const gameResult = {
        date: new Date().toLocaleString(),
        score: currentPlayer === 1 ? player1Score : player2Score,
        gameMode: `${gridSize}x${gridSize}`,
      };
      setGameHistory((prevHistory) => [...prevHistory, gameResult]);
      if (currentPlayer === 1) {
        switchPlayer();
      } else {
        setGameEnded(true);
      }
    }
  }, [cards]);
  const switchPlayer = () => {
    setCurrentPlayer(2);
    initializeGame();
  };
  const winner = () => {
    if (!player2Finished) return "";
    if (player1Score > player2Score) return "Player 1 wins!";
    if (player2Score > player1Score) return "Player 2 wins!";
    return "It's a Draw!";
  };
  const handlePlayAgain = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setMatchedPairs(0);
    setGameEnded(false);
    setCurrentPlayer(1);
    setPlayer1Finished(false);
    setPlayer2Finished(false);
    initializeGame();
  };
  return (
    <div className="single-game-container">
      <h1>Multi Player - Matching Game</h1>
      <div className="gameInfoBox">
        <h2>Grid Size: {gridSize}x{gridSize}</h2>
        <h3>{`Player ${currentPlayer}'s Turn`}</h3>
        <div className="score-display">
          <h3>Player 1 Score: {player1Score.toFixed(0)}</h3>
          <h3>Player 2 Score: {player2Score.toFixed(0)}</h3>
        </div>
      </div>
      {gameEnded ? (
        <div>
          <h2 className="congrats">{winner()}</h2>
          <div className="game-controls">
            <BackButton />
            <button onClick={handlePlayAgain}>Play Again</button>
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
                className={`game-item ${card.matched ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                <img
                  src={card.flipped || cardsRevealed || card.matched ? card.image : "/back.png"}
                  alt="Card"
                  className="card-image"
                />
              </div>
            ))}
          </div>
          <BackButton />
        </div>
      )}
      <GameHistory scores={gameHistory} />
    </div>
  );
}