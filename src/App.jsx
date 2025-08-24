

import './App.css'
import WelcomePage from './components/WelcomePage.jsx'
import Navbar from './components/Navbar.jsx'
import Quiz from './components/Quiz.jsx'
import History from './components/History.jsx'
import  Settings from './components/Settings.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar onStart={''} />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App;