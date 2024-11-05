import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Landing () {
  const navigate = useNavigate();
  
  const handleLogin = (data) => {
		console.log("User logged in:", data);
		navigate("/home"); // Redirect to the home page
	};

  const handleAccountCreation = (data) => {
		console.log("Account created:", data);
		navigate("/home");
	};



  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  return (
    <div className={`app ${isActive ? 'active' : ''}`}>
      <div className="container">
        <h1 className='headline'>
          Matching Game
        </h1>
        <div className={`home-container ${isActive ? 'active' : ''}`} id="home-container">
          <div className="sign-up">
            <form onSubmit={handleAccountCreation}>
              <h1>Create Account</h1>
              <span>or use email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="sign-in">
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <span>or use email password</span>
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forgot password</a>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div class="toogle-container">
            <div class="toogle">
              <div class="toogle-panel toogle-left">
                <h1>Welcome!</h1>
                <p>If you already have an account</p>
                <button class="hidden" id="login" onClick={toggleActive}>Sign In</button>
              </div>
              <div class="toogle-panel toogle-right">
                <h1>Hello!</h1>
                <p>If you don't have an account</p>
                <button class="hidden" id="register" onClick={toggleActive}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



