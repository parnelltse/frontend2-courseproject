import { useNavigate } from 'react-router-dom';

export function Landing () {
  const navigate = useNavigate();
  
    return(
      <div className='app'>
        <div className="container">
          <div class="container" id="container">
            <div class="sign-up">
              <form>
              <h1>Create Account</h1>
              <span>or use email for registeration</span>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
              </form>
            </div>
            <div class="sign-in">
              <form>
              <h1>Sign In</h1>
              <div class="icons">
                <a href="#" class="icon"><i class="fa-brands fa-facebook"></i></a>
                <a href="#" class="icon"><i class="fa-brands fa-instagram"></i></a>
                <a href="#" class="icon"><i class="fa-brands fa-google"></i></a>
                <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
              </div>
              <span>or use email password</span>
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forgot password</a>
              <button>Sign In</button>
              </form>
            </div>
            <div class="toogle-container">
              <div class="toogle">
              <div class="toogle-panel toogle-left">
                <h1>Matching Game</h1>
                <p>If you already have an account</p>
                <button class="hidden" id="login">Sign In</button>
              </div>
              <div class="toogle-panel toogle-right">
                <h1>Matching game</h1>
                <p>If you don't have an account</p>
                <button class="hidden" id="register">Sign Up</button>
              </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
}