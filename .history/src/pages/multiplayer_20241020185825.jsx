
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function MultiPlayer() {
	const navigate = useNavigate();
	const [gridSize, setGridSize] = useState("");

	const handleInputChange = (e) => {
		const value = e.target.value;
		if (!isNaN(value) && value >= 3 && value <= 9) {
			//  input is a number between 3 and 9
			setGridSize(value);
		}
	};

	// Function to set preset grid size
	const handleButtonClick = (size) => {
		setGridSize(size);
	};

	return (
		<div className="single-container">
			<h1>Multi Player - Matching Game</h1>

			<div className="game-options">
				<h2>Select Grid Size:</h2>

				<button onClick={() => handleButtonClick(3)}>3x3</button>
				<button onClick={() => handleButtonClick(4)}>4x4</button>
				<button onClick={() => handleButtonClick(5)}>5x5</button>

				<div>
					<h3>Or Enter a Grid Size (3-9):</h3>
					<input
						type="number"
						value={gridSize}
						onChange={handleInputChange}
						placeholder="size"
						min="3"
						max="9"
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
						navigate("/Multigame");
					}}
					className="single-btn"
				>
					Play
				</button>
				<BackButton />
			</div>
		</div>
	);
}
