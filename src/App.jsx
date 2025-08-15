
import './App.css'
import WelcomePage from './components/WelcomePage.jsx'
import HomePage from './components/HomePage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          {<HomePage onStart={() => {}} />}
        </Routes>
      </div>
    </Router>
  )
}
export default App