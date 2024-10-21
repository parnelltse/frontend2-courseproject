import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton'; 

export default function Gameoptions() {
    const navigate = useNavigate(); 

    return (
        <div>
            <header>
                <h1>Matching Game</h1>
            </header>

            <button onClick={() => navigate ('/singleplayer')}>Single Player</button>
            <button onClick={() => navigate ('/multiplayer')}>Multi Player</button>
            <button onClick={() => navigate ('/resumegame')}>Resume Game</button>
           <BackButton />
        </div>
    );
}
