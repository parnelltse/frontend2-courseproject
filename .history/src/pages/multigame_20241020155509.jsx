import React from 'react';
import gameImage from '../assets/gameimage.png'; 
import BackButton from '../components/BackButton';

export default function MultiGame() {
    return (
        <div>
            <img src={gameImage} alt="Game" />
            <BackButton />
        </div>
    );
}
