import { useNavigate } from 'react-router-dom';
import '../JavaScript/SignInAnimation.js'

export function Landing () {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  return(
    <div className="app landing-page">
      <div className="container landing-container">
        <div className={`home-container ${isActive ? 'active' : ''}`} id="home-container">
          <div className="sign-up-form">
            <form className="form-signup">
              <h1 className="form-heading">Create Account</h1>
              <span className="form-subtext">or use email for registration</span>
              <input type="text" className="input-field" placeholder="Name" />
              <input type="text" className="input-field" placeholder="Email" />
              <input type="password" className="input-field" placeholder="Password" />
              <button type="button" className="form-button" onClick={toggleActive}>Sign Up</button>
            </form>
          </div>
          <div className="sign-in-form">
            <form className="form-signin">
              <h1 className="form-heading">Sign In</h1>
              <span className="form-subtext">or use email password</span>
              <input type="text" className="input-field" placeholder="Email" />
              <input type="password" className="input-field" placeholder="Password" />
              <a href="#" className="form-link">Forgot password</a>
              <button type="button" className="form-button" onClick={toggleActive}>Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1 className="toggle-heading">Matching Game</h1>
                <p className="toggle-text">If you already have an account</p>
                <button className="hidden toggle-button" id="login">Sign In</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1 className="toggle-heading">Matching Game</h1>
                <p className="toggle-text">If you don't have an account</p>
                <button className="hidden toggle-button" id="register">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



