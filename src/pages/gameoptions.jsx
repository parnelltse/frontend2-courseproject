import { useNavigate } from 'react-router-dom';

export default function Gameoptions() {
    const navigate = useNavigate(); 

    return (
        <div>
            <header>
                <h1>Matching Game</h1>
            </header>

            <button>Single Player</button>
            <button>Multi Player</button>
            <button>Resume Game</button>
            <button onClick={() => navigate(-1)}>Back</button> 
        </div>
    );
}
