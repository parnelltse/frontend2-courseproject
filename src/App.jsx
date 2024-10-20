import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/landing';
import Create from './pages/create'; 
import Login from './pages/login'
import Home from './pages/home';
import Gameoptions from './pages/gameoptions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gameoptions" element={<Gameoptions />} />
      </Routes>
    </Router>
  );
}

export default App;
