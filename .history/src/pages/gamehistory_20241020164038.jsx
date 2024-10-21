import React from "react";
import BackButton from "../components/BackButton";
import "../App.css"; // Make sure to import your CSS file

export default function GameHistory() {
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
						{/* Sample data, replace with your actual data */}
						<tr>
							<td>2024-10-19</td>
							<td>85</td>
							<td>Single Player</td>
						</tr>
						<tr>
							<td>2024-10-18</td>
							<td>90</td>
							<td>Multiplayer</td>
						</tr>
						<tr>
							<td>2024-10-17</td>
							<td>75</td>
							<td>Single Player</td>
						</tr>
					</tbody>
				</table>
			</div>
			<BackButton />
		</div>
	);
}
