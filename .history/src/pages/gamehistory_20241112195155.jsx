import React from "react";
import BackButton from "../components/BackButton";
import "../App.css"; // Make sure to import your CSS file

export default function GameHistory({ scores }) {
  return (
    <div className="history-container">
      <h2 className="history-title">Game History</h2>
      <p className="history-description">
        Here are your scores and performance details:
      </p>
      <div className="score-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Score</th>
              <th>Game Mode</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.date}</td>
                <td>{score.score}</td>
                <td>{score.gameMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BackButton />
    </div>
  );
}
