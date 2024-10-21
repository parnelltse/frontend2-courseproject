// not sure why there is a red underline saying an error for the image location

import React from 'react';
import BackButton from '../components/BackButton';
import gameImage from "../assets/gameimage.png"; 
export default function ResumeGame() {
    return (
        <div>
            <h1>Resume Game</h1>
            <img src={gameImage} alt="Game" />
            <BackButton />
        </div>
    );
}
