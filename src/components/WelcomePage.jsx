import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css"

export default function WelcomePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");

  const handleStartQuiz = () => {
    if (!category || !difficulty) {
      setError("Please select both category and difficulty.");
      return;
    }
    setError("");
    navigate(`/quiz?category=${category}&difficulty=${difficulty}`);
  };

  const categories = [
    { value: "9", label: "General Knowledge" },
    { value: "17", label: "Science" },
    { value: "23", label: "History" },
  ];

  const difficulties = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <div className="welcome-page">
      {/* Header */}
      <div className="header">
        <h1>QUIZ APP</h1>
        <h2>WELCOME </h2>
      </div>

      {/* Main content */}
      <div className="form-card">
        <p>Select a category and difficulty to start the quiz.</p>

        {/* Category */}
        <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div className="form-group">
          <label>Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">-- Select difficulty --</option>
            {difficulties.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && <p className="error">{error}</p>}

        {/* Button */}
        <button onClick={handleStartQuiz}>Start Quiz </button>
      </div>

      </div>
    
  );
}
