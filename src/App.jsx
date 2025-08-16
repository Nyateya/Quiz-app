
import './App.css'
import WelcomePage from './components/WelcomePage.jsx'
import Navbar from './components/Navbar.jsx'
import Quiz from './components/Quiz.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar onStart={''} />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        
          <Route path="/quiz" element={<Quiz/>} />
        </Routes>
      </div>
    </Router>
  )
}
export default App