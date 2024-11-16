import React from "react";
import BackButton from "../components/BackButton";
import "../App.css";

export default function MultiGame() {
	return (
		<div className="game-grid">
			{Array.from({ length: 16 }).map((_, index) => (
				<div className="game-item" key={index}>
					Card {index + 1}
				</div>
			))}
			<BackButton />
		</div>
	);
}
