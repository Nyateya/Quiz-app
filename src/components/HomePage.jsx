import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ onStart }) {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (onStart) onStart();
    navigate("/quiz");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <div className="home-page">
      <h1>QUIZ APP</h1>
      <nav>
        <button onClick={handleStartQuiz}>Start Quiz</button>
        <button onClick={handleSettings}>Settings</button>
        <button onClick={handleHome}>Home</button>
        <button onClick={handleHistory}>History</button>
      </nav>
    </div>
  );
}
