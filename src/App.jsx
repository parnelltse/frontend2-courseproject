import './App.css'
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/landing'

function App() {


  return (
   <Routers>
    <Routes>
      <Route path="/" element={<Landing/>} />
    </Routes>
   </Routers>
  )
}

export default App
