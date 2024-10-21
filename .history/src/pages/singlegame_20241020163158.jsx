import React from "react";
import BackButton from "../components/BackButton";
import "../App.css";

export default function SingleGame() {
	return (
		<div className="game-grid">
			{Array.from({ length: 25 }).map((_, index) => (
				<div className="game-item" key={index}>
					Game {index + 1}
				</div>
			))}
			<BackButton />
		</div>
	);
}
