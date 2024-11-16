import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/landing';
import Home from './pages/home';
import Gameoptions from './pages/gameoptions';
import AppSettings from './pages/appsettings';
import ProfileSettings from './pages/profilesettings';
import GameHistory from './pages/gamehistory'; // Import GameHistory
import SinglePlayer from './pages/singleplayer';
import MultiPlayer from './pages/multiplayer';
import ResumeGame from './pages/resumegame';
import SingleGame from './pages/singlegame';
import MultiGame from './pages/multigame';

function App() {
  const [scores, setScores] = useState([
    { date: '2024-10-19', score: 85, gameMode: 'Single Player' },
    { date: '2024-10-18', score: 90, gameMode: 'Multiplayer' },
    { date: '2024-10-17', score: 75, gameMode: 'Single Player' },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gameoptions" element={<Gameoptions />} />
        <Route path="/appsettings" element={<AppSettings />} />
        <Route path="/profilesettings" element={<ProfileSettings />} />
        <Route path="/gamehistory" element={<GameHistory scores={scores} />} /> {/* Pass scores as prop */}
        <Route path="/singleplayer" element={<SinglePlayer />} />
        <Route path="/multiplayer" element={<MultiPlayer />} />
        <Route path="/resumegame" element={<ResumeGame />} />
        <Route path="/singlegame" element={<SingleGame />} />
        <Route path="/multigame" element={<MultiGame />} />
      </Routes>
    </Router>
  );
}

export default App;
