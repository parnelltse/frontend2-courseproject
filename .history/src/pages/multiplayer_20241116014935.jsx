
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function MultiPlayer() {
	const navigate = useNavigate();
	const [gridSize, setGridSize] = useState("");

	const handleInputChange = (e) => {
		const value = parseInt(e.target.value, 10);

		if (!isNaN(value)) {
			// Ensure the value is even and within the range of 4-10
			if (value >= 4 && value <= 10 && value % 2 === 0) {
				setGridSize(value);
			}
		}
	};

	// Function to set predset grid size
	const handleButtonClick = (size) => {
		setGridSize(size);
	};

	return (
		<div className="single-container">
			<h1>Single Player - Matching Game</h1>

			<div className="game-options">
				<h2>Select Grid Size:</h2>

				<button onClick={() => handleButtonClick(4)}>4x4</button>
				<button onClick={() => handleButtonClick(6)}>6x6</button>

				<div>
					<h3>Or Enter a Grid Size (4-10):</h3>
					<input
						type="number"
						value={gridSize}
						onChange={handleInputChange}
						placeholder="size"
						min="4"
						max="10"
					/>
				</div>
			</div>

			{gridSize && (
				<div>
					<h2>
						You selected: {gridSize}x{gridSize}
					</h2>
				</div>
			)}

			<div className="single-bottom">
				<button
					onClick={() => {
						if (gridSize >= 4 && gridSize <= 10 && gridSize % 2 === 0) {
							navigate("/multigame", { state: { gridSize } });
						} else {
							alert("Please select a valid grid size.");
						}
					}}
					className="play-btn"
				>
					Play
				</button>
				<BackButton />
			</div>
		</div>
	);
}
