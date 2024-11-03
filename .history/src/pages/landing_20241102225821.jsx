import { useNavigate } from 'react-router-dom';
import '../JavaScript/SignInAnimation.js'

export function Landing () {
  const navigate = useNavigate();
  
  useEffect(() => {
    import('../JavaScript/SignInAnimation.js');
  }, []);
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  return (
    <div className={`app ${isActive ? 'active' : ''}`}>
      <div className="container">
        <div className={`home-container ${isActive ? 'active' : ''}`} id="home-container">
          <div className="sign-up">
            <form>
              <h1>Create Account</h1>
              <span>or use email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="button" onClick={toggleActive}>Sign Up</button>
            </form>
          </div>
          <div className="sign-in">
            <form>
              <h1>Sign In</h1>
              <span>or use email password</span>
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forgot password</a>
              <button type="button" onClick={toggleActive}>Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            {/* Other UI elements */}
          </div>
        </div>
      </div>
    </div>
  );
}



