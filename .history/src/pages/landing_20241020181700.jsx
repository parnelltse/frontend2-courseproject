import { useNavigate } from 'react-router-dom';

export function Landing () {
  const navigate = useNavigate();

    return(
        <div className='app'>
      <header className="landing-container">
        <div>
          <h1>
            Matching Game
          </h1>
          
          <div>
            <nav>
            <button onClick={() => navigate('/create')}>Create Account</button>
            <button onClick={() => navigate('/login')}>Login</button>
            </nav>
          </div>
        </div>
      </header>

    </div>
    )
}