
import './App.css'
import WelcomePage from './components/WelcomePage.jsx'
import HomePage from './components/HomePage.jsx'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar onStart={''} />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App