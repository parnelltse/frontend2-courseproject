import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <header>
                <h1>Matching Game</h1>
                <div>
                    <button>Profile</button>
                </div>
            </header>

            <button onClick={() => {
                navigate('/gameoptions');
            }}>Play</button>
            <button>Settings</button>
        </div>
    );
}
