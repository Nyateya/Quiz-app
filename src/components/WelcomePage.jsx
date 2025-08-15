import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

    export default function WelcomePage() {
      const navigate = useNavigate();
      const [category, setCategory] = useState('');
       const [difficulty, setDifficulty] = useState('');
      const [error, setError] = useState('');

      const handleStartQuiz = () => {
        if (!category || !difficulty) {
          setError('Please select both category and difficulty.');
          return;
        }
        setError('');
        navigate(`/quiz?category=${category}&difficulty=${difficulty}`);
      };
      const categories = [
        { value: 'general', label: 'General Knowledge' },
        { value: 'science', label: 'Science' },
        { value: 'history', label: 'History' },
      ];
      const difficulties = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
      ];
      return (
        <div className="welcome-page">
          <h1 className="text-3xl font-bold mb-4">QUIZ APP</h1>
          <h2 className="text-3xl font-bold mb-4">WELCOME</h2>
          <p className="mb-4">
            Select a category and difficulty to start the quiz.
          </p>
          <div className="mb-4">
            <label className="block mb-2">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select difficulty</option>
              {difficulties.map((diff) => (
                <option key={diff.value} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleStartQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Thumbs Up!
          </button>
        </div>
      );

    }