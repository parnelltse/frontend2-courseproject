import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/landing';
import Create from './pages/create'; 
import Login from './pages/login'
import Home from './pages/home';
import Gameoptions from './pages/gameoptions';
import AppSettings from './pages/appsettings';
import ProfileSettings from './pages/profilesettings';
import GameHistory from './pages/gamehistory';
import SinglePlayer from './pages/singleplayer';
import MultiPlayer from './pages/multiplayer';
import ResumeGame from './pages/resumegame';
import SingleGame from './pages/singlegame';
import MultiGame from './pages/multigame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gameoptions" element={<Gameoptions />} />
        <Route path='/appsettings' element={<AppSettings/>} />
        <Route path='/profilesettings' element={<ProfileSettings/>} />
        <Route path='/gamehistory' element={<GameHistory/>} />
        <Route path='/singleplayer' element={<SinglePlayer/>} />
        <Route path='/multiplayer' element={<MultiPlayer/>} />
        <Route path='/resumegame' element={<ResumeGame/>} />
        <Route path="/singlegame" element={<SingleGame />} />
        <Route path="/multigame" element={<MultiGame />} />
      </Routes>
    </Router>
  );
}

export default App;
